import React, { useState } from "react";
import { toast } from "react-toastify";

const ChamadoForm = ({ onSubmit, editando, chamadoAtual }) => {
  const [titulo, setTitulo] = useState(chamadoAtual?.titulo || "");
  const [descricao, setDescricao] = useState(chamadoAtual?.descricao || "");
  const [prioridade, setPrioridade] = useState(chamadoAtual?.prioridade || "Baixa");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descricao) {
      toast.error("Preencha todos os campos!");
      return;
    }
    onSubmit({ titulo, descricao, prioridade });
    setTitulo("");
    setDescricao("");
    setPrioridade("Baixa");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      </div>
      <div>
        <label>Prioridade:</label>
        <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} required>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      <button type="submit">{editando ? "Atualizar Chamado" : "Criar Chamado"}</button>
    </form>
  );
};

export default ChamadoForm;
