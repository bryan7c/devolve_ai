import Devolucao from "@/pages/api/model/devolucao";
import Devolvedor from "@/pages/api/model/devolvedor";
import Usuario from "@/pages/api/model/usuario";

module.exports = {
  async createDevolucao(req, res) {
    const { titulo, origem, destino, valor, dataLimite, status, devolvedor, usuario, codigo, largura, altura, comprimento, peso } = req.body;

    // Converter a data de string para objeto Date
    const dataObjeto = new Date(dataLimite);

    // Converter o objeto Date para o formato ISODate do MongoDB
    const dataISO = dataObjeto.toISOString();

    try {
      const devolucao = new Devolucao({
        titulo,
        valor: parseInt(valor),
        dataLimite: new Date(dataISO),
        status,
        devolvedor,
        usuario,
        origem,
        destino,
        codigo,
        largura,
        altura,
        comprimento,
        peso
      });
      const response = Devolucao.create(devolucao);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async atualizarDevolucao(req, res) {
    const { id } = req.query;
    const { titulo, origem, destino, valor, dataLimite, status, devolvedor, usuario, codigo, largura, altura, comprimento, peso } = req.body;

    try {
      const devolucaoAntiga = await Devolucao.findById(id);
      if (!devolucaoAntiga) {
        return res.status(404).json({ error: "Devolução não encontrada." });
      }

      let devolucaoAtualizada = { ...devolucaoAntiga.toObject() };

      if (titulo) {
        devolucaoAtualizada.titulo = titulo;
      }
      if (valor) {
        devolucaoAtualizada.valor = valor;
      }
      if (dataLimite) {
        devolucaoAtualizada.dataLimite = dataLimite;
      }
      if (status) {
        devolucaoAtualizada.status = status;
      }
      if (devolvedor) {
        devolucaoAtualizada.devolvedor = devolvedor;
      }
      if (usuario) {
        devolucaoAtualizada.usuario = usuario;
      }
      if (origem) {
        devolucaoAtualizada.origem = origem;
      }
      if (destino) {
        devolucaoAtualizada.destino = destino;
      }
      if (codigo) {
        devolucaoAtualizada.codigo = codigo;
      }
      if (largura) {
        devolucaoAtualizada.largura = largura;
      }
      if (altura) {
        devolucaoAtualizada.altura = altura;
      }
      if (comprimento) {
        devolucaoAtualizada.comprimento = comprimento;
      }
      if (peso) {
        devolucaoAtualizada.peso = peso;
      }

      const devolucao = await Devolucao.findByIdAndUpdate(
        id,
        devolucaoAtualizada,
        { new: true }
      ).populate("devolvedor").populate("usuario");

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

  async getDevolucao(req, res) {
    const {
      status,
      valor,
      titulo,
      origem,
      destino,
      dataInicial,
      dataLimite,
      devolvedor,
      usuario,
      id,
      codigo,
      largura,
      altura,
      comprimento,
      peso
    } = req.query;

    let query = {};

    // Define a data inicial com um valor muito antigo se não tiver sido passada
    const dataInicialFiltrada = dataInicial
      ? new Date(dataInicial)
      : new Date("1970-01-01");

    // Define a data final com um valor muito grande se não tiver sido passada
    const dataFinalFiltrada = dataLimite
      ? new Date(dataLimite)
      : new Date("2100-01-01");

    query.dataLimite = { $gte: dataInicialFiltrada, $lte: dataFinalFiltrada };

    // Busca pelo id do devolvedor
    if (devolvedor) {
      const devolvedorObj = await Devolvedor.findById(devolvedor);
      if (devolvedorObj) {
        query.devolvedor = devolvedorObj._id;
      } else {
        return res.status(404).json({ message: "Devolvedor não encontrado" });
      }
    }

    // Busca pelo id do usuario
    if (usuario) {
      const usuarioObj = await Usuario.findById(usuario);
      if (usuarioObj) {
        query.usuario = usuarioObj._id;
      } else {
        return res.status(404).json({ message: "Usuario não encontrado" });
      }
    }

    // Busca pelo status
    if (status) {
      query.status = status;
    }

    // Busca por origem
    if (origem) {
      query.origem = origem;
    }
    
    // Busca por destino
    if (destino) {
      query.destino = destino;
    }

    // Busca pelo id
    if (id) {
      query._id = id;
    }

    // Busca por valor
    if (valor) {
      query.valor = { $lt: parseInt(valor) };
    }

    // Busca por titulo
    if (titulo) {
      query.titulo = titulo;
    }

    // Busca por codigo
    if (codigo) {
      query.codigo = codigo;
    }

    // Busca por largura
    if (largura) {
      query.largura = largura;
    }

    // Busca por altura
    if (altura) {
      query.altura = altura;
    }

    // Busca por comprimento
    if (comprimento) {
      query.comprimento = comprimento;
    }

    // Busca por peso
    if (peso) {
      query.peso = peso;
    }

    try {
      const devolucoes = await Devolucao.find(query).populate("devolvedor").populate("usuario");

      return res.status(200).json(devolucoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
