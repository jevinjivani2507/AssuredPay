import React, { useState, useEffect } from "react";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  USER,
  VENDOR_CONTRACT_ADDRESS,
} from "../Redux/ActionTypes";
import axios from "axios";
import AssuredPay from "../contracts/AssuredPay";
import { ethers } from "ethers";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.cart.user);

  const vendorContractAddress = useSelector(
    (state) => state.cart.vendorContractAddress
  );

  // console.log(user);
  // console.log(vendorContractAddress);

  const removeToCart = (e) => {
    e.preventDefault();
    dispatch({ type: REMOVE_FROM_CART });
  };

  const [paymentDetails, setPaymentDetails] = useState("");

  const makePayment = async () => {
    const { contractAddress, amount } = JSON.parse(
      JSON.stringify(paymentDetails)
    );

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const assuredPayContract = new ethers.Contract(
      contractAddress,
      AssuredPay.abi,
      signer
    );

    const txResponse = await assuredPayContract.pay({
      value: ethers.utils.parseEther(amount.toString()),
    });
    const txReceipt = await txResponse.wait();
    console.log(await assuredPayContract.getBalance());

    // console.log(txReceipt);
  };

  useEffect(() => {
    console.log(JSON.stringify(paymentDetails).length);
    if (JSON.stringify(paymentDetails).length > 2) {
      makePayment();
    }
  }, [paymentDetails]);

  const fetchPayment = async (e) => {
    e.preventDefault();
    const payload = {
      customerAddress: user,
      vendorAddress: vendorContractAddress,
      products: items,
    };

    await axios
      .post("http://localhost:5000/createContract", payload)
      .then((res) => {
        // console.log(res.data);
        setPaymentDetails(res.data);

        // makePayment();
      });
  };

  return (
    <div className="flex bg-[#FFFFFF] m-[4vh] rounded-[20px] shadow-lg">
      <div className="flex flex-col w-3/4 overflow-scroll scrollbar-hide h-[85vh]">
        <div className="top-0 sticky bg-[#FFFFFF] rounded-tl-[20px]">
          <header className="top-0 sticky flex justify-between border-b px-10 py-10">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{items.length} Items</h2>
          </header>
          <div className="flex mt-5 mb-5 px-10 justify-center">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
        </div>

        <div className="">
          {items.length > 0 &&
            Object.values(
              items.reduce((acc, item) => {
                const tempVer = acc;
                tempVer[item.id] = tempVer[item.id] || [];
                tempVer[item.id].push(item);
                return tempVer;
              }, {})
            ).map((pId) => (
              <Item
                key={pId[0].id}
                id={pId[0].id}
                name={pId[0].name}
                company={pId[0].company}
                image={pId[0].image}
                mrp={pId[0].mrp}
                quantity={pId.length}
              />
            ))}
        </div>
      </div>

      <div
        id="summary"
        className="w-1/4 p-10 bg-[#222831] text-[#FFFFFF] shadow-sm rounded-r-[20px]"
      >
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">
            Items {items.length}
          </span>
          <span className="font-semibold text-sm">
            {items.reduce((acc, item) => {
              return acc + item.mrp;
            }, 0).toFixed(4)}{" "}
            ETC
          </span>
        </div>
        <div>
          <label className="font-medium inline-block mb-3 text-sm uppercase">
            Shipping
          </label>
          <select className="block p-2 text-gray-600 w-full text-sm">
            <option>AssuredPay</option>
            <option>Standard shipping - $10.00</option>
          </select>
        </div>
        <div className="pt-10 pb-7">
          <label
            htmlFor="promo"
            className="font-semibold inline-block mb-3 text-sm uppercase"
          >
            Promo Code
          </label>
          <input
            type="text"
            id="promo"
            placeholder="Enter your code"
            className="p-2 text-sm w-full text-[#1E1E1E]"
          />
        </div>
        <button className="bg-indigo-600 hover:bg-[#27496D] px-5 py-2 text-sm uppercase rounded-[5px]">
          Apply
        </button>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>
              {items.reduce((acc, item) => {
                return acc + item.mrp;
              }, 0).toFixed(4)}{" "}
              ETC
            </span>
          </div>
          <div className="flex">
            <button className="btn py-3 w-full ml-1" onClick={fetchPayment}>
              AssuredPay
            </button>
            {/* <button className="btn py-3 w-full ml-1">Ashortpay</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
