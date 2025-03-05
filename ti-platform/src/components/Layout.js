// src/components/Layout.js
import React from "react";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = ({ children, onLogout }) => {
  return (
    <div className="layout">
      <Sidebar onLogout={onLogout} />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
