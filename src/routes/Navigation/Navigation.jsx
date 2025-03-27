import { useContext } from "react";

import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../contexts/User";

import { signOutUser } from "../../utils/firebase.utils";

import Logo from "../../assets/crown.svg";

import "./Navigation.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

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
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      {/* Navigation bar should exist above the other children components */}
      <Outlet />
    </>
  );
};

export default Navigation;
