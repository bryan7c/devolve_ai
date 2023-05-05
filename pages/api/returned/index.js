import {
  getDevolucao,
  createDevolucao,
} from "@/pages/api/controllers/devolucaoController";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      getDevolucao(req, res);
      break;
    case "POST":
      createDevolucao(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({ message: `Método ${method} não é suportado` });
      break;
  }
}
