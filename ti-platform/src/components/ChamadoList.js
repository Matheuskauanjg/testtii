import React from "react";
import ChamadoItem from "./ChamadoItem";

const ChamadoList = ({ chamados, onDelete, onEdit }) => {
  return (
    <ul>
      {chamados.map((chamado) => (
        <ChamadoItem key={chamado.id} chamado={chamado} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default ChamadoList;
