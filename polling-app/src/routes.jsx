import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll"
import Poll from "./pages/Poll";
import Result from "./pages/Result";


function AppRoutes() {
    return  (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/polls/:id" element={<Poll />} />
            <Route path="/polls/new" element={<CreatePoll />} />
            <Route path="/polls/result" element={<Result />} />
        </Routes>
        </>
    )
    
}

export default AppRoutes