// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

error AssuredPay__SufficientFundNotProvided();
error AssuredPay__TractionAlreadyCompleted();
error AssuredPay__OrderNotSet();

contract AssuredPay is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    struct Order {
        string orderId;
        string provider;
    }

    enum OrderState {
        DELIVERED,
        PENDING,
        FAILED,
        NOTFOUND
    }

    // Oracle Variable
    address public ERC677_LINK_ADDRESS =
        0x01BE23585060835E02B77ef475b0Cc51aA1e0709;
    address public s_oracleAddress = 0x6F527C87614b1CB5084820f96c95A609FE44B866;
    bytes32 public jobId = "5feb959c89d3408aac38b0bbba056fa7";
    uint256 private immutable fee = (1 * LINK_DIVISIBILITY) / 10;

    // Contract participants
    address payable private immutable i_vendor;
    address payable private immutable i_customer;
    uint256 public immutable i_amount;

    // Order Variable
    OrderState public s_orderState;
    bool public s_isTransactionFulfilled;

    uint32 counter = 0;
    uint256 public balance;
    uint256 public s_lastTimestamp;

    string public result;

    Order public order;

    // constructor(address vendor , address customer) {
    constructor(
        address _vendor,
        address _customer,
        uint256 _amount
    ) ConfirmedOwner(_vendor) {
        //configure Oracle
        setChainlinkToken(ERC677_LINK_ADDRESS);
        setChainlinkOracle(s_oracleAddress);

        s_orderState = OrderState.PENDING;
        i_amount = _amount;
        i_vendor = payable(_vendor);
        i_customer = payable(_customer);
        s_isTransactionFulfilled = false;
    }

    function setOrder(string memory orderId, string memory provider) public {
        order = Order(orderId, provider);
    }

    function pay() public payable {
        if (msg.value < i_amount) {
            revert AssuredPay__SufficientFundNotProvided();
        }

        balance = msg.value;
    }

    function requestDeliveryStatus(bool _mock)
        public
        onlyOwner
        returns (bytes32 requestId)
    {
        if (
            keccak256(bytes(order.orderId)) == keccak256("") ||
            keccak256(bytes(order.provider)) == keccak256("")
        ) {
            revert AssuredPay__OrderNotSet();
        }

        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        string memory mock = (_mock) ? "true" : "false";

        req.add("orderId", order.orderId);
        req.add("provider", order.provider);
        // req.add("orderId", "70413964261");
        // req.add("provider", "bluedart");
        req.add("mock", mock);
        req.add("path", "data,tag");

        return sendChainlinkRequest(req, fee);
    }

    function fulfill(bytes32 _requestId, string memory _orderStatus) public {
        result = _orderStatus;

        if (_check(result, "Delivered")) {
            s_orderState = OrderState.DELIVERED;
        } else if (_check(result, "Failure")) {
            s_orderState = OrderState.FAILED;
        } else if (_check(result, "notfound")) {
            s_orderState = OrderState.NOTFOUND;
            order.orderId = "";
            order.provider = "";
        }
    }

    function withdrawAmount() external {
        bool callSuccess = false;
        bool isOrderStatusUpdated = false;
        bool isSufficientBalance = address(this).balance == i_amount;

        if (msg.sender == i_customer) {
            isOrderStatusUpdated = (s_orderState == OrderState.FAILED);

            if (
                !s_isTransactionFulfilled &&
                isOrderStatusUpdated &&
                isSufficientBalance
            ) {
                (callSuccess, ) = payable(i_vendor).call{
                    value: address(this).balance
                }("");
            }
        } else if (msg.sender == i_vendor) {
            isOrderStatusUpdated = (s_orderState == OrderState.DELIVERED);

            if (
                !s_isTransactionFulfilled &&
                isOrderStatusUpdated &&
                isSufficientBalance
            ) {
                (callSuccess, ) = payable(i_vendor).call{
                    value: address(this).balance
                }("");
            }
        }

        if (callSuccess) {
            s_isTransactionFulfilled = true;
        }
    }

    // function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory){

    //     bool isTimePassed = (block.timestamp - s_lastTimestamp) > i_interval;
    //     bool isOrderStatusUpdated = s_orderState == OrderState.DELIVERED || s_orderState == OrderState.FAILED;
    //     bool isSufficientBalance = address(this).balance == i_amount;

    //     upkeepNeeded = !s_isTransactionFulfilled && (isTimePassed || isOrderStatusUpdated) && isSufficientBalance;
    // }

    // function performUpkeep(bytes calldata /* performData */) external override {

    //     if(s_isTransactionFulfilled) {
    //         revert AssuredPay__TractionAlreadyCompleted();
    //     }

    //     s_lastTimestamp = block.timestamp;
    //     bool callSuccess = false;

    //     if(s_orderState == OrderState.DELIVERED){
    //         (callSuccess, ) = payable(i_vendor).call{value: address(this).balance}("");
    //     }
    //     else if(s_orderState == OrderState.FAILED){
    //         (callSuccess, ) = payable(i_customer).call{value: address(this).balance}("");
    //     }
    //     else{
    //         requestDeliveryStatus();
    //     }

    //     if(callSuccess) {
    //         s_isTransactionFulfilled = true;
    //     }

    // }

    function _check(string memory string1, string memory string2)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((string1))) ==
            keccak256(abi.encodePacked((string2))));
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(ERC677_LINK_ADDRESS);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    //utility function
    function setOrderState(uint8 state) external {
        s_orderState = OrderState(state);
    }
}
