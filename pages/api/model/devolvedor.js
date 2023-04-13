import mongoose from '@/src/database';

const devolvedorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  nota: {
    type: Number,
    required: false,
    decimal: true,
    default: 0.00
  },
  email: {
    type: String,
    required: false
  },
  telefone: {
    type: String,
    required: false
  },
});

const Devolvedor = mongoose.models.Devolvedor || mongoose.model('Devolvedor', devolvedorSchema);

module.exports = Devolvedor;