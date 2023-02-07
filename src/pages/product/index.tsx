import { useQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import { fetcher } from "../../utils/fetcher";
import ProductItem from "../../components/product/ProductItem";
import graphqlFetcher from "../../utils/graphqlFetcher";
import GET_PRODUCTS from "../../graphql/products";
import NoResult from "../../components/common/NoResult";
import ProductList from "../../components/product/list";
const ProductPage = () => {
  const { data, isLoading } = useQuery([QueryKeys.PRODUCTS], () =>
    graphqlFetcher(GET_PRODUCTS)
  );
  if (isLoading) return <div>Loading...</div>;
  if (data.length === 0) return <NoResult message={"상품이 없습니다."} />;
  return (
    <div className={"container"}>
      <h1>상품페이지</h1>
      <ProductList list={data || []} />
    </div>
  );
};
export default ProductPage;
