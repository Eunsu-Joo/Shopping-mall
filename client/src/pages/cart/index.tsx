import { useMutation, useQuery, useQueryClient } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { GET_CART } from "../../graphql/cart";
import { CartType } from "../../type";
import CartList from "../../components/cart/CartList";

const Cart = () => {
  let { data, isLoading } = useQuery(
    [QueryKeys.CART],
    () => graphqlFetcher(GET_CART),
    {
      staleTime: 0,
    }
  );
  if (isLoading) return <p>Loading..</p>;
  return (
    <>
      <CartList items={data?.cart || []} />
    </>
  );
};
export default Cart;
