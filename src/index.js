import { StrictMode, useReducer } from "react";
import { createRoot } from "react-dom/client";
import { v4 as uuidV4 } from "uuid";
import { Cart } from "./Cart";
import { Products } from "./Products";
import { PRODUCTS } from "./PRODUCTS";
import { ReducerContext } from "./ReducerContext";

import "./styles.css";

const INITIAL_CART = {
  cartItems: [],
  totalValue: 0
};

function createCartItem(product) {
  return {
    id: uuidV4(),
    name: product.name,
    price: product.price
  };
}

function calculateCartTotalValue(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
}

function cartReducer(prevCart, action) {
  if (action.type === "ADD_TO_CART") {
    const { product } = action;
    const newCartItem = createCartItem(product);
    const newCartItems = [...prevCart.cartItems, newCartItem];
    const newTotalValue = calculateCartTotalValue(newCartItems);
    return {
      cartItems: newCartItems,
      totalValue: newTotalValue
    };
  }
  if (action.type === "REMOVE_FROM_CART") {
    const { cartItem } = action;
    const newCartItems = prevCart.cartItems.filter(
      (item) => item.id !== cartItem.id
    );
    const newTotalValue = calculateCartTotalValue(newCartItems);
    return {
      cartItems: newCartItems,
      totalValue: newTotalValue
    };
  }
  if (action.type === "BUY_ALL_ITEMS") {
    return INITIAL_CART;
  }
  return prevCart;
}

function Shop() {
  // const [cart, setCart] = useState(INITIAL_CART);
  const [cart, cartDispatch] = useReducer(cartReducer, INITIAL_CART);

  function buyAllItems() {
    alert("Thank you for buying");
    cartDispatch({ type: "BUY_ALL_ITEMS" });
  }

  return (
    <div className="Shop">
      <ReducerContext.Provider value={{ cart, onDispatch: cartDispatch }}>
        <Products products={PRODUCTS} />
        <Cart cart={cart} onBuyAllItems={buyAllItems} />
      </ReducerContext.Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Shop />
  </StrictMode>
);
