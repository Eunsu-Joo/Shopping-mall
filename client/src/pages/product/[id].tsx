import { useQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import { useParams } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import { ProductType } from "../../type";
import graphqlFetcher from "../../utils/graphqlFetcher";
import GET_PRODUCTS, { GET_PRODUCT } from "../../graphql/products";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery([QueryKeys.PRODUCT, id], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  );

  if (isLoading) return <div>Loading...</div>;
  const { title,  imageUrl, price , description } =
    data.product as ProductType;

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
      <img src={imageUrl} alt={title} />
      <h2>${price}</h2>
      <p>{description}</p>
    </div>
  );
};
export default ProductDetailPage;
