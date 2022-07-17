import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssuredPayFactory from "../contracts/AssuredPayFactory";
import AssuredPay from "../contracts/AssuredPay";
import { ethers } from "ethers";

const Tracking = () => {
  const { address } = useParams();

  const [balance, setBalance] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [customer, setCustomer] = useState("");
  const [vendor, setVendor] = useState("");
  const [orderState, setOrderState] = useState("");

  const [result, setResult] = useState("");
  const [owner, setOwner] = useState("");
  const [order, setOrder] = useState("");
  // const [customer, setCustomer] = useState("");

  useEffect(() => {
    const getContractDetails = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address, AssuredPay.abi, provider);

      // const balance = ethers.utils.formatEther(await contract.getbalance());
      const paymentAmount = ethers.utils.formatEther(await contract.i_amount());
      const order = await contract.order();
      console.log(order);
      const isTransactionsFullfilled =
        await contract.s_isTransactionFulfilled();
      const orderState = await contract.s_orderState();
      const vendor = await contract.i_vendor();
      const customer = await contract.i_customer();

      setCustomer(customer);
      setVendor(vendor);
      setBalance(balance);
      setPaymentAmount(paymentAmount);
      setOrder(order[0]);
      setOrderState(orderState);
      setResult(isTransactionsFullfilled);
    

      // const details = {
      //     "customer" : {customer},
      //     "vendor" : {vendor}
      // }

      // setContractDetails(details);
      // console.log(getbalance);
    };
    getContractDetails();
  }, []);

  return (
    <div className="p-10 min-h-[91vh] h-full">
      <div className=" mb-10">
        <span className="bg-black btn px-4 py-3 text-white">
          Tacking Contract
        </span>
        <span className="solid  px-4 py-3 border-solid ">{address}</span>
      </div>
      <div className="h-[50vh] w-[100vh] bg-white rounded-[20px] shadow-xl p-10">
        <div>
          <span>Customer : </span>
          <span>{customer}</span>
        </div>
        <div>
          <span>Vendor : </span>
          <span>{vendor}</span>
        </div>
        <div>
            <span>Balance : </span>
            <span>{balance}</span>
        </div>
        <div>
            <span>PaymentAmount : </span>
            <span>{paymentAmount}</span>
        </div>
        <div>
          <span>Order : </span>
          <span>{order.length > 0 ? "Order Not Set" : "else"}</span>
        </div>
        <div>
          <span>Order State : </span>
          <span>
            {orderState == 2
              ? "FAILED"
              : orderState == 1
              ? "PENDING"
              : "SUCCESS"}
          </span>
        </div>
        <div>
            <span>TrasactionFullfilled : </span>
            <span>{result ? "True" : "False"}</span>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
