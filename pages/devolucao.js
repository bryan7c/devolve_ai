import { useState, useEffect } from "react";
import styles from '@/styles/Devolucao.module.css'
import { formatDate } from "@/utils/date";

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
      <div className="card-list">
        {devolucoes.map((devolucao) => (
          <div className = {styles.card} key={devolucao._id}>
            <h2 className = {styles.local}>{devolucao.localDevolucao}</h2>
            <div className = {styles.status}>{devolucao.status}</div>
            <p className = {styles.data}>{formatDate(devolucao.dataLimite)}</p>
            <p className = {styles.valor}>R$ {devolucao.valor}</p>
            <button className = {styles.editar}><i class="fas fa-pencil-alt"></i></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevolucoesPage;
