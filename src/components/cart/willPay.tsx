import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Button from "../common/Button";

const WillPay = () => {
  const checkedItems = useRecoilValue(checkedCartState);
  const totalPrice = checkedItems.reduce<number>((res, { price, amount }) => {
    res += price * amount;
    return res;
  }, 0);
  const navigator = useNavigate();
  const handlePayment = () => {
    if (checkedItems.length === 0) return;
    navigator("/payment");
  };
  return (
    <div className={"container"}>
      <div className={" grid"} style={{ marginTop: "24px" }}>
        {checkedItems.map(({ id, amount, url, title, price }) => (
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
              src={url}
              alt={title}
              style={{ objectFit: "cover", marginBottom: "8px" }}
            />

            <h2>{title}</h2>
            <p>수량 {amount}</p>
            <p>
              <strong>금액 : ${price * amount}</strong>
            </p>
          </div>
        ))}
      </div>
      <div className={"willPay"}>
        <p>총액 : {totalPrice}</p>
        <Button onClick={handlePayment}>결제하기</Button>
      </div>
    </div>
  );
};
export default WillPay;
