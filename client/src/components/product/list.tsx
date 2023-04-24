import { ProductsType } from "../../type";
import ProductItem from "./ProductItem";

type ProductListProps = {
  list: { products: ProductsType }[] | null;
};
const ProductList = ({ list }: ProductListProps) => {
  if (!list) return <></>;
  return (
    <>
      <ul className={"grid"}>
        {list.map((page) =>
          page.products.map((product, index) => (
            <ProductItem {...product} key={index} />
          ))
        )}
      </ul>
    </>
  );
};
export default ProductList;
