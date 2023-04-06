import { ProductsType } from "../../type";
import ProductItem from "./ProductItem";

const ProductList = ({ list }: { list: { products: ProductsType }[] }) => {
  return (
    <>
      <ul className={"grid"}>
        {list.map((page) =>
          page.products.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))
        )}
      </ul>
    </>
  );
};
export default ProductList;
