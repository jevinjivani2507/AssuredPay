import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { provider, signer, daiAddress, daiAbi } from "../contractConfig";
import AssuredPayFactory from "../contracts/AssuredPayFactory";
import AssuredPay from "../contracts/AssuredPay";
import { Link } from "react-router-dom";

const ContractRow = ({ address }) => {
  // const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  // async function withdrawContract() {
  //   const Withdraw =  await daiContract.withdrawLink();
  //   console.log(Withdraw);
  // }

  const [orderStatus,setOrderStatus] = useState(0);

  useEffect(() => {
    const getStatus = async() =>{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const daiContract = new ethers.Contract(address, AssuredPay.abi, signer);
      setOrderStatus(await daiContract.s_orderState());
    }

    getStatus();
    

  },[])

  const showStatus = async (e) => {
    e.preventDefault();
    // console.log(address);
    const contract = new ethers.Contract(address, AssuredPay.abi, provider);
    const status = await contract.s_orderState();
    console.log(status);
  };

  const getInfo = async (e) => {
    e.preventDefault();
    const contract = new ethers.Contract(address, AssuredPay.abi, provider);
    // const balance = await contract.balance();
    // const i_amount = await contract.i_amount();
    // const order = await contract.order();
    // const owner = await contract.owner();
    // const result = await contract.result();
    // const s_lastTimestamp = await contract.s_lastTimestamp();
    const getbalance = await contract.getbalance();
    console.log(getbalance);
  };

  const withdrawContract = async (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const daiContract = new ethers.Contract(address, AssuredPay.abi, signer);

    // const orderstate = await daiContract.setOrderState(2);
    // await orderstate.wait();

    console.log(await daiContract.s_orderState());

    console.log(await daiContract.i_vendor());
    console.log(await daiContract.i_customer());

    const balance = ethers.utils.formatEther(await daiContract.getbalance());
    console.log(balance);

    const withdraw = await daiContract.withdrawAmount();
    await withdraw.wait();

    // console.log(Withdraw);
    // await erc20.transfer(data.get("recipient"), data.get("amount"));
  };

  return (
    <div className="">
      <div className="flex justify-between w-full h-[70px] bg-white p-3 rounded-[20px] shadow-sm items-center">
        <h1 className="flex text-center ml-5">{address}</h1>
        <div className="m-0 p-0">

        <label className="text-gray-700 text-sm mt-5 font-bold mb-2">{
          orderStatus === 1 ? "PENDING" : ((orderStatus === 0) ? "SUCCESS" : "FAILED")
        } </label>

          <button
            className="px-3 py-2 mx-3 bg-gray-300 rounded-[5px] text-sm uppercase font-semibold"
            onClick={getInfo}
          >
            <Link to={`/Tracking/${address}`}>View Info</Link>
          </button>
          <button
            className="px-3 py-2 mx-3 bg-gray-300 rounded-[5px] text-sm uppercase font-semibold"
            onClick={showStatus}
          >
            <Link to={`/Status/${address}`}>Set Order</Link>
          </button>
          <button
            className="px-3 py-2 mx-3 bg-red-500 rounded-[5px] text-sm uppercase font-semibold"
            onClick={withdrawContract}
          >
            Withdraw
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ContractRow;
