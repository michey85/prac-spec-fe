import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_ALL_BY_USER, getAppUrl } from "../config";

import { Modal } from "../layout/Modal";

import { FlatList } from "../components/ProfileFlatList";
import { FlatEdit } from "../components/ProfileFlatEdit";
import { FlatUpload } from "../components/ProfileFlatUpload";
import { NewPassword } from "../components/ProfileNewPassword";
import { Preloader } from "../components/Preloader";
import { NewFlat } from "../components/NewFlat";

export const Profile = () => {
    const [flats, setFlats] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalCreate, setModalCreate] = useState(false);
    const [isModalEdit, setModalEdit] = useState(false);
    const [idModalEdit, setIdModalEdit] = useState(null);
    const [isModalUpload, setModalUpload] = useState(false);

    const addToFlats = flat => {
        setFlats([...flats, flat]);
    };

    const handleDelete = id => {
        axios({
            method: "DELETE",
            url: getAppUrl(id),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(() => {
                setFlats(flats.filter(flat => flat.id !== id));
            })
            .catch(console.error);
    };

    const handleEdit = id => {
        setModalEdit(true);
        setIdModalEdit(id);
    };

    const handleUpload = id => {
        setModalUpload(true);
        setIdModalEdit(id);
    };

    useEffect(() => {
        axios({
            url: URL_ALL_BY_USER,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(data => {
                console.log(data.data);
                setFlats(data.data.data);
            })
            .catch(() => {
                alert("Сессия истекла, необходимо авторизоваться заново");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Preloader />;

    return (
        <div>
            {Boolean(flats.length) && (
                <>
                    <h2>Ваши квартиры</h2>
                    <FlatList
                        items={flats}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleUpload={handleUpload}
                    />
                </>
            )}

            <button className="btn" onClick={() => setModalCreate(true)}>
                Добавить квартиру
            </button>

            {isModalCreate && (
                <Modal closeModal={() => setModalCreate(false)}>
                    <NewFlat
                        addToFlats={addToFlats}
                        closeModal={() => setModalCreate(false)}
                    />
                </Modal>
            )}
            {isModalEdit && (
                <Modal closeModal={() => setModalEdit(false)}>
                    <FlatEdit
                        id={idModalEdit}
                        closeModal={() => setModalEdit(false)}
                    />
                </Modal>
            )}
            {isModalUpload && (
                <Modal closeModal={() => setModalUpload(false)}>
                    <FlatUpload
                        id={idModalEdit}
                        closeModal={() => setModalUpload(false)}
                    />
                </Modal>
            )}
            <hr style={{ margin: "3rem 0" }} />
            <NewPassword />
        </div>
    );
};
