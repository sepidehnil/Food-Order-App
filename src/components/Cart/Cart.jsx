import Modal from "../UI/Modal";
import "./Cart.css";
import CartContext from "../../store/Cart-context";
import { useContext } from "react";
import CartItem from "./CartItem";

function Cart(props) {
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
  return (
    <Modal close={props.close}>
      <div>{CartItems}</div>
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      <div className="btns">
        <button className="btn1" onClick={props.close}>
          Close
        </button>
        {hasItems && <button className="btn2">Order</button>}
      </div>
    </Modal>
  );
}
export default Cart;
