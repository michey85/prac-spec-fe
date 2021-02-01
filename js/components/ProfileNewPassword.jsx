import React, { useState } from "react";
import axios from "axios";

import { URL_UPDATE_USER } from "../config";

import { Input } from "./Input";

export const NewPassword = () => {
    const [pass, setPass] = useState("");
    const [passConf, setPassConf] = useState("");

    const validate = () => {
        if (!pass || !passConf) {
            return alert("Необходимо заполнить все поля");
        }

        if (pass !== passConf) {
            return alert("Введенные пароли должны совпадать");
        }

        return true;
    };

    const handleSubmit = () => {
        const isValid = validate();

        if (!isValid) return;

        const user = JSON.parse(localStorage.getItem("user"));

        axios({
            url: URL_UPDATE_USER,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: {
                name: user.name,
                surname: user.surname,
                password: pass,
                password_confirmation: passConf
            }
        })
            .then(data => {
                localStorage.setItem("token", data.data.data.api_token);
                alert("Пароль успешно изменен");
                setPass("");
                setPassConf("");
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
            <h4>Сменить пароль</h4>
            <div className="row">
                <Input
                    type="password"
                    value={pass}
                    handleChange={setPass}
                    label="Новый пароль"
                />
                <Input
                    type="password"
                    value={passConf}
                    handleChange={setPassConf}
                    label="Подтвердите новый пароль"
                    handleKey={handleKey}
                />

                <button className="btn" onClick={handleSubmit}>
                    Сохранить изменения
                </button>
            </div>
        </div>
    );
};
