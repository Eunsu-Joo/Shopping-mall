import { useMutation, useQuery, useQueryClient } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "../../type";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { DELETE_PRODUCT, GET_PRODUCT } from "../../graphql/products";
import Button from "../../components/common/Button";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery([QueryKeys.PRODUCT, id], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  );
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ id }: { id: string }) => {
      return graphqlFetcher(DELETE_PRODUCT, { id });
    },
    {
      onSuccess: async () => {
        if (confirm("삭제에 성공했습니다.")) {
          await queryClient.invalidateQueries([QueryKeys.PRODUCTS]);
          await navigator("/products");
        }
      },
    }
  );
  if (isLoading) return <div>Loading...</div>;
  const { title, imageUrl, price, description } = data.product as ProductType;

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
      <p className={"description"}>{description}</p>
      <Button onClick={() => mutate({ id: id as string })}>삭제하기</Button>
    </div>
  );
};
export default ProductDetailPage;
