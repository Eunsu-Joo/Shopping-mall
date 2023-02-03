import { useQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import { fetcher } from "../../utils/fetcher";
import ProductItem from "../../components/product/ProductItem";
import { ProductItemProps } from "../../type";
import graphqlFetcher from "../../utils/graphqlFetcher";
import GET_PRODUCTS from "../../graphql/products";
import NoResult from "../../components/common/NoResult";
const ProductPage = () => {
  const { data, isLoading } = useQuery([QueryKeys.PRODUCTS], () =>
    graphqlFetcher(GET_PRODUCTS)
  );
  if (isLoading) return <div>Loading...</div>;
  if (data.length === 0) return <NoResult message={"상품이 없습니다."} />;
  return (
    <div className={"container"}>
      <h1>상품페이지</h1>
      <ul className={"grid"}>
        {data.map((product: ProductItemProps) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};
export default ProductPage;
