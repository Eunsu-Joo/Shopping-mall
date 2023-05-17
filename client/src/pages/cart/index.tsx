import { useQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { GET_CART } from "../../graphql/cart";
import CartList from "../../components/cart/CartList";

const Cart = () => {
  let { data, isLoading } = useQuery<any, any, any, any>(
    [QueryKeys.CART],
    () => graphqlFetcher(GET_CART),
    {
      staleTime: 0,
    }
  );
  if (isLoading) return <p>Loading..</p>;
  return (
    <div className={"container"}>
      <h1>장바구니</h1>
      <CartList items={(data!.cart as any) || []} />
    </div>
  );
};
export default Cart;
