import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll"
import Poll from "./pages/Poll";
import SharePoll from "./pages/SharePoll";
// import Result from "./pages/Result";


function AppRoutes() {
    return  (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/polls/new" element={<CreatePoll />} />
            <Route path="/polls/:id" element={<Poll />} />
            <Route path="/polls/:id/share" element={<SharePoll />} />
            {/*  />
            <Route path="/polls/result" element={<Result />} /> */}
        </Routes>
        </>
    )
    
}

export default AppRoutes