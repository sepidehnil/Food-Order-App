import { useReducer } from "react";
import CartContext from "./Cart-context";

const defaultCartReducer = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const exsistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exsistingCartItem = state.items[exsistingCartItemIndex];
    let updatedItems;

    if (exsistingCartItem) {
      const updatedItem = {
        ...exsistingCartItem,
        amount: exsistingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exsistingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "remove") {
    const exsistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exsistingCartItem = state.items[exsistingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - exsistingCartItem.price;
    let updatedItems;
    if (exsistingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateItem = {
        ...exsistingCartItem,
        amount: exsistingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[exsistingCartItemIndex] = updateItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartReducer;
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartReducer);
  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCart({ type: "remove", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
