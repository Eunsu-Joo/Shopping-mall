import { ProductsType } from "../../type";
import ProductItem from "./ProductItem";

const ProductList = ({ list }: { list: { products: ProductsType }[] }) => {
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
