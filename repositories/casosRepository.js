const casos = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicídio",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro Uni",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a9f1"
  },
  // você pode adicionar mais objetos aqui
];

function findAll() {
  return casos;
}

function create(caso) {
  casos.push(caso);
  return caso;
}

function findById(id) {
  return casos.find(caso => caso.id === id);
}

function update(id, data) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index !== -1) {
    casos[index] = { ...casos[index], ...data };
    return casos[index];
  }
  return null;
}

function remove(id) {
  const index = casos.findIndex(caso => caso.id === id);
  if (index !== -1) {
    return casos.splice(index, 1)[0];
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
