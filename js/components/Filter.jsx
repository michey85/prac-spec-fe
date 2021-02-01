import { max } from "lodash";
import React, { useState } from "react";

import { Input } from "./Input";

export const Filter = ({ handleFilter = Function.prototype }) => {
    const [minPrice, setMinPrice] = useState("0");
    const [maxPrice, setMaxPrice] = useState("100000000");

    return (
        <div className="row filter">
            <Input
                type="number"
                value={minPrice}
                handleChange={setMinPrice}
                label="Цена от"
            />
            <Input
                type="number"
                value={maxPrice}
                handleChange={setMaxPrice}
                label="Цена до"
            />
            <button
                className="btn"
                onClick={() => handleFilter(minPrice, maxPrice)}
            >
                Поиск
            </button>
        </div>
    );
};
