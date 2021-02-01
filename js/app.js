import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Modal } from "./layout/Modal";
import { Auth } from "./components/Auth";

import { Homepage } from "./pages/Homepage";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { ApartmentPage } from "./pages/ApartmentPage";
import { NotFound } from "./pages/NotFound";

const App = () => {
    const [isAuth, setAuth] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const checkout = () => setAuth(false);
    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);

    useEffect(function checkAuth() {
        const token = localStorage.getItem("token");

        if (!token) return;

        setAuth(true);
    }, []);

    return (
        <Router>
            <Header isAuth={isAuth} checkout={checkout} openModal={openModal} />
            <main className="container">
                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route exact path="/reg">
                        <Register logIn={() => setAuth(true)} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/apartment/:id">
                        <ApartmentPage />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </main>
            <Footer isAuth={isAuth} checkout={checkout} openModal={openModal} />
            {isModalOpen && (
                <Modal closeModal={closeModal}>
                    <Auth closeModal={closeModal} logIn={() => setAuth(true)} />
                </Modal>
            )}
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
