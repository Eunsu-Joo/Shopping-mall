import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Button from "../common/Button";
type WillPayProps = {
  handlePayment: () => void;
  buttonText: string;
};
const WillPay = ({ handlePayment, buttonText }: WillPayProps) => {
  const checkedItems = useRecoilValue(checkedCartState);
  const totalPrice = checkedItems.reduce<number>(
    (res, { product: { price }, amount }) => {
      res += price * amount;
      return res;
    },
    0
  );

  return (
    <div className={"container"}>
      <div className={" grid"} style={{ marginTop: "24px" }}>
        {checkedItems.map(
          ({ amount, product: { id, imageUrl, title, price } }) => (
            <div
              key={id}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                width={300}
                height={150}
                src={imageUrl}
                alt={title}
                style={{ objectFit: "cover", marginBottom: "8px" }}
              />

              <h2>{title}</h2>
              <p>수량 {amount}</p>
              <p>
                <strong>금액 : ${price * amount}</strong>
              </p>
            </div>
          )
        )}
      </div>
      <div className={"willPay"}>
        <p>총액 : {totalPrice}</p>
        <Button onClick={handlePayment}>{buttonText}</Button>
      </div>
    </div>
  );
};
export default WillPay;
