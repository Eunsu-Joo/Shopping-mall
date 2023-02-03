import { Link } from "react-router-dom";
import { CartType } from "../../type";
import { useMutation } from "react-query";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { UPDATE_CART } from "../../graphql/cart";
import { ChangeEvent, SyntheticEvent } from "react";

const CartItem = ({ id, price, url, title }: CartType) => {
  // const queryClient=
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: number; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount })
  );
  const handleUpdateAmount = (event: ChangeEvent<HTMLInputElement>) => {
    updateCart({ id, amount: +event.target.value });
  };
  return (
    <li className={"listItem"}>
      <Link to={`/product/${id}`}>
        <img
          width={300}
          height={150}
          src={url}
          alt={title}
          style={{ objectFit: "cover", marginBottom: "8px" }}
        />
      </Link>
      <h2>{title}</h2>
      <p>
        <strong>${price}</strong>
      </p>
      <div className={"amount"}>
        <p>수량</p>
        <input
          type="number"
          className={"cartInput"}
          min={0}
          max={99}
          onChange={handleUpdateAmount}
        />
        {/*<button>-</button>*/}
        {/*<span>0</span>*/}
        {/*<button>+</button>*/}
      </div>
    </li>
  );
};
export default CartItem;
