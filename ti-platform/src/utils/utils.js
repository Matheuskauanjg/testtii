export const calcularTempo = (dataCriacao) => {
    const agora = new Date();
    const data = dataCriacao.toDate ? dataCriacao.toDate() : new Date(dataCriacao);
    const diferenca = agora - data;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  
    if (dias > 0) return `${dias} dias atrás`;
    if (horas > 0) return `${horas} horas atrás`;
    return `${minutos} minutos atrás`;
  };
  