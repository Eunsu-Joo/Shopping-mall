import { useRecoilState } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import WillPay from "../willPay";
import { useState } from "react";
import PaymentModal from "./modal";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import graphqlFetcher from "../../utils/graphqlFetcher";
import { EXECUTE_PAY } from "../../graphql/payment";
import QueryKeys from "../../constants/queryKeys";

type ExecutePayRequest = string[];
const Payment = () => {
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const queryClient = useQueryClient();
  const { mutate: executePay } = useMutation(
    (ids: ExecutePayRequest) => graphqlFetcher(EXECUTE_PAY, { ids }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([QueryKeys.CART]);
      },
    }
  );
  const [show, setShow] = useState(false);
  const navigator = useNavigate();
  const onToggleShow = () => {
    setShow((prev) => !prev);
  };
  const handlePayment = () => {
    const ids = checkedCartData.map(({ id }) => id);
    executePay(ids);
    setCheckedCartData([]);
    alert("결제가 완료되었습니다.");
    navigator("/products", { replace: true });
  };
  return (
    <>
      <WillPay handlePayment={onToggleShow} buttonText={"결제하기"} />
      <PaymentModal
        show={show}
        onClose={onToggleShow}
        handlePayment={handlePayment}
      />
    </>
  );
};
export default Payment;
