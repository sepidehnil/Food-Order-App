import styles from "./Header.module.css";
import { Fragment, useContext } from "react";
import mealsImage from "../../assets/meals.jpg";
import CartContext from "../../store/Cart-context";

function Header(props) {
  const cartCtx = useContext(CartContext);
  //The value resulting from the previous call to callbackFn. On first call, initialValue if specified, otherwise the value of array[0].
  //it returns array as an single value
  const numberOfCartItems = cartCtx.items.reduce((cuNumber, item) => {
    return cuNumber + item.amount;
  }, 0);
  return (
    <Fragment>
      <header className={styles.headerContainer}>
        <h1>ReactMeals</h1>
        <div className={styles.headerCart} onClick={props.open} >
          <i className="bi bi-cart4"></i>
          <div>Your Cart</div>
          <div className={styles.cartNumber}>{numberOfCartItems}</div>
        </div>
      </header>

      <div className={styles.headerImage}>
        <img src={mealsImage} alt="a dining table with lots of food"></img>
      </div>
    </Fragment>
  );
}
export default Header;
