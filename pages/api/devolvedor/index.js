import {
  getDevolvedor,
  criarDevolvedor
} from "@/pages/api/controllers/devolvedorController";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      getDevolvedor(req, res);
      break;
    case "POST":
      criarDevolvedor(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({ message: `Método ${method} não é suportado` });
      break;
  }
}
