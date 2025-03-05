import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import './Chamados.css'; // Importando o CSS

const Chamados = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Baixa");
  const [chamados, setChamados] = useState([]);
  const [editando, setEditando] = useState(null);
  const [filtroPrioridade, setFiltroPrioridade] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("Prioridade");
  const [nomeUsuario, setNomeUsuario] = useState(""); // Estado para armazenar o nome do usuário
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        toast.error("Você precisa estar logado!");
        navigate("/login");
      } else {
        setNomeUsuario(user.displayName || "Usuário Desconhecido"); // Define o nome do usuário
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchChamados = async () => {
      const querySnapshot = await getDocs(collection(db, "chamados"));
      const chamadosLista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChamados(chamadosLista);
    };
    fetchChamados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const novoChamado = { 
      titulo, 
      descricao, 
      prioridade,
      nomeUsuario, // Adiciona o nome do usuário ao chamado
      dataCriacao: new Date() // Adiciona a data de criação do chamado
    };

    const tituloExistente = chamados.some(chamado => chamado.titulo === titulo);
    if (tituloExistente) {
      toast.error("Chamado com esse título já existe!");
      return;
    }

    if (editando) {
      const chamadoRef = doc(db, "chamados", editando);
      await updateDoc(chamadoRef, novoChamado);
      setChamados(chamados.map(chamado => chamado.id === editando ? { ...chamado, ...novoChamado } : chamado));
      setEditando(null);
      toast.success("Chamado atualizado com sucesso!");
    } else {
      await addDoc(collection(db, "chamados"), novoChamado);
      setChamados([...chamados, { ...novoChamado, id: Math.random().toString() }]);
      toast.success("Chamado criado com sucesso!");
    }

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

  // Filtrando os chamados com base na prioridade selecionada
  const chamadosFiltrados = chamados.filter(chamado =>
    filtroPrioridade === "Todos" || chamado.prioridade === filtroPrioridade
  );

  // Função para calcular o tempo desde a criação
  const calcularTempo = (dataCriacao) => {
    const agora = new Date();
    const data = dataCriacao.toDate ? dataCriacao.toDate() : new Date(dataCriacao); // Verifica se é um Timestamp do Firestore
    const diferenca = agora - data;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    
    if (dias > 0) return `${dias} dias atrás`;
    if (horas > 0) return `${horas} horas atrás`;
    return `${minutos} minutos atrás`;
  };

  // Função para ordenar os chamados
  const ordenarChamados = (chamados) => {
    if (ordenacao === "Prioridade") {
      return chamados.sort((a, b) => {
        const prioridadeOrder = { Baixa: 1, Média: 2, Alta: 3 };
        return prioridadeOrder[a.prioridade] - prioridadeOrder[b.prioridade];
      });
    } else if (ordenacao === "Data") {
      return chamados.sort((a, b) => {
        const dataA = a.dataCriacao?.toDate ? a.dataCriacao.toDate() : new Date(a.dataCriacao);
        const dataB = b.dataCriacao?.toDate ? b.dataCriacao.toDate() : new Date(b.dataCriacao);
        return dataA - dataB; // Ordena pela data de criação
      });
    }
    return chamados;
  };

  const chamadosOrdenados = ordenarChamados(chamadosFiltrados);

  return (
    <div className="container">
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
          <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} required>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <button type="submit">{editando ? "Atualizar Chamado" : "Criar Chamado"}</button>
      </form>

      <div className="select-container">
        <select onChange={(e) => setFiltroPrioridade(e.target.value)} value={filtroPrioridade}>
          <option value="Todos">Todos</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
        <select onChange={(e) => setOrdenacao(e.target.value)} value={ordenacao}>
          <option value="Prioridade">Por Prioridade</option>
          <option value="Data">Por Data</option>
        </select>
      </div>

      <ul>
        {chamadosOrdenados.map(chamado => (
          <li key={chamado.id} className="chamado-item">
            <strong>{chamado.titulo}</strong>
            <p>{chamado.descricao}</p>
            <p><strong>Prioridade:</strong> {chamado.prioridade}</p>
            <p><strong>Criado por:</strong> {chamado.nomeUsuario}</p>
            <p><strong>Criado:</strong> {calcularTempo(chamado.dataCriacao)}</p>
            <button onClick={() => handleDelete(chamado.id)}>Excluir</button>
            <button onClick={() => handleEdit(chamado)}>Editar</button>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default Chamados;
