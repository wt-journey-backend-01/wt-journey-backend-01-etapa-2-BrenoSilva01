const agentes = [
  {
    id: "401bccf5-cf9e-489d-8412-446cd169a9f1",
    nome: "Agente Maria Silva",
    matricula: "AGT-001",
    disponibilidade: true
  },
  // adicione outros agentes se quiser
];

function findAll() {
  return agentes;
}

function create(agente) {
  agentes.push(agente);
  return agente;
}

function findById(id) {
  return agentes.find(agente => agente.id === id);
}

function update(id, data) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    agentes[index] = { ...agentes[index], ...data };
    return agentes[index];
  }
  return null;
}

function remove(id) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    return agentes.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  findAll,
  create,
  findById,
  update,
  remove,
};
