import Devolvedor from "@/pages/api/model/devolvedor";

module.exports = {
  async criarDevolvedor(req, res) {
    const { nome, nota, email, telefone } = req.body;

    try {
      const devolvedor = new Devolvedor({
        nome,
        nota,
        email,
        telefone
      });
      const response = await devolvedor.save();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getDevolvedores(req, res) {
    try {
      const devolvedores = await Devolvedor.find();

      return res.status(200).json(devolvedores);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getDevolvedorById(req, res) {
    const { id } = req.query;
    try {
      const devolvedor = await Devolvedor.findById(id);

      return res.status(200).json(devolvedor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async atualizarDevolvedor(req, res) {
    const { id } = req.query;
    const { nome, nota, email, telefone } = req.body;

    try {
      const devolvedor = await Devolvedor.findByIdAndUpdate(
        id,
        {
          nome,
          nota,
          email,
          telefone,
        },
        { new: true }
      );

      return res.status(200).json(devolvedor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async excluirDevolvedor(req, res) {
    const { id } = req.query;
    try {
      await Devolvedor.findByIdAndDelete(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
