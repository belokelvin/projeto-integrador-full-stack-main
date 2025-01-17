const mongoose = require('mongoose');

const fornecedorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    ativo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Fornecedor', fornecedorSchema);