import mongoose from '@/database';

const devolucaoSchema = new mongoose.Schema({
  localDevolucao: {
    type: String,
    required: true
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
    ref: 'Devolvedor'
  }
});

const Devolucao = mongoose.models.Devolucao || mongoose.model('Devolucao', devolucaoSchema);

module.exports = Devolucao;