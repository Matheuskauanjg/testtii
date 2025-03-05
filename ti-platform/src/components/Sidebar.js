// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Página Inicial</Link></li>
        <li><Link to="/chamados">Chamados</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/cadastro">Cadastro</Link></li>
      </ul>
      <button className="logout-button" onClick={onLogout}>Sair</button>
    </div>
  );
};

export default Sidebar;