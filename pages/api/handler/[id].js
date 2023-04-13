import { atualizarDevolvedor, excluirDevolvedor } from '@/pages/api/controllers/devolvedorController';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'PUT':
      atualizarDevolvedor(req, res);
      break;
    case 'DELETE':
      excluirDevolvedor(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Método ${method} não é suportado` });
      break;
  }
}
