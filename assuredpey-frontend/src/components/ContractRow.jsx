import React, { useEffect, useState } from 'react';
import factoryContractABI from "../ABI/factoryContractABI";
import { ethers } from "ethers";
import {provider, signer, daiAddress, daiAbi} from "../contractConfig"

const ContractRow = ({address}) => {

  const [contracts, setContracts] = useState([]);

  // const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  // async function withdrawContract() {  
  //   const Withdraw =  await daiContract.withdrawLink();      
  //   console.log(Withdraw);
  // }

  const withdrawContract = async (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    console.log(daiAddress);
    const daiContract = new ethers.Contract(daiAddress, factoryContractABI, signer);
    
    const Withdraw =  await daiContract.withdrawLink();
    // console.log(Withdraw);
    // await erc20.transfer(data.get("recipient"), data.get("amount"));
  };

  return (
    <div className="">
      <div className="flex justify-between w-full h-[70px] bg-white p-3 rounded-[20px] shadow-sm items-center">
        <h1 className="flex text-center ml-5">{address}</h1>
        <div className="m-0 p-0">
          <button className="px-3 py-2 mx-3 bg-gray-300 rounded-[5px] text-sm uppercase font-semibold">
            View Info
          </button>
          <button className="px-3 py-2 mx-3 bg-red-500 rounded-[5px] text-sm uppercase font-semibold" onClick={withdrawContract}>
            Withdraw
          </button>
          <button className="px-3 py-2 mx-3 bg-gray-300 rounded-[5px] text-sm uppercase font-semibold">
            Status
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContractRow