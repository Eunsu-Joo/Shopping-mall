import { ProductItemProps } from "../../type";
import { Link } from "react-router-dom";
// type ProductItemType= Omit<ProductItemProps, "id"> & {id:string}
const ProductItem = ({
  title,
  category,
  description,
  image,
  rating,
  id,
  price,
}: ProductItemProps) => {
  return (
    <li className={"listItem"}>
      <Link to={`/product/${id}`}>
        <img
          width={150}
          height={150}
          src={image}
          alt={title}
          style={{ objectFit: "contain" }}
        />
        <h2>{title}</h2>
        <p>
          <span>{category}</span>
          &nbsp;
          <strong>${price}</strong>
        </p>
      </Link>
    </li>
  );
};
export default ProductItem;
