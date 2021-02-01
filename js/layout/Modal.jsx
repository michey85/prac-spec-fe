import React, { useEffect } from "react";

export const Modal = ({ children, closeModal = Function.prototype }) => {
    useEffect(() => {
        function handleClose(e) {
            if (e.key === "Escape") {
                closeModal();
            }
        }

        document.addEventListener("keydown", handleClose);
        return () => {
            document.removeEventListener("keydown", handleClose);
        };
    }, []);

    return (
        <div className="modal" style={{ display: "block", top: "15%" }}>
            <div className="modal-content">{children}</div>
        </div>
    );
};
