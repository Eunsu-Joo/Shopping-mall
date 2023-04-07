import { ProductType } from "../../type";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { DELETE_PRODUCT } from "../../graphql/products";
import QueryKeys from "../../constants/queryKeys";

const AdminItem = ({ id, title, imageUrl }: ProductType) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ id }: { id: number }) => {
      return graphqlFetcher(DELETE_PRODUCT, { id });
    },
    {
      onSuccess: async () => {
        if (confirm("삭제에 성공했습니다.")) {
          await queryClient.invalidateQueries([QueryKeys.PRODUCTS]);
        }
      },
    }
  );
  const onClick = () => {
    mutate({ id: +id });
  };
  return (
    <li className={"adminItem"}>
      <Link to={`/admin/${id}`}>
        <div>
          <span>{id}</span>
          <img src={imageUrl as string} alt="이미지" />
          <p>{title}</p>
        </div>
      </Link>
      <Button onClick={onClick}>삭제</Button>
    </li>
  );
};
export default AdminItem;
