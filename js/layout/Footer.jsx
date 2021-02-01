import React from "react";
import { Link, useHistory } from "react-router-dom";

export const Footer = ({
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
        <footer className="page-footer">
            <div className="footer-copyright">
                <div className="container">
                    © 2021 Copyright Apartment
                    {isAuth ? (
                        <>
                            <a
                                className="grey-text text-lighten-4 right"
                                onClick={logout}
                            >
                                Выйти
                            </a>
                            <Link
                                className="grey-text text-lighten-4 right"
                                to="/profile"
                                style={{ marginRight: "1rem" }}
                            >
                                Профиль
                            </Link>
                        </>
                    ) : (
                        <>
                            <a
                                className="grey-text text-lighten-4 right"
                                onClick={openModal}
                            >
                                Вход
                            </a>
                            <Link
                                className="grey-text text-lighten-4 right"
                                to="/reg"
                                style={{ marginRight: "1rem" }}
                            >
                                Регистрация
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </footer>
    );
};
