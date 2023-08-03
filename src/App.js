import Header from "./components/Layout/Header";
import { useState } from "react";
import MealsSummary from "./components/Meals/MealsSummary";
import AvailableMeals from "./components/Meals/AvailableMeals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  function ShowCartHandler() {
    setCartIsShown(true);
  }
  function hideCartHandler() {
    setCartIsShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart close={hideCartHandler} />}
      <Header open={ShowCartHandler} />
      <main>
        <MealsSummary />
        <AvailableMeals />
      </main>
    </CartProvider>
  );
}

export default App;
