import { useState, useEffect } from "react";

const DevolucoesPage = () => {
  const [devolucoes, setDevolucoes] = useState([]);

  useEffect(() => {
    const fetchDevolucoes = async () => {
      const res = await fetch("/api/devolucao");
      const data = await res.json();
      setDevolucoes(data);
    };

    fetchDevolucoes();
  }, []);

  return (
    <div>
      <h1>Devoluções</h1>
      <ul>
        {devolucoes.map((devolucao) => (
          <li key={devolucao._id}>
            <p>Nome do devolvedor: {devolucao.devolvedor.nome}</p>
            <p>Status: {devolucao.status}</p>
            <p>Data limite: {devolucao.dataLimite}</p>
            <p>Valor: {devolucao.valor}</p>
            <p>Local de devolução: {devolucao.localDevolucao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevolucoesPage;
