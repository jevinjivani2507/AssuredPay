import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  USER,
  VENDOR_CONTRACT_ADDRESS,
  REMOVE_ONE_ITEM,
} from "../ActionTypes";

export const cart = (
  state = {
    items: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "Connect",
    vendorContractAddress: localStorage.getItem("vendorContractAddress")
      ? JSON.parse(localStorage.getItem("vendorContractAddress"))
      : "",
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART: {
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.items, action.payload])
      );
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case REMOVE_FROM_CART: {
      localStorage.setItem(
        "cart",
        JSON.stringify(state.items.filter((item) => item !== action.payload))
      );
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    case REMOVE_ONE_ITEM: {
      const intext = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (intext !== -1) {
        const newItems = [...state.items];
        newItems.splice(intext, 1);
        localStorage.setItem("cart", JSON.stringify(newItems));
        return {
          ...state,
          items: newItems,
        };
      }else{
        return state;
      }
    }
    case USER: {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    }
    case VENDOR_CONTRACT_ADDRESS: {
      localStorage.setItem(
        "vendorContractAddress",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        vendorContractAddress: action.payload,
      };
    }

    default:
      return state;
  }
};
