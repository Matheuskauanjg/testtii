// Cadastro.js
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(userCredential.user, {
        displayName: nome // Salva o nome do usuário no perfil
      });
      toast.success("Cadastro bem-sucedido!");
      navigate("/chamados"); // Redireciona para a página de chamados após o cadastro
    } catch (error) {
      toast.error("Erro ao cadastrar! Verifique os dados.");
    }
  };

  return (
    <div>
      <h2>Cadastrar</h2>
      <form onSubmit={handleCadastro}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Cadastro;
