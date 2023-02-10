import { useMutation, useQuery, useQueryClient } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { GET_CART } from "../../graphql/cart";
import { CartType } from "../../type";
import CartList from "../../components/cart/CartList";

const Cart = () => {
  let { data } = useQuery([QueryKeys.CART], () => graphqlFetcher(GET_CART), {
    staleTime: 0,
  });
  if (!data) return <p>Loading..</p>;
  const newData: CartType[] = Object.values(data);
  return (
    <>
      <CartList items={newData} />
    </>
  );
};
export default Cart;
