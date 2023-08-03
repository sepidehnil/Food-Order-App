import styles from "./Input.module.css";
import React from "react";
const Input = React.forwardRef((props, ref) => {
  return (
    <form>
      <label className={styles["meals-amount"]} htmlFor={props.input.id}>
        {props.label}
      </label>
      <input ref={ref} {...props.input} className={styles["meals-input"]} />
    </form>
  );
});
export default Input;
