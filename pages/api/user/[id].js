import { atualizarUsuario, excluirUsuario } from '@/pages/api/controllers/usuarioController';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'PUT':
      atualizarUsuario(req, res);
      break;
    case 'DELETE':
      excluirUsuario(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Método ${method} não é suportado` });
      break;
  }
}
