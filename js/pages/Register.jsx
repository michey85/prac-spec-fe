import React, { useState } from "react";
import axios from "axios";

import { URL_NEW_USER, URL_LOGIN } from "../config";
import { useHistory, Link } from "react-router-dom";

export const Register = ({ logIn = Function.prototype }) => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [surname, setSurame] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const validate = () => {
        if (!name || !surname || !email || !password || !passwordConfirm) {
            return alert("Необходимо заполнить все поля");
        }

        if (password !== passwordConfirm) {
            return alert("Пароли не совпадают");
        }

        return true;
    };

    const handleSubmit = () => {
        const isValid = validate();

        if (!isValid) return;

        axios({
            url: URL_NEW_USER,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            data: {
                name,
                surname,
                email,
                password,
                password_confirmation: passwordConfirm
            }
        })
            .then(data => {
                if (data.statusText === "Created") {
                    alert("Пользователь успешно создан");
                    auth();
                    return history.push("/profile");
                }
            })
            .catch(err => {
                alert(
                    "Пароль должен содержать более 6 символов, большие и маленькие буквы, а также спецсимволы"
                );
            })
            .finally();
    };

    const auth = () => {
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
                localStorage.setItem("token", data.data.data.api_token);
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        email: data.data.data.email,
                        name: data.data.data.name,
                        surname: data.data.data.surname
                    })
                );
                logIn();
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div>
            <h1>Регистрация</h1>
            <div className="row">
                <div className="input-field col s6">
                    <input
                        placeholder="Имя"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="input-field col s6">
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={surname}
                        onChange={e => setSurame(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input
                        placeholder="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-field col s6">
                    <input
                        type="password"
                        placeholder="password"
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e.target.value)}
                    />
                </div>
            </div>
            <button className="btn" onClick={handleSubmit}>
                Зарегистрироваться
            </button>
        </div>
    );
};
