// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./SafeDelivery.sol";
import "./UpkeepCreator.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract SafeDeliveryFactory is ChainlinkClient,ConfirmedOwner{

    // address payable immutable i_owner;
    UpkeepCreator public upkeepCreator = UpkeepCreator(0x17Ad72023Ca46c59E6fF18a678FdfAE68A644d45);
    address public token; 
    address public immutable i_vendor; 

    address[] public s_contracts; 
    address[] public s_customers;

    constructor() ConfirmedOwner(msg.sender) {
        i_vendor = payable (msg.sender);
        token = chainlinkTokenAddress();
    }

    function testing() public {
        // upkeepCreator.createUpkeep("Testing-Fatory", "" , address(counter) , 200000 , msg.sender);
    }

    // address vendor, address customer,uint256 _amount , uint32 interval
    function createContract(address _customer , uint256 _amount , uint32 _interval , uint linkAmt) public onlyOwner returns(address){
        
        address contractAddress = address(new SafeDelivery(i_vendor , _customer, _amount , _interval));
        s_customers.push(_customer);
        s_contracts.push(contractAddress);
        // upkeepCreator.transfer(contractAddress , linkAmt);
        return contractAddress;
    }

    function getContracts() public view returns(address[] memory){
        return s_contracts;
    } 

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer');
    }  

}
