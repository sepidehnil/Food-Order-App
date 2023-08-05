import Modal from "../UI/Modal";
import "./Cart.css";
import CartContext from "../../store/Cart-context";
import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

function Cart(props) {
  const [order, setOrder] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const CartItems = (
    <div className="allItems">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </div>
  );

  function orderHandler() {
    setOrder(true);
  }
  function cancelHandler() {
    setOrder(false);
  }
  const modalActions = (
    <div className="btns">
      <button className="btn1" onClick={props.close}>
        Close
      </button>
      {hasItems && (
        <button className="btn2" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const submitOrderHandler = async (userData) => {
    setisSubmitting(true);
    await fetch(
      "https://food-order-app-f1d83-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setisSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const CartModalContent = (
    <React.Fragment>
      <div>{CartItems}</div>
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {order && (
        <CheckOut onConfirm={submitOrderHandler} onCancel={cancelHandler} />
      )}
      {!order && modalActions}
    </React.Fragment>
  );
  const isSubmttingOrderData = <p>Sending order data ...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfuly sent the order!</p>
      <div className="btns">
        <button className="btn1" onClick={props.close}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal close={props.close}>
      {!isSubmitting && !didSubmit && CartModalContent}
      {isSubmitting && isSubmttingOrderData}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}
export default Cart;
