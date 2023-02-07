import { Link } from "react-router-dom";
import { CartType } from "../../type";
import { useMutation, useQueryClient } from "react-query";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { DELETE_CART, UPDATE_CART } from "../../graphql/cart";
import { ChangeEvent, ForwardedRef } from "react";
import QueryKeys from "../../constants/queryKeys";
import Button from "../common/Button";
import React from "react";
const CartItem = (
  { id, price, url, title, amount }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = useQueryClient();
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: number; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      // onSuccess: async () => {
      //   await queryClient.invalidateQueries([QueryKeys.CART]);
      // },
      //  서버에 값을 보내기 전에 미리 snapshot을 치는 부분 => onMutate
      onMutate: async ({ id, amount }) => {
        const prevData = queryClient.getQueryData<{ [key: string]: CartType }>([
          QueryKeys.CART,
        ]);
        if (!prevData?.id) return;
        const newData = {
          ...(prevData || {}),
          [id]: { ...prevData[id], amount },
        };
        queryClient.setQueryData([QueryKeys.CART], newData);
        return prevData;
      },
      onSuccess: (newValue) => {
        const prevCart = queryClient.getQueryData([QueryKeys.CART]);
        const newCart = {
          ...(prevCart || {}),
          [id]: newValue,
        };
        // 이렇게 할 경우 요청을 2번 함. get_cart, update_cart
        // QueryKeys.CART = get_cart 쿼리를 무효화 함으로 다시요청하기에 2번 요청을 하게 됨.

        queryClient.setQueryData([QueryKeys.CART], newCart);
      },
    }
  );
  const { mutate: deleteCart } = useMutation(
    (id: number) => graphqlFetcher(DELETE_CART, { id }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([QueryKeys.CART]);
      },
    }
  );
  const handleUpdateAmount = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < 1) return;
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
          src={url}
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
          min={1}
          max={99}
          onChange={handleUpdateAmount}
          value={amount}
        />
        <Button type={"button"} onClick={() => deleteCart(id)}>
          삭제
        </Button>
      </div>
    </li>
  );
};
export default React.forwardRef(CartItem);
