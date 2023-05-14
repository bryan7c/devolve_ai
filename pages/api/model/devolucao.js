import mongoose from '@/src/database';

const devolucaoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  origem: {
    type: Object,
  },
  destino: {
    type: Object,
  },
  status: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  dataLimite: {
    type: Date,
    required: true
  },
  codigo: {
    type: String,
  },
  largura: {
    type: Number,
  },
  altura: {
    type: Number,
  },
  comprimento: {
    type: Number,
  },
  peso: {
    type: Number,
  },
  devolvedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Devolvedor',
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  }
});

const Devolucao = mongoose.models.Devolucao || mongoose.model('Devolucao', devolucaoSchema);

module.exports = Devolucao;