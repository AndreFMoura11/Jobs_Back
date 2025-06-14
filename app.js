import express from "express";
import cors from "cors";
import vagaRoutes from "./src/routes/vaga.routes.js";
import morgan from 'morgan';





const app = express();

// middlewares globais
app.use(cors()); // permite requisições de outros domínios
app.use(express.json());
app.use(morgan('dev')); // a ordem importa ficar depois de criar as rotas

// ROTAS
app.use("/vagas", vagaRoutes); //// Ex: rota POST /vagas ou GET /vagas/:id
// app.use(errorHandler); // descomente se criar um middleware de erro

export default app; // exporta a aplicação para ser usada no server.js

/*
APP-----------
|||||||||||||||

Monta a aplicação Express.

Configura middlewares (ex: cors, express.json()).

Define as rotas e os middlewares globais.

Não dá o listen (não sobe o servidor).

O que tem que conter:----------------

express()

middlewares globais (cors, json)

rotas da API

middleware de erro

module.exports = app


*/

