import { useContext } from "react";
import { ReducerContext } from "./ReducerContext";

export function Cart({ cart, onBuyAllItems }) {
  const { cartItems, totalValue } = cart;
  return (
    <div className="Cart">
      <h2>Shopping cart</h2>
      {cartItems.length > 0 ? (
        <>
          <CartItems cartItems={cartItems} />
          <button onClick={onBuyAllItems}>
            Buy now for just ${totalValue}
          </button>
        </>
      ) : (
        "The cart is empty"
      )}
    </div>
  );
}
function CartItems({ cartItems }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </tbody>
    </table>
  );
}
function CartItem({ cartItem }) {
  const { name, price } = cartItem;
  const { onDispatch } = useContext(ReducerContext);
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <a onClick={() => onDispatch({ type: "REMOVE_FROM_CART", cartItem })}>
          [x]
        </a>
      </td>
    </tr>
  );
}
