import { Outlet, Link } from "react-router-dom";

import Logo from "../../assets/crown.svg";

import "./Navigation.scss";

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={Logo} alt="Crown Logo" className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      {/* Navigation bar should exist above the other children components */}
      <Outlet />
    </>
  );
};

export default Navigation;
