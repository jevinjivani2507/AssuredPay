import React, { useEffect, useState } from "react";
import { ethers, ContractFactory } from "ethers";
import ContractRow from "./ContractRow";
import { provider, signer, daiAddress, daiAbi } from "../contractConfig";
import AssuredPayFactory from "../contracts/AssuredPayFactory";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  VENDOR_CONTRACT_ADDRESS,
} from "../Redux/ActionTypes";

const Vendor = () => {
  const dispatch = useDispatch();
  const vendorContractAddress = useSelector(
    (state) => state.cart.vendorContractAddress
  );

  const [contracts, setContracts] = useState([]);

  

  // console.log(AssuredPayFactory.abi);

  const createVendorContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const factory = new ContractFactory(
      AssuredPayFactory.abi,
      AssuredPayFactory.bytecode,
      signer
    );
    const contract = await factory.deploy();
    const txreceipt = await contract.deployTransaction.wait(1);

    dispatch({ type: VENDOR_CONTRACT_ADDRESS, payload: contract.address });
  };

  async function getContract(address) {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const daiContract = new ethers.Contract(address, AssuredPayFactory.abi, provider);
    const contractAddresses = await daiContract.getContracts();
    // const result = address.forEach(element => {console.log(element)});
    return contractAddresses;
  }

  useEffect(() => {
    if(vendorContractAddress.length > 0 ) {
      getContract(vendorContractAddress).then((constracts) => setContracts(constracts));
    }
    
  }, []);

  return (
    <div className="bg-gray-100 min-h-[91vh] h-full p-10">
      { 
        (vendorContractAddress.length > 0) ? (
          <div className=" mb-10">
            <span className = "bg-black btn px-4 py-3 text-white">Vendor Contract</span>
             <span className = "solid  px-4 py-3 border-solid ">{vendorContractAddress}</span>
          </div>
        ) : (<button
          className="btn py-3 px-4 text-white"
          onClick={createVendorContract}
        >
          Create Contract
          
        </button>)
      }

      {contracts.length > 0 &&
        contracts.map((contract) => (
          <ContractRow key={contract} address={contract} />
        ))}
    </div>
  );
};

export default Vendor;
