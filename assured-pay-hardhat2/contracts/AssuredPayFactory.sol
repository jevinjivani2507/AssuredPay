// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./AssuredPay.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AssuredPayFactory is ChainlinkClient, ConfirmedOwner {
    event ContractCreated(
        address indexed _contractAddress,
        address indexed _customer,
        address indexed _vendor,
        uint256 _value
    );

    // address payable immutable i_owner;
    // UpkeepCreator public upkeepCreator = UpkeepCreator(0x88cd127494208bF7B018f89923017a3Ddf6cbe98);
    address public ERC677_LINK_ADDRESS =
        0x01BE23585060835E02B77ef475b0Cc51aA1e0709;
    uint256 linkAmt = (1 * LINK_DIVISIBILITY) / 10;
    address public immutable i_vendor;

    address[] public s_contracts;
    address[] public s_customers;

    constructor() ConfirmedOwner(msg.sender) {
        i_vendor = payable(msg.sender);
    }

    // address vendor, address customer,uint256 _amount , uint32 interval
    function createContract(address _customer, uint256 _amount)
        public
        onlyOwner
        returns (address)
    {
        address contractAddress = address(
            new AssuredPay(i_vendor, _customer, _amount)
        );
        s_customers.push(_customer);
        s_contracts.push(contractAddress);
        // ERC20(ERC677_LINK_ADDRESS).transfer(contractAddress, linkAmt);

        emit ContractCreated(contractAddress, _customer, i_vendor, _amount);

        return contractAddress;
    }

    function getContracts() public view returns (address[] memory) {
        return s_contracts;
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(ERC677_LINK_ADDRESS);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
