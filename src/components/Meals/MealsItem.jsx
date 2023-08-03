import styles from "./MealsItem.module.css";
import Input from "../UI/Input";
import { Fragment, useState } from "react";
import { useRef } from "react";
import CartContext from "../../store/Cart-context";
import { useContext } from "react";

function MealsItem(props) {
  const amountInputRef = useRef();
  const [amountValid, setAmountIsValid] = useState(true);
  const cartCtx = useContext(CartContext);
  function handleClick(event) {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: enteredAmountNum,
    });
  }

  return (
    <Fragment>
      <div className={styles["meals"]}>
        <div className={styles["meals-sec1"]}>
          <div className={styles["meals-title"]}>{props.name}</div>
          <div className={styles["meals-description"]}>{props.description}</div>
          <div className={styles["meals-price"]}>${props.price}</div>
        </div>

        <div>
          <Input
            label="Amount"
            ref={amountInputRef}
            input={{
              id: props.id,
              type: "number",
              min: "1",
              max: "5",
              step: "1",
            }}
          />
          <div>
            <button className={styles["add-meals"]} onClick={handleClick}>
              + Add
            </button>
          </div>
          {!amountValid && <p>Please enter a valid number (1-5)</p>}
        </div>
      </div>
      <div className={styles.border}></div>
    </Fragment>
  );
}
export default MealsItem;
