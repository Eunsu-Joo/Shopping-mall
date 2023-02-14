import { ProductsType } from "../../type";
import ProductItem from "./ProductItem";

const ProductList = ({ list }: { list: ProductsType }) => {
  return (
    <>
      <ul className={"grid"}>
        {list.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </>
  );
};
export default ProductList;
