// src/pages/Cadastro.js

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.error("Preencha todos os campos!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      toast.success("Conta criada com sucesso!");
      navigate("/login"); // Após o cadastro, redireciona para o login
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Cadastrar</h2>
      <form onSubmit={handleCadastro}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Conta</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Cadastro;
