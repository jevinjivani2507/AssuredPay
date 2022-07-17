import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssuredPayFactory from "../contracts/AssuredPayFactory";
import AssuredPay from "../contracts/AssuredPay";
import { ethers } from "ethers";

const Status = () => {
  const { address } = useParams();

  const [orderId, setOrderId] = useState("");
  const [dprovider, setDProvider] = useState("");

  useEffect(() => {
    const getContractDetails = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address, AssuredPay.abi, provider);

      // const details = {
      //     "customer" : {customer},
      //     "vendor" : {vendor}
      // }

      // setContractDetails(details);
      // console.log(getbalance);
    };
    getContractDetails();
  }, []);

  const submitFunction = async (e) => {
    e.preventDefault();

    console.log(orderId);
    console.log(dprovider);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, AssuredPay.abi, signer);

    const txResponse = await contract.setOrder(orderId, dprovider);
    const txRecipt = await txResponse.wait();

    console.log(await contract.order());
  };

  return (
    <div className="p-10 min-h-[91vh] h-full">
      <div className=" mb-10">
        <span className="bg-black btn px-4 py-3 text-white">
          Customer Contract
        </span>
        <span className="solid  px-4 py-3 border-solid ">{address}</span>
      </div>

      <form onSubmit={submitFunction}>
        <label className="block text-gray-700 text-sm font-bold mb-2">OrderId :</label>
        <input
        className="shadow appearance-none border w-1/2  rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={orderId}
          onChange={(e) => {
            setOrderId(e.target.value);
          }}
        />
        <label className="block text-gray-700 text-sm mt-5 font-bold mb-2">Provider:</label>
        <input
        className="shadow appearance-none border w-1/2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={dprovider}
          onChange={(e) => {
            setDProvider(e.target.value);
          }}
        />
        <input className="block mt-10 bg-black btn px-4 py-3 text-white" type="submit" value="Submit" />
      </form>

      {/* <div className="h-[50vh] w-[100vh] bg-white rounded-[20px] shadow-xl p-10">
        
      </div> */}
    </div>
  );
};

export default Status;
