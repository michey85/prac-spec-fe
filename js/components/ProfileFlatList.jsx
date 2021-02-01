import React from "react";
import { Link } from "react-router-dom";

export const FlatList = ({
    items = [],
    handleDelete = Function.prototype,
    handleEdit = Function.prototype,
    handleUpload = Function.prototype
}) => {
    return (
        <div className="collection">
            {items.map(flat => (
                <Flat
                    key={flat.id}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleUpload={handleUpload}
                    {...flat}
                />
            ))}
        </div>
    );
};

const Flat = props => {
    const {
        id,
        city,
        price,
        address,
        metro,
        handleDelete,
        handleEdit,
        handleUpload
    } = props;

    return (
        <div className="collection-item">
            {city}
            {Boolean(metro) && <span>: {metro}</span>} {address},{" "}
            <strong>{Number(price).toLocaleString("ru-Ru")}</strong>
            <div className="right">
                <Link to={`/apartment/${id}`}>
                    <i
                        className="material-icons"
                        style={{ cursor: "pointer", color: "green" }}
                    >
                        remove_red_eye
                    </i>
                </Link>
                <i
                    className="material-icons"
                    onClick={() => handleUpload(id)}
                    style={{ cursor: "pointer", color: "green" }}
                >
                    attach_file
                </i>
                <i
                    className="material-icons"
                    onClick={() => handleEdit(id)}
                    style={{ cursor: "pointer", color: "green" }}
                >
                    border_color
                </i>
                <i
                    className="material-icons"
                    onClick={() => handleDelete(id)}
                    style={{ cursor: "pointer" }}
                >
                    close
                </i>
            </div>
        </div>
    );
};
