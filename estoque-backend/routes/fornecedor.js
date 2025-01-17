const express = require('express');
const Fornecedor = require('../models/fornecedor');
const router = express.Router();

// Cadastro de fornecedor
router.post('/', async (req, res) => {
    const { nome, cnpj } = req.body;

    try {
        const fornecedorExistente = await Fornecedor.findOne({ cnpj });
        if (fornecedorExistente) {
            return res.status(400).json({ message: 'Fornecedor já cadastrado com este CNPJ.' });
        }

        const novoFornecedor = new Fornecedor({ nome, cnpj });
        await novoFornecedor.save();
        res.status(201).json(novoFornecedor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar fornecedor.' });
    }
});

// Listar fornecedores
router.get('/', async (req, res) => {
    try {
        const fornecedores = await Fornecedor.find();
        res.json(fornecedores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar fornecedores.' });
    }
});

// Desassociar fornecedor
router.delete('/:id', async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByIdAndUpdate(req.params.id, { ativo: false }, { new: true });
        if (!fornecedor) {
            return res.status(404).json({ message: 'Fornecedor não encontrado.' });
        }
        res.json(fornecedor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao desassociar fornecedor.' });
    }
});

module.exports = router;