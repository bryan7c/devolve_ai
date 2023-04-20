import mongoose from '@/src/database';

const devolucaoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  coordenadas: {
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