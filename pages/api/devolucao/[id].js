import { getDevolucoesById, atualizarDevolucao, excluirDevolucao } from '@/pages/api/controllers/devolucaoController';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      getDevolucoesById(req, res);
      break;
    case 'PUT':
      atualizarDevolucao(req, res);
      break;
    case 'DELETE':
      excluirDevolucao(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Método ${method} não é suportado` });
      break;
  }
}
