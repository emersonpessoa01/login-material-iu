import express from 'express'

import cors from "cors";
import mongoose from "mongoose";


import routes from './routes/routes');
import path from "path";
import dotenv from 'dotenv';

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React ao app
 */
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Rota raiz
 */
app.get('/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});

/**
 * Rotas principais do app
 */
app.use('/api/transaction', routes);

/**
 * Conexão ao Banco de Dados
 */
const { DB_CONNECTION } = process.env;

console.log('Iniciando conexão ao MongoDB...');
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      connectedToMongoDB = false;
      console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  connectedToMongoDB = true;
  console.log('Conectado ao MongoDB');

  /**
   * Definição de porta e
   * inicialização do app
   */
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
});