import React, { useState } from "react";

const Chamados = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Baixa");
  const [chamados, setChamados] = useState([]); // Lista de chamados abertos

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoChamado = { titulo, descricao, prioridade, id: Date.now() };
    setChamados([...chamados, novoChamado]); // Adiciona o novo chamado na lista
    setTitulo("");
    setDescricao("");
    setPrioridade("Baixa");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Abrir Chamado</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prioridade:</label>
          <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <button type="submit">Abrir Chamado</button>
      </form>

      <h3>Chamados Abertos</h3>
      <ul>
        {chamados.map((chamado) => (
          <li key={chamado.id}>
            <strong>{chamado.titulo}</strong> - {chamado.prioridade}
            <p>{chamado.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chamados;
