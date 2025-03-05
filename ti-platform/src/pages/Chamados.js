import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import ChamadoForm from "../components/ChamadoForm";
import ChamadoList from "../components/ChamadoList";

const Chamados = () => {
  const [chamados, setChamados] = useState([]);
  const [editando, setEditando] = useState(null);
  const [filtroPrioridade, setFiltroPrioridade] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("Prioridade");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        toast.error("Você precisa estar logado!");
        navigate("/login");
      } else {
        setNomeUsuario(user.displayName || "Usuário Desconhecido");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchChamados = async () => {
      const querySnapshot = await getDocs(collection(db, "chamados"));
      const chamadosLista = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChamados(chamadosLista);
    };
    fetchChamados();
  }, []);

  const handleSubmit = async (chamado) => {
    const novoChamado = { ...chamado, nomeUsuario, dataCriacao: new Date() };

    if (editando) {
      const chamadoRef = doc(db, "chamados", editando);
      await updateDoc(chamadoRef, novoChamado);
      setChamados(chamados.map((c) => (c.id === editando ? { ...c, ...novoChamado } : c)));
      setEditando(null);
      toast.success("Chamado atualizado com sucesso!");
    } else {
      const docRef = await addDoc(collection(db, "chamados"), novoChamado);
      setChamados([...chamados, { ...novoChamado, id: docRef.id }]);
      toast.success("Chamado criado com sucesso!");
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "chamados", id));
    setChamados(chamados.filter((c) => c.id !== id));
    toast.error("Chamado excluído!");
  };

  const chamadosFiltrados = chamados
    .filter((c) => filtroPrioridade === "Todos" || c.prioridade === filtroPrioridade)
    .sort((a, b) => {
      if (ordenacao === "Prioridade") {
        const prioridadeOrdem = { Alta: 3, Média: 2, Baixa: 1 };
        return prioridadeOrdem[b.prioridade] - prioridadeOrdem[a.prioridade];
      }
      return new Date(b.dataCriacao) - new Date(a.dataCriacao);
    });

  return (
    <div className="container">
      <h2>{editando ? "Editar Chamado" : "Abrir Chamado"}</h2>
      <ChamadoForm onSubmit={handleSubmit} editando={editando} chamadoAtual={chamados.find(c => c.id === editando)} />
      
      <label>Filtrar por Prioridade:</label>
      <select onChange={(e) => setFiltroPrioridade(e.target.value)} value={filtroPrioridade}>
        <option value="Todos">Todos</option>
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select>

      <label>Ordenar por:</label>
      <select onChange={(e) => setOrdenacao(e.target.value)} value={ordenacao}>
        <option value="Prioridade">Prioridade</option>
        <option value="Data">Data de Criação</option>
      </select>

      <ChamadoList chamados={chamadosFiltrados} onDelete={handleDelete} onEdit={setEditando} />
      <ToastContainer />
    </div>
  );
};

export default Chamados;