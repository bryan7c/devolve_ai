// Função para buscar as devoluções
const getReturnedItems = async (returnedItem = {}) => {
  const params = new URLSearchParams(returnedItem);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/returned?${params.toString()}`;
  return await fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

// Função para criar uma nova devolução
const createReturnedItem = async (devolucao) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/returned`, {
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
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/returned/${devolucao._id}`, {
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
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/returned/${devolucaoId}`, {
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
  createReturnedItem,
};
