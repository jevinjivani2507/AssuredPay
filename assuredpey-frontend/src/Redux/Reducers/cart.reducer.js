import { ADD_TO_CART, REMOVE_FROM_CART } from "../ActionTypes";

export const cart = (
  state = {
    items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART: { 
      localStorage.setItem("cart", JSON.stringify([...state.items, action.payload]));
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case REMOVE_FROM_CART: {
      localStorage.setItem("cart", JSON.stringify(state.items.filter(item => item !== action.payload)));
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
