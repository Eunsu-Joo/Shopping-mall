import { useQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import { useParams } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import { ProductItemProps } from "../../type";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery<ProductItemProps>(
    [QueryKeys.PRODUCTS, id],
    () =>
      fetcher({
        method: "GET",
        path: `/products/${id}`,
      })
  );
  if (isLoading) return <div>Loading...</div>;
  const { title, category, image, price, rating, description } =
    product as ProductItemProps;
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
      <img src={image} alt={title} />
      <h2>${price}</h2>
      <h4>Category : {category}</h4>
      <p>{description}</p>
    </div>
  );
};
export default ProductDetailPage;
