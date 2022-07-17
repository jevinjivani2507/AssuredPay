import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ONE_ITEM } from "../Redux/ActionTypes";


const Item = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const removeToCart = (e) => {
    e.preventDefault();
    dispatch({ type: REMOVE_FROM_CART, payload: props.id });
    console.log("Try To Remove");
  };


  const handleQuantityPlus = (e) => {
    dispatch({ type: ADD_TO_CART, payload: props });
  };

  const handleQuantityMinus = (e) => {
    dispatch({ type: REMOVE_ONE_ITEM, payload: props.id });
  };

  return (
    <div className="flex items-center hover:bg-gray-100 hover:rounded-[20px] px-6 py-5 mx-3">
      <div className="flex w-2/5">
        <div className="w-20">
          <img className="h-24 w-full" src={props.image} />
        </div>
        <div className="flex flex-col jus ml-4 mt-4">
          <span className="font-bold text-sm">{props.name}</span>
          <span className="text-[#222831] text-xs mt-2">{props.company}</span>
          <span
            className="text-red-400 text-xs cursor-pointer mt-2"
            onClick={removeToCart}
          >
            Remove
          </span>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button onClick={handleQuantityMinus}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          readOnly
          className="mx-2 border text-center w-8"
          type="text"
          value={props.quantity}
        />
        <button onClick={handleQuantityPlus}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        {props.mrp} ETH.
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        {props.mrp*props.quantity} ETH.
      </span>
    </div>
  );
};

export default Item;
