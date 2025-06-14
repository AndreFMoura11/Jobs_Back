import express from "express"
import vagaController from "../controller/vaga.controller.js"

const router = express.Router();

router.post('/', vagaController.create);
router.get('/', vagaController.listarvagas);
router.get('/title', vagaController.listarVagasTitles);
router.delete('/', vagaController.delete);

export default router;  