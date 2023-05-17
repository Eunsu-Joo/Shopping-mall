import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={"header"}>
      <p>
        <Link to={"/products"}>상품페이지</Link>
      </p>
      <p>
        <Link to={"/cart"}>장바구니</Link>
      </p>
      <p>
        <Link to={"/admin"}>어드민</Link>
      </p>
    </div>
  );
};
export default Header;
