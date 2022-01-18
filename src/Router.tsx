import React from "react";
import { Routes, Route } from "react-router-dom";
import Coins from "./components/Coins";
import Coin from "./components/Coin";

const Router = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Coins />} />
                <Route path="/:coinId/*" element={<Coin />} />
            </Routes>
        </>
    )
}

export default Router;