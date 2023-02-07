import React, { ReactNode } from "react";
type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};
const Button = (props: ButtonType) => {
  const { children, ...rest } = props;
  const attributes = {
    ...rest,
    style: {
      backgroundColor: "#000",
      color: "#fff",
      padding: "8px 12px",
      marginTop: "8px",
      borderRadius: "4px",
      cursor: "pointer",
      marginLeft: "8px",
    },
  };
  return <button {...attributes}>{children}</button>;
};
export default Button;
