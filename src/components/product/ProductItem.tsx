import { ProductItemType } from "../../type";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { ADD_CART } from "../../graphql/cart";
// type ProductItemType= Omit<ProductItemProps, "id"> & {id:string}
const ProductItem = ({
  title,
  category,
  description,
  url,
  rating,
  id,
  price,
}: ProductItemType) => {
  const { mutate: addCart } = useMutation((id: number) =>
    graphqlFetcher(ADD_CART, { id })
  );
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
      <p>{description}</p>
      <p>
        <span>{category}</span>
        &nbsp;
        <strong>${price}</strong>
      </p>
      <Button onClick={() => addCart(id)}>장바구니 버튼</Button>
    </li>
  );
};
export default ProductItem;
