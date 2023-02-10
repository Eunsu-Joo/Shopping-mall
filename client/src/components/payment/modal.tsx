import { createPortal } from "react-dom";
import Button from "../common/Button";
import { SyntheticEvent } from "react";

const ModalPortal = ({ children }: { children: JSX.Element }) => {
  return createPortal(
    children,
    document.querySelector("#modal") as HTMLElement
  );
};
const PaymentModal = ({
  show,
  onClose,
  handlePayment,
}: {
  show: boolean;
  onClose: () => void;
  handlePayment: () => void;
}) => {
  return show ? (
    <ModalPortal>
      <div className={"modal"} onClick={onClose}>
        <div
          className={"modal__container"}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className={"modal__title"}>정말 결제를 진행할까요?</p>
          <div className={"modal__button"}>
            <Button onClick={handlePayment}>예</Button>
            <Button onClick={onClose}>아니요</Button>
          </div>
        </div>
      </div>
    </ModalPortal>
  ) : null;
};
export default PaymentModal;
