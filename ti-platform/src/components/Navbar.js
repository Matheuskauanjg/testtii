// src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";  // Importando o CSS

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="menu">
        <li>
          <Link to="/">Página Inicial</Link>
        </li>
        <li>
          <Link to="/chamados">Chamados</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/cadastro">Cadastro</Link>
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>Sair</button>
    </nav>
  );
};

export default Navbar;
