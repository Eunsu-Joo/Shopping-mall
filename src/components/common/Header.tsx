import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={"header"}>
      <p>
        <Link to={"/"}>홈</Link>
      </p>
      <p>
        <Link to={"/product"}>상품페이지</Link>
      </p>
      <p>
        <Link to={"/cart"}>장바구니</Link>
      </p>
    </div>
  );
};
export default Header;
