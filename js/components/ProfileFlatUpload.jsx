import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { getAppUrl, getImgUploadUrl } from "../config";

export const FlatUpload = ({ id, closeModal }) => {
    const [images, setImages] = useState([]);
    const fileEl = useRef(null);

    const uploadImage = () => {
        console.log(fileEl.current);
        const formData = new FormData();
        formData.append("image", fileEl.current.files[0]);

        axios({
            method: "POST",
            url: getImgUploadUrl(id),
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: formData
        })
            .then(({ data }) => {
                setImages([...images, data.data]);
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
                setImages(data.data.images);
            })
            .catch(console.error);
    }, [id]);

    return (
        <div>
            <h4>Изображения квартиры:</h4>
            <div className="images">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            objectPosition: "center",
                            overflow: "hidden"
                        }}
                    />
                ))}
            </div>
            <label style={{ marginTop: "1rem", display: "inline-block" }}>
                <span className="btn">Добавить изображение</span>
                <input
                    type="file"
                    ref={fileEl}
                    onChange={uploadImage}
                    style={{
                        visibility: "hidden"
                    }}
                />
            </label>
            <button className="btn right" onClick={closeModal}>
                Закрыть
            </button>
        </div>
    );
};
