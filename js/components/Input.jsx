import React from "react";

export const Input = props => {
    const {
        type = "text",
        value = "",
        handleChange = Function.prototype,
        handleKey = Function.prototype,
        label = "text",
        size = 6
    } = props;

    return (
        <div className={`input-field col s${size}`}>
            <input
                type={type}
                value={value}
                onChange={e => handleChange(e.target.value)}
                onKeyDown={handleKey}
            />
            <label className="active">{label}</label>
        </div>
    );
};
