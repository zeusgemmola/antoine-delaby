import React from "react";
import "./AppBar.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Error404 from "./components/404/Error404";
import { Header, HomeConvertisseur } from "./components/Home";

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<HomeConvertisseur />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </div>
);

export default App;
