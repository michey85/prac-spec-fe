import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { URL_LOGIN } from "../config";
import { Input } from "./Input";

const Auth = ({
    closeModal = Function.prototype,
    logIn = Function.prototype
}) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validate = () => {
        if (!email || !password) {
            return alert("Необходимо заполнить все поля");
        }

        return true;
    };

    const handleSubmit = () => {
        const isValid = validate();

        if (!isValid) return;

        axios({
            url: URL_LOGIN,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            data: {
                email,
                password
            }
        })
            .then(data => {
                console.log(data);
                localStorage.setItem("token", data.data.data.api_token);
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        email: data.data.data.email,
                        name: data.data.data.name,
                        surname: data.data.data.surname
                    })
                );
                closeModal();
                console.log("auth success");
                logIn();
                history.push("/profile");
            })
            .catch(err => {
                console.error(err);
                alert("Некорректные данные");
            });
    };

    const handleKey = e => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div>
            <h3>Авторизация</h3>
            <div className="row">
                <Input
                    label="email"
                    type="email"
                    value={email}
                    handleChange={setEmail}
                />
                <Input
                    label="password"
                    type="password"
                    value={password}
                    handleChange={setPassword}
                    handleKey={handleKey}
                />
            </div>
            <button className="btn" onClick={handleSubmit}>
                Войти
            </button>
        </div>
    );
};

export { Auth };
