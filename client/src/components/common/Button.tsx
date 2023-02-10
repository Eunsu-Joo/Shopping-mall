import React, { ReactNode } from "react";
type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};
const Button = (props: ButtonType) => {
  const { children, ...rest } = props;

  return (
    <button {...rest} className={"button"}>
      {children}
    </button>
  );
};
export default Button;
