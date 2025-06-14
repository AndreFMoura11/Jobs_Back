import express from "express";
import vagaController from "../controller/vaga.controller.js";

const router = express.Router();

router.post("/", vagaController.create);                // POST /vagas
router.get("/", vagaController.listarTodas);            // GET /vagas
router.get("/busca", vagaController.listarPorTitulo);   // GET /vagas/busca?title=...
router.put("/:id", vagaController.atualizar);           // PUT /vagas/:id
router.delete("/:id", vagaController.deletar);          // DELETE /vagas/:id

export default router;
