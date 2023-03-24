import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUserAction } from "../actions/userActions";

function Navbar() {
  const cartState = useSelector((state) => state.addToCartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { cartItems } = cartState;
  const { currentUser } = userState;

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await dispatch(logoutUserAction());
  };
  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container">
          <Link className="navbar-brand text-danger" to="/">
            FOOD-ORDER
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            {currentUser ? (
              <ul className="navbar-nav ms-auto">
                <div className="dropdown ">
                  <button
                    className="btn btn-danger dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hoşgeldiniz {currentUser.name}
                  </button>
                  <ul className="dropdown-menu bg-warning">
                    <li>
                      <Link className="dropdown-item" to="/myorders">
                        Siparişlerim
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={logoutHandler}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
                <li className="nav-item">
                  <Link className="nav-link" to="/sepet">
                    Sepet
                    <i className="fa-solid fa-bag-shopping mx-2"></i>
                    <span className="position-absolute top-10 start-80 translate-middle badge rounded-pill bg-danger">
                      {cartState.cartItems.length}
                    </span>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Giriş Yap <i class="fa-solid fa-right-to-bracket"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Kayıt Ol <i class="fa-solid fa-registered"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sepet">
                    Sepet
                    <i className="fa-sharp fa-solid fa-bag-shopping mx-2"></i>
                    <span className="position-absolute top-10 start-80 translate-middle badge rounded-pill bg-danger">
                      {cartItems.length}
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
