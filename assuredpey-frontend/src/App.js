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
            <Route path="/Vendor" element={<Vendor />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
