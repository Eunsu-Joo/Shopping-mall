import { useQuery } from "react-query";
import QueryKeys from "../../constants/queryKeys";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { GET_CART } from "../../graphql/cart";
import NoResult from "../../components/common/NoResult";
import CartItem from "../../components/cart/CartItem";

const Cart = () => {
  let { data } = useQuery([QueryKeys.CART], () => graphqlFetcher(GET_CART), {
    staleTime: 0,
  });
  if (!data) return <p>Loading..</p>;
  const newData = Object.values(data);
  return (
    <>
      <div className={"container"}>
        {newData.length === 0 ? (
          <NoResult message={"장바구니가 비었습니다."} />
        ) : (
          <ul className={"grid"}>
            {newData.map((product: any) => (
              <CartItem {...product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
export default Cart;
