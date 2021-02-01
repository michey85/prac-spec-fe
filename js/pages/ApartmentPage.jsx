import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import { getAppUrl } from "../config";
import { Preloader } from "../components/Preloader";

export const ApartmentPage = () => {
    const { id } = useParams();
    const history = useHistory();

    const [flat, setFlat] = useState([]);
    const [loading, setLoading] = useState(true);

    const goHome = () => {
        history.push("/");
    };

    useEffect(() => {
        setLoading(true);
        axios({
            url: getAppUrl(id),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(data => {
                setFlat(data.data.data);
                console.log(data.data.data);
            })
            .catch(err => {
                console.error(err);
                // history.push("/404");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Preloader />;

    return (
        <div style={{ paddingTop: "1.5rem" }}>
            {flat.id && (
                <>
                    <h2>
                        {flat.city}: {flat.metro || flat.address}
                    </h2>

                    {flat.images && flat.images.length && (
                        <div className="images">
                            {flat.images.map(image => (
                                <img
                                    className="flat-image"
                                    key={image.url}
                                    src={image.url}
                                    alt={flat.address}
                                />
                            ))}
                        </div>
                    )}

                    {flat.about && <p>{flat.about}</p>}

                    {flat.images.map((image, index) => (
                        <img src={image.src} alt="" key={index} />
                    ))}

                    <h3>
                        Цена: {Number(flat.price).toLocaleString("ru-Ru")} руб.
                    </h3>

                    <ul className="collection">
                        <li className="collection-item active">
                            <h6>Характеристики:</h6>
                        </li>
                        <li className="collection-item">
                            Количество комнат: {flat.rooms}
                        </li>
                        <li className="collection-item">
                            Метраж: {flat.meters} кв.м
                        </li>
                        <li className="collection-item">
                            Адрес: {flat.address}
                        </li>
                    </ul>
                </>
            )}

            <button
                className="btn"
                onClick={goHome}
                style={{ marginTop: "1.5rem" }}
            >
                На главную
            </button>
        </div>
    );
};
