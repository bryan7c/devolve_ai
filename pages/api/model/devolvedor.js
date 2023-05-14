import mongoose from '@/src/database';

const devolvedorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
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