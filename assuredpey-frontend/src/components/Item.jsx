import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch ,useSelector } from "react-redux";
import { REMOVE_FROM_CART } from "../Redux/ActionTypes";

const Item = (props) => {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const removeToCart = (e) => {
    e.preventDefault();
    dispatch({ type: REMOVE_FROM_CART, payload: props.id });
    console.log("Try To Remove");
  }

  const mrp = props.mrp;  
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(mrp*props.quantity);


    const handleQuantityPlus = (e) => {
      setQuantity(quantity + 1);
      setTotalPrice(mrp*(quantity+1));
    }

    const handleQuantityMinus = (e) => {
      setQuantity(Math.max(0,quantity - 1));
      setTotalPrice(Math.max(0,mrp*(quantity-1)));
  }


  return (
    <div className="flex items-center hover:bg-gray-100 px-6 py-5 mx-3">
      <div className="flex w-2/5">
        <div className="w-20">
          <img
            className="h-24 w-full"
            src={props.image}
          />
        </div>
        <div className="flex flex-col jus ml-4 mt-4">
          <span className="font-bold text-sm">{props.name}</span>
          <span className="text-[#222831] text-xs mt-2">{props.company}</span>
          <button className="text-red-400 text-xs mt-2" onClick={removeToCart}>Remove</button>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button onClick={handleQuantityMinus}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input readOnly className="mx-2 border text-center w-8" type="text" value={quantity} />
        <button onClick={handleQuantityPlus}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">{props.mrp} ETH.</span>
      <span className="text-center w-1/5 font-semibold text-sm">{totalPrice} ETH.</span>
    </div>
  );
};

export default Item;
