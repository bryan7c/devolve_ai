import Devolvedor from "@/pages/api/model/devolvedor";

module.exports = {
  async criarDevolvedor(req, res) {
    const { nome, nota, email, telefone } = req.body;

    try {
      const devolvedor = new Devolvedor({
        nome,
        nota: parseFloat(nota),
        email,
        telefone,
      });

      const response = await Devolvedor.create(devolvedor);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async atualizarDevolvedor(req, res) {
    const { id } = req.query;
    const { nome, nota, email, telefone } = req.body;

    try {
      const devolvedorAntigo = await Devolvedor.findById(id);
      if (!devolvedorAntigo) {
        return res.status(404).json({ error: "Devolvedor não encontrado." });
      }

      let devolvedorAtualizado = { ...devolvedorAntigo.toObject() };

      if (nome) {
        devolvedorAtualizado.nome = nome;
      }
      if (nota) {
        devolvedorAtualizado.nota = parseFloat(nota);
      }
      if (email) {
        devolvedorAtualizado.email = parseFloat(email);
      }
      if (telefone) {
        devolvedorAtualizado.telefone = parseFloat(telefone);
      }

      const devolvedor = await Devolvedor.findByIdAndUpdate(
        id,
        devolvedorAtualizado,
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

  async getDevolvedor(req, res) {
    const { nome, nota, email, telefone, id } = req.query;
    let query = {};

    // Busca pelo nome
    if (nome) {
      query.nome = nome;
    }

    // Busca pela nota
    if (nota) {
      query.nota = { $lte: parseInt(nota) };
    }

    // Busca pelo email
    if (email) {
      query.email = email;
    }

    // Busca pelo telefone
    if (telefone) {
      query.telefone = telefone;
    }

    // Busca pelo id
    if (id) {
      query._id = id;
    }

    try {
      const devolvedores = await Devolvedor.find(query);
      return res.status(200).json(devolvedores);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
