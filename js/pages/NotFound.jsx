import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div>
            <h2>Страница не найдена</h2>
            <Link className="btn" to="/">
                На главную
            </Link>
        </div>
    );
};
