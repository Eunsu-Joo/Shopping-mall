import { useQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import { fetcher } from "../../utils/fetcher";
import ProductItem from "../../components/product/ProductItem";
import { ProductItemProps } from "../../type";
import graphqlFetcher from "../../utils/graphqlFetcher";
import GET_PRODUCTS from "../../components/graphql/products";
const ProductPage = () => {
  const { data, isLoading } = useQuery([QueryKeys.PRODUCTS], () =>
    graphqlFetcher(GET_PRODUCTS)
  );
  if (isLoading) return <div>Loading...</div>;
  console.log({ data });
  return (
    <div>
      <h1>상품페이지</h1>
      {/*<ul*/}
      {/*  style={{*/}
      {/*    display: "grid",*/}
      {/*    gridTemplateColumns: `repeat(3,1fr)`,*/}
      {/*    width: "1200px",*/}
      {/*    gap: "10px",*/}
      {/*    margin: "0 auto",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {data.map((product: ProductItemProps) => (*/}
      {/*    <ProductItem {...product} key={product.id} />*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  );
};
export default ProductPage;
