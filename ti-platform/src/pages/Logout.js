// src/pages/Logout.js
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout bem-sucedido!");
      navigate('/login');
    } catch (error) {
      toast.error("Erro ao sair!");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Sair</button>
      <ToastContainer />
    </div>
  );
};

export default Logout;
