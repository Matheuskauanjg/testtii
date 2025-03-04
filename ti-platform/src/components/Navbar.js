import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#282c34", color: "white" }}>
      <Link to="/" style={{ marginRight: "10px", color: "white" }}>Home</Link>
      <Link to="/login" style={{ marginRight: "10px", color: "white" }}>Login</Link>
      <Link to="/chamados" style={{ color: "white" }}>Chamados</Link> {/* Novo link */}
    </nav>
  );
};

export default Navbar;
