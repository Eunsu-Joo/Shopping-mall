import { useQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import { useParams } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import { ProductItemProps } from "../../type";
import graphqlFetcher from "../../utils/graphqlFetcher";
import GET_PRODUCTS, { GET_PRODUCT } from "../../graphql/products";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery([QueryKeys.PRODUCT, +id!], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  );

  if (isLoading) return <div>Loading...</div>;
  const { title, category, url, price, rating, description } =
    data.product as ProductItemProps;
  console.log(data);
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>{title}</h1>
      <img src={url} alt={title} />
      <h2>${price}</h2>
      <h4>Category : {category}</h4>
      <p>{description}</p>
    </div>
  );
};
export default ProductDetailPage;
