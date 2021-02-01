import React, { useState, useEffect } from "react";
import axios from "axios";

import { URL_ALL_APPS } from "../config";

import { Preloader } from "../components/Preloader";
import { ApartmentList } from "../components/ApartmentList";
import { Filter } from "../components/Filter";

export const Homepage = () => {
    const [loading, setLoading] = useState(true);
    const [flats, setFlats] = useState([]);

    const getFilteredFlats = (min, max) => {
        axios
            .get(URL_ALL_APPS + `?price\[from\]=${min}&price\[to\]=${max}`)
            .then(res => {
                setFlats(res.data.data);
            })
            .catch(console.error);
    };

    useEffect(() => {
        axios
            .get(URL_ALL_APPS)
            .then(res => {
                setFlats(res.data.data);
                console.log(res.data.data);
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Filter handleFilter={getFilteredFlats} />

            {loading ? (
                <Preloader />
            ) : !flats.length ? (
                <h2>Квартир не найдено.</h2>
            ) : (
                <ApartmentList items={flats} />
            )}
        </>
    );
};
