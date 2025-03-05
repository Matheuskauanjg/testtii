import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";  // Importando o Toastify
import "react-toastify/dist/ReactToastify.css";  // Importando o CSS do Toastify

const Chamados = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Baixa");
  const [chamados, setChamados] = useState([]);
  const [editando, setEditando] = useState(null);
  const [filtroPrioridade, setFiltroPrioridade] = useState("Todos");

  useEffect(() => {
    const fetchChamados = async () => {
      const querySnapshot = await getDocs(collection(db, "chamados"));
      const chamadosLista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChamados(chamadosLista);
    };
    fetchChamados();
  }, []);

  // AQUI É ONDE VOCÊ COLOCA A FUNÇÃO handleSubmit ALTERADA
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const novoChamado = { titulo, descricao, prioridade };

    // Verifica se o título já existe
    const tituloExistente = chamados.some(chamado => chamado.titulo === titulo);
    if (tituloExistente) {
      toast.error("Chamado com esse título já existe!");
      return;
    }

    if (editando) {
      const chamadoRef = doc(db, "chamados", editando);
      await deleteDoc(chamadoRef);
      await addDoc(collection(db, "chamados"), novoChamado);
      setEditando(null);
      toast.success("Chamado atualizado com sucesso!");
    } else {
      await addDoc(collection(db, "chamados"), novoChamado);
      toast.success("Chamado criado com sucesso!");
    }

    setChamados([...chamados, novoChamado]);
    setTitulo("");
    setDescricao("");
    setPrioridade("Baixa");
  };

  const handleDelete = async (id) => {
    const chamadoRef = doc(db, "chamados", id);
    await deleteDoc(chamadoRef);
    setChamados(chamados.filter(chamado => chamado.id !== id));
    toast.error("Chamado excluído!");
  };

  const handleEdit = (chamado) => {
    setTitulo(chamado.titulo);
    setDescricao(chamado.descricao);
    setPrioridade(chamado.prioridade);
    setEditando(chamado.id);
  };

  const chamadosFiltrados = chamados.filter(chamado => 
    filtroPrioridade === "Todos" || chamado.prioridade === filtroPrioridade
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editando ? "Editar Chamado" : "Abrir Chamado"}</h2>
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
        <button type="submit">
          {editando ? "Salvar Alterações" : "Abrir Chamado"}
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <label>Filtrar por Prioridade:</label>
        <select value={filtroPrioridade} onChange={(e) => setFiltroPrioridade(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <h3>Chamados Abertos</h3>
      <ul>
        {chamadosFiltrados.map((chamado) => (
          <li key={chamado.id}>
            <strong>{chamado.titulo}</strong> - {chamado.prioridade}
            <p>{chamado.descricao}</p>
            <button onClick={() => handleEdit(chamado)}>Editar</button>
            <button onClick={() => handleDelete(chamado.id)}>Deletar</button>
          </li>
        ))}
      </ul>

      {/* Contêiner de notificações */}
      <ToastContainer />
    </div>
  );
};

export default Chamados;
