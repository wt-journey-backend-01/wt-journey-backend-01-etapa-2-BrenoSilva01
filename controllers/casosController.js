const casosRepository = require('../repositories/casosRepository');
const { v4: uuidv4 } = require('uuid');

// GET /casos
function getAllCasos(req, res) {
    const casos = casosRepository.findAll();
    res.json(casos);
}

// GET /casos/:id
function getCasoById(req, res) {
    const caso = casosRepository.findById(req.params.id);
    if (!caso) return res.status(404).json({ error: "Caso não encontrado" });
    res.json(caso);
}

// POST /casos
function createCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    if (!["aberto", "solucionado"].includes(status)) {
        return res.status(400).json({ error: 'Status inválido. Use "aberto" ou "solucionado"' });
    }

    const novoCaso = {
        id: uuidv4(),
        titulo,
        descricao,
        status,
        agente_id,
    };

    const criado = casosRepository.create(novoCaso);
    res.status(201).json(criado);
}

// PUT /casos/:id
function updateCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    if (!["aberto", "solucionado"].includes(status)) {
        return res.status(400).json({ error: 'Status inválido. Use "aberto" ou "solucionado"' });
    }

    const atualizado = casosRepository.update(req.params.id, {
        titulo, descricao, status, agente_id
    });

    if (!atualizado) return res.status(404).json({ error: "Caso não encontrado" });

    res.json(atualizado);
}

// PATCH /casos/:id
function patchCaso(req, res) {
    const atualizado = casosRepository.update(req.params.id, req.body);

    if (!atualizado) return res.status(404).json({ error: "Caso não encontrado" });

    // se vier 'status', validar
    if (req.body.status && !["aberto", "solucionado"].includes(req.body.status)) {
        return res.status(400).json({ error: 'Status inválido. Use "aberto" ou "solucionado"' });
    }

    res.json(atualizado);
}

// DELETE /casos/:id
function deleteCaso(req, res) {
    const removido = casosRepository.remove(req.params.id);
    if (!removido) return res.status(404).json({ error: "Caso não encontrado" });
    res.status(204).send();
}

module.exports = {
    getAllCasos,
    getCasoById,
    createCaso,
    updateCaso,
    patchCaso,
    deleteCaso,
};
