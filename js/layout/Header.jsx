import React from "react";
import { Link, useHistory } from "react-router-dom";

const Header = ({
    isAuth,
    checkout = Function.prototype,
    openModal = Function.prototype
}) => {
    const { push } = useHistory();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        checkout();
        push("/");
    };

    return (
        <nav>
            <div className="nav-wrapper">
                <Link
                    to="/"
                    className="brand-logo"
                    style={{ marginLeft: "1rem" }}
                >
                    Aparments
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {isAuth ? (
                        <>
                            <li>
                                <Link to="/profile">Профиль</Link>
                            </li>
                            <li>
                                <a onClick={logout}>Выйти</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/reg">Регистрация</Link>
                            </li>
                            <li>
                                <a onClick={openModal}>Вход</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export { Header };
