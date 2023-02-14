import NoResult from "../common/NoResult";
import CartItem from "./CartItem";

import {
  createRef,
  RefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import { CartsType, CartType } from "../../type";
import WillPay from "../willPay";
import { useNavigate } from "react-router-dom";

const CartList = ({ items }: { items: CartsType }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>();
  const [checkedState, setCheckedState] = useRecoilState(checkedCartState);
  const navigator = useNavigate();
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;
    //selected-all
    if (targetInput.classList.contains("selected_all")) {
      const allChecked = targetInput.checked;
      checkboxRefs.forEach((elem: RefObject<HTMLInputElement>) => {
        if (allChecked) elem.current!.checked = true;
        else elem.current!.checked = false;
      });
    } else {
      const allChecked = selectedCount === items.length;
      document.querySelector<HTMLInputElement>("#selected_all")!.checked =
        allChecked;
    }
    setFormData(data);
  };
  useEffect(() => {
    let isAllChecked = false;
    const allCheckedTarget =
      document.querySelector<HTMLInputElement>("#selected_all");
    checkedState.forEach((state) => {
      const itemRef = checkboxRefs.find(
        (ref) => ref.current!.value === state.id
      );
      if (itemRef) itemRef.current!.checked = true;
    });
    if (checkedState.length !== 0 && length === checkboxRefs.length) {
      isAllChecked = true;
    }
    if (allCheckedTarget) {
      allCheckedTarget!.checked = isAllChecked;
    }
  }, []);
  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
      if (ref.current!.checked) {
        res.push(items[i]);
      }
      return res;
    }, []);
    setCheckedState(checkedItems);
  }, [items, formData]);
  const handlePayment = () => {
    if (checkedState.length === 0) return;
    navigator("/payment");
  };
  return (
    <>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <div className={"container"}>
          {items.length === 0 ? (
            <NoResult message={"장바구니가 비었습니다."} />
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label
                  htmlFor=""
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  전체선택{" "}
                  <input
                    id={"selected_all"}
                    className={"selected_all"}
                    name={"selected_all"}
                    type="checkbox"
                  />
                </label>
              </div>
              <ul className={"grid"} style={{ marginTop: "16px" }}>
                {items.map((product: any, i) => (
                  <CartItem
                    {...product}
                    key={product.id}
                    ref={checkboxRefs[i]}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </form>
      {items.length !== 0 && (
        <WillPay handlePayment={handlePayment} buttonText={"결제창으로"} />
      )}
    </>
  );
};
export default CartList;
