import React from "react";
import { Link } from "react-router-dom";

export const Apartment = props => {
    const {
        id,
        meters,
        city,
        address,
        images,
        rooms,
        price,
        metro,
        about
    } = props;

    return (
        <div className="card">
            <div className="card-image">
                <img
                    src={
                        images && images.length
                            ? images[0].url
                            : `https://via.placeholder.com/350?text=${city}`
                    }
                />
                <div className="badges">
                    <span className="new badge red" data-badge-caption="кв.м">
                        метраж: {meters}
                    </span>
                    <span className="new badge" data-badge-caption="">
                        комнат: {rooms}
                    </span>
                </div>
            </div>
            <div className="card-content">
                <h3 className="card-title">
                    {city}
                    {Boolean(metro) && <span>: {metro}</span>}
                </h3>
                <p className="about">{about}</p>
            </div>
            <div className="card-action">
                <Link to={`/apartment/${id}`}>Подробнее</Link>
                <span className="right price">
                    {Number(price).toLocaleString("ru-RU")} руб.
                </span>
            </div>
        </div>
    );
};
