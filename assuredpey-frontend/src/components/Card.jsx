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
    <div class="w-1/4 justify-center p-5">
      <div class="rounded-[20px] shadow-lg bg-white">
        <div className="flex justify-center pt-8">
          <img
            class="h-[180px] w-[135px] text-center"
            src={props.image}
            alt="Phone Image"
          />
        </div>
        <div class="p-6 text-center">
          <h5 class="text-gray-900 text-xl font-medium mb-2">{props.name}</h5>
          <p class="text-gray-700 text-base mb-4">
            {props.company}
          </p>
          <button
            onClick={addToCart}
            type="button"
            class="btn py-3 px-6"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
