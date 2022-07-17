import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Dashboard from "./components/Dashboard";
import Vendor from "./components/Vendor";
import Login from "./components/Login";
import Tracking from "./components/Tracking";

function App() {
  return (
    <div className="flex flex-col relative h-full bg-[#EEEEEE]">
        <Routes>
          <Route
            element={
              <div className="container">
                <Navbar />
                <Outlet />
              </div>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Admin" element={<Vendor />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Tracking/:address" element={<Tracking />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
