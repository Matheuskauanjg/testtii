// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Importe o Navbar
import Chamados from './pages/Chamados';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

const App = () => {
  return (
    <Router>
      <Navbar />  {/* Adicione a Navbar aqui */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/chamados" element={<Chamados />} />
      </Routes>
    </Router>
  );
};

export default App;
