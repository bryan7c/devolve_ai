import Devolucao from "@/pages/api/model/devolucao";

module.exports = {
  async criarDevolucao(req, res) {
    const { localDevolucao, valor, dataLimite, status } = req.body;

    // Converter a data de string para objeto Date
    const dataObjeto = new Date(dataLimite);

    // Converter o objeto Date para o formato ISODate do MongoDB
    const dataISO = dataObjeto.toISOString();

    try {
      const devolucao = new Devolucao({
        localDevolucao,
        valor: parseInt(valor),
        dataLimite: new Date(dataISO),
        status
      })
      const response = Devolucao.create(devolucao);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getDevolucoes(req, res) {
    try {
      const devolucoes = await Devolucao.find().populate("devolvedor");;

      return res.status(200).json(devolucoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getDevolucoesById(req, res) {
    const { id } = req.query;
    try {
      const devolucoes = await Devolucao.findById(id).populate("devolvedor");;

      return res.status(200).json(devolucoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async atualizarDevolucao(req, res) {
    const { id } = req.query;
    const { localDevolucao, valor, dataLimite, status } = req.body;

    try {
      const devolucao = await Devolucao.findByIdAndUpdate(
        id,
        {
          localDevolucao,
          valor,
          dataLimite,
          status,
        },
        { new: true }
      ).populate("devolvedor");

      return res.status(200).json(devolucao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async excluirDevolucao(req, res) {
    const { id } = req.query;
    try {
      await Devolucao.findByIdAndDelete(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
