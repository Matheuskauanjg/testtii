// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Importando a Navbar
import Chamados from "./pages/Chamados";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <Router>
      <Navbar /> {/* A Navbar será renderizada em todas as páginas */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/" element={<Chamados />} />
      </Routes>
    </Router>
  );
}

export default App;
