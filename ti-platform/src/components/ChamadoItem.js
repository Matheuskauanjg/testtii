import React from "react";
import { calcularTempo } from "../utils/utils";

const ChamadoItem = ({ chamado, onDelete, onEdit }) => {
  return (
    <li className="chamado-item">
      <strong>{chamado.titulo}</strong>
      <p>{chamado.descricao}</p>
      <p><strong>Prioridade:</strong> {chamado.prioridade}</p>
      <p><strong>Criado por:</strong> {chamado.nomeUsuario}</p>
      <p><strong>Criado:</strong> {calcularTempo(chamado.dataCriacao)}</p>
      <button onClick={() => onDelete(chamado.id)}>Excluir</button>
      <button onClick={() => onEdit(chamado)}>Editar</button>
    </li>
  );
};

export default ChamadoItem;
