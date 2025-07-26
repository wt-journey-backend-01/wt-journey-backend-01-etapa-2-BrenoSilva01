const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

// Utilitário simples para validar data no formato YYYY-MM-DD
function isValidDate(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

// GET /agentes
function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.json(agentes);
}

// GET /agentes/:id
function getAgenteById(req, res) {
  const agente = agentesRepository.findById(req.params.id);
  if (!agente) return res.status(404).json({ error: "Agente não encontrado" });
  res.json(agente);
}

// POST /agentes
function createAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;

  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (!isValidDate(dataDeIncorporacao)) {
    return res.status(400).json({ error: "Formato de data inválido. Use YYYY-MM-DD" });
  }

  const novoAgente = {
    id: uuidv4(),
    nome,
    dataDeIncorporacao,
    cargo,
  };

  const criado = agentesRepository.create(novoAgente);
  res.status(201).json(criado);
}

// PUT /agentes/:id
function updateAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;

  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (!isValidDate(dataDeIncorporacao)) {
    return res.status(400).json({ error: "Formato de data inválido. Use YYYY-MM-DD" });
  }

  const atualizado = agentesRepository.update(req.params.id, {
    nome, dataDeIncorporacao, cargo,
  });

  if (!atualizado) return res.status(404).json({ error: "Agente não encontrado" });

  res.json(atualizado);
}

// PATCH /agentes/:id
function patchAgente(req, res) {
  if (req.body.dataDeIncorporacao && !isValidDate(req.body.dataDeIncorporacao)) {
    return res.status(400).json({ error: "Formato de data inválido. Use YYYY-MM-DD" });
  }

  const atualizado = agentesRepository.update(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ error: "Agente não encontrado" });

  res.json(atualizado);
}

// DELETE /agentes/:id
function deleteAgente(req, res) {
  const removido = agentesRepository.remove(req.params.id);
  if (!removido) return res.status(404).json({ error: "Agente não encontrado" });
  res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  patchAgente,
  deleteAgente,
};
