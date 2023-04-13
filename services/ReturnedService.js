// Função para buscar as devoluções
const getReturnedItems = async () => {
  return await fetch("/api/returned")
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error(error);
  });
};

// Função para criar uma nova devolução
const creteReturnedItem = async (devolucao) => {
  return await fetch("/api/returned", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(devolucao),
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error(error);
  });
};

// Função para atualizar uma devolução existente
const updateReturnedItem = async (devolucao) => {
  return await fetch(`/api/returned/${devolucao._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(devolucao),
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error(error);
  });
};

// Função para excluir uma devolução
const deleteReturnedItem = async (devolucaoId) => {
  return await fetch(`/api/returned/${devolucaoId}`, {
    method: "DELETE",
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error(error);
  });
};

module.exports = {
  updateReturnedItem,
  deleteReturnedItem,
  getReturnedItems,
  creteReturnedItem,
};
