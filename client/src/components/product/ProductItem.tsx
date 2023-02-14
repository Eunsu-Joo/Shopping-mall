import { ProductType } from "../../type";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useMutation } from "react-query";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { ADD_CART } from "../../graphql/cart";

const ProductItem = ({
  title,
  description,
  imageUrl,
  id,
  price,
}: ProductType) => {
  const { mutate: addCart,data } = useMutation((id: string) =>
    graphqlFetcher(ADD_CART, { id }),{
      onSuccess:() => {alert("상품을 장바구니에 담았습니다.")
      }
      }
  );
  return (
    <li className={"listItem"}>
      <Link to={`/product/${id}`}>
        <img
          width={300}
          height={150}
          src={imageUrl}
          alt={title}
          style={{ objectFit: "cover", marginBottom: "8px" }}
        />
      </Link>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        &nbsp;
        <strong>${price}</strong>
      </p>
      <Button onClick={() => addCart(id)}>장바구니 버튼</Button>
    </li>
  );
};
export default ProductItem;
