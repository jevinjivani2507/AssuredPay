import React from "react";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../Redux/ActionTypes";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const removeToCart = (e) => {
    e.preventDefault();
    dispatch({ type: REMOVE_FROM_CART });
  };
  return (
    <div className="flex bg-[#FFFFFF] mx-[30px] my-[30px] rounded-[20px] shadow-lg h-[83.5vh]">
      <div className="flex flex-col w-3/4 overflow-scroll scrollbar-hide">
        <header className="top-0 sticky flex justify-between border-b px-10 py-10 bg-[#FFFFFF] rounded-tl-[20px]">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl">{items.length} Items</h2>
        </header>
        <div className="flex mt-10 mb-5 pl-5 justify-center">
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

        <div className="">
          {items.length>0 && Object.values(items
            .reduce((acc, item) => {

              const tempVer = acc;
              tempVer[item.id] = tempVer[item.id] || [];
              tempVer[item.id].push(item);
              return tempVer;
            }, {}))
            .map((pId) => (
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
          <span className="font-semibold text-sm uppercase">Items 3</span>
          <span className="font-semibold text-sm">590$</span>
        </div>
        <div>
          <label className="font-medium inline-block mb-3 text-sm uppercase">
            Shipping
          </label>
          <select className="block p-2 text-gray-600 w-full text-sm">
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
            <span>$600</span>
          </div>
          <div className="flex">
            <button className="btn py-3 w-full ml-1">Ashortpay</button>
            <button className="btn py-3 w-full ml-1">Ashortpay</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
