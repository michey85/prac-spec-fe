import React from "react";

import { Apartment } from "./Apartment";

export const ApartmentList = props => {
    const { items = [] } = props;

    return (
        <div className="flats">
            {items.map(item => (
                <Apartment key={item.id} {...item} />
            ))}
        </div>
    );
};
