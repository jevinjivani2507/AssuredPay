import React, { useState, useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { ADD_TO_CART } from "../Redux/ActionTypes";

const Card = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  // console.log(items);
  const addToCart = (e) => {
    e.preventDefault();
    dispatch({ type: ADD_TO_CART, payload: props});
  }

  return (
    <div className="w-1/4 justify-center p-5">
      <div className="rounded-[20px] shadow-lg bg-white">
        <div className="flex justify-center pt-8">
          <img
            className="h-[180px] w-[135px] text-center"
            src={props.image}
            alt="Phone Image"
          />
        </div>
        <div className="p-6 text-center">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{props.name}</h5>
          <p className="text-gray-700 text-base mb-4">
            {props.company}
          </p>
          <button
            onClick={addToCart}
            type="button"
            className="btn py-3 px-6"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
