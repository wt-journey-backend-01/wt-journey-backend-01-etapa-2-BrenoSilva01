const express = require('express');
const app = express();
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');
const setupSwagger = require('./docs/swagger');

app.use(express.json());

// Rotas da API
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

// Documentação Swagger
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger: http://localhost:${PORT}/api-docs`);
});
