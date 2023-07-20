import { useContext } from "react";
import { ReducerContext } from "./ReducerContext";

export function Products({ products }) {
  return (
    <div className="Products">
      <h2>Products</h2>
      {products.map((product) => (
        <Product product={product} key={product.name} />
      ))}
    </div>
  );
}
function Product({ product }) {
  const { name, price } = product;
  const { onDispatch } = useContext(ReducerContext);
  return (
    <div className="Product">
      <h3>{name}</h3>
      <p>Buy it for ${price}</p>
      <button onClick={() => onDispatch({ type: "ADD_TO_CART", product })}>
        AddToCart
      </button>
    </div>
  );
}
