import React, { useState } from "react";
import axios from "axios";

import { URL_ADD_AP } from "../config";
import { Input } from "./Input";

export const NewFlat = ({
    addToFlats = Function.prototype,
    closeModal = Function.prototype
}) => {
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [metro, setMetro] = useState("");
    const [rooms, setRooms] = useState("");
    const [meters, setMeters] = useState("");
    const [price, setPrice] = useState("");

    const resetForm = () => {
        setCity("");
        setAddress("");
        setMetro("");
        setRooms("");
        setMeters("");
        setPrice("");
    };

    const addFlat = () => {
        axios({
            method: "POST",
            url: URL_ADD_AP,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: {
                city,
                address,
                metro,
                rooms,
                meters,
                price
            }
        })
            .then(data => {
                console.log(data);
                addToFlats(data.data.data);
                resetForm();
                closeModal();
            })
            .catch(err => {
                console.error(err.message);
            });
    };

    return (
        <div>
            <div className="row">
                <Input value={city} handleChange={setCity} label="Город" />
                <Input
                    value={address}
                    handleChange={setAddress}
                    label="Адрес"
                />
            </div>
            <div className="row">
                <Input value={metro} handleChange={setMetro} label="Метро" />
                <Input value={rooms} handleChange={setRooms} label="Комнат" />
            </div>
            <div className="row">
                <Input value={meters} handleChange={setMeters} label="Метраж" />
                <Input
                    type="number"
                    value={price}
                    handleChange={setPrice}
                    label="Цена"
                />
            </div>
            <button className="btn" onClick={addFlat}>
                Добавить
            </button>
            <button
                className="btn"
                onClick={closeModal}
                style={{ marginLeft: "1rem" }}
            >
                Закрыть
            </button>
        </div>
    );
};
