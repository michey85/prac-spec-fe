import React, { useState, useEffect } from "react";
import axios from "axios";

import { getAppUrl } from "../config";
import { Input } from "./Input";

export const FlatEdit = props => {
    const { id, closeModal = Function.prototype } = props;

    const [city, setCity] = useState("");
    const [about, setAbout] = useState("");
    const [address, setAddress] = useState("");
    const [metro, setMetro] = useState("");
    const [rooms, setRooms] = useState("");
    const [meters, setMeters] = useState("");
    const [price, setPrice] = useState("");

    const editFlat = () => {
        axios({
            method: "PATCH",
            url: getAppUrl(id),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: {
                city,
                about,
                address,
                metro,
                rooms,
                meters,
                price
            }
        })
            .then(() => {
                closeModal();
            })
            .catch(console.error);
    };

    useEffect(() => {
        axios({
            url: getAppUrl(id),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(({ data }) => {
                console.log(data);
                setCity(data.data.city);
                data.data.about && setAbout(data.data.about);
                setAddress(data.data.address);
                data.data.metro && setMetro(data.data.metro);
                setRooms(data.data.rooms);
                setMeters(data.data.meters);
                setPrice(data.data.price);
            })
            .catch(console.error);
    }, [id]);

    return (
        <div>
            <h4>Редактирование квартиры</h4>
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
            <div className="row">
                <div className="input-field col s12">
                    <textarea
                        className="materialize-textarea"
                        value={about}
                        onChange={e => setAbout(e.target.value)}
                    ></textarea>
                    <label className="active">Описание</label>
                </div>
            </div>
            <button className="btn" onClick={editFlat}>
                Сохранить изменения
            </button>
        </div>
    );
};
