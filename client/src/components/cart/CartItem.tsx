import { Link } from "react-router-dom";
import { CartsType, CartType, ProductType } from "../../type";
import { useMutation, useQueryClient } from "react-query";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { DELETE_CART, UPDATE_CART } from "../../graphql/cart";
import React, { ChangeEvent, ForwardedRef, useState } from "react";
import QueryKeys from "../../constants/queryKeys";
import Button from "../common/Button";

const CartItem = (
  { product, amount, id: cartId }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = useQueryClient();
  const { price, title, imageUrl, id } = product as ProductType;
  const [newAmount, setNewAmount] = useState(amount);
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      // onSuccess: async () => {
      //   await queryClient.invalidateQueries([QueryKeys.CART]);
      // },
      //  서버에 값을 보내기 전에 미리 snapshot을 치는 부분 => onMutate
      onMutate: async ({ id, amount }) => {
        const prevData = queryClient.getQueryData<{ cart: CartsType }>([
          QueryKeys.CART,
        ]);
        const existCartItem = prevData?.cart.find((cart) => cart.id === id);
        if (!existCartItem) return;
        const newData = {
          ...existCartItem,
          amount,
        };

        //
        queryClient.setQueryData([QueryKeys.CART], {
          cart: prevData!.cart.map((cart) => (cart.id === id ? newData : cart)),
        });
        return prevData;
      },
      onSuccess: ({ updateCart }) => {
        const prevData = queryClient.getQueryData<{ cart: CartsType }>([
          QueryKeys.CART,
        ]);
        queryClient.setQueryData([QueryKeys.CART], {
          cart: prevData!.cart.map((cart) =>
            cart.id === id ? updateCart : cart
          ),
        });
        // const newCart = {
        //   ...(prevCart || {}),
        //   [id]: newValue,
        // };
        // // 이렇게 할 경우 요청을 2번 함. get_cart, update_cart
        // // QueryKeys.CART = get_cart 쿼리를 무효화 함으로 다시요청하기에 2번 요청을 하게 됨.
        // //

        // queryClient.setQueryData([QueryKeys.CART], { cart: newCart });
      },
      onError: (error, variables, context) => {
        return alert("100개 이하로 입력하세요.");
      },
    }
  );
  const { mutate: deleteCart } = useMutation(
    (id: string) => graphqlFetcher(DELETE_CART, { id: cartId }),
    {
      onSuccess: async () => {
        if (confirm("삭제에 완료하였습니다.")) {
          await queryClient.invalidateQueries([QueryKeys.CART]);
        }
      },
    }
  );
  const handleUpdateAmount = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < 1) return;
    setNewAmount(+event.target.value);
    updateCart({ id, amount: +event.target.value });
  };

  return (
    <li className={"listItem"}>
      <label htmlFor="">
        <input
          type="checkbox"
          name={`select-item`}
          className={"cartItem_checkbox"}
          ref={ref}
          value={id}
        />
      </label>
      <Link to={`/product/${id}`}>
        <img
          width={300}
          height={150}
          src={imageUrl}
          alt={title}
          style={{ objectFit: "cover", marginBottom: "8px" }}
        />
      </Link>
      <h2>{title}</h2>
      <p>
        <strong>${price}</strong>
      </p>
      <div className={"amount"}>
        <p>수량</p>
        <input
          type="number"
          className={"cartInput"}
          onChange={handleUpdateAmount}
          value={newAmount}
        />
        <Button type={"button"} onClick={() => deleteCart(id)}>
          삭제
        </Button>
      </div>
    </li>
  );
};
export default React.forwardRef(CartItem);
