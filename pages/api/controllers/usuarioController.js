import Usuario from "@/pages/api/model/usuario";

module.exports = {
  async criarUsuario(req, res) {
    const { nome, email, telefone } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email,
        telefone,
      });

      const response = await Usuario.create(usuario);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async atualizarUsuario(req, res) {
    const { id } = req.query;
    const { nome, email, telefone } = req.body;

    try {
      const usuarioAntigo = await Usuario.findById(id);
      if (!usuarioAntigo) {
        return res.status(404).json({ error: "Usuario não encontrado." });
      }

      let usuarioAtualizado = { ...usuarioAntigo.toObject() };

      if (nome) {
        usuarioAtualizado.nome = nome;
      }
      if (email) {
        usuarioAtualizado.email = parseFloat(email);
      }
      if (telefone) {
        usuarioAtualizado.telefone = parseFloat(telefone);
      }

      const usuario = await Usuario.findByIdAndUpdate(
        id,
        usuarioAtualizado,
        { new: true }
      );

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async excluirUsuario(req, res) {
    const { id } = req.query;
    try {
      await Usuario.findByIdAndDelete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getUsuario(req, res) {
    const { nome, email, telefone, id } = req.query;
    let query = {};

    // Busca pelo nome
    if (nome) {
      query.nome = nome;
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
      const usuarioes = await Usuario.find(query);
      return res.status(200).json(usuarioes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
