import vagaService from "../service/vaga.service.js";

class VagaController {
  async create(req, res, next) {
    try {
      const vaga = await vagaService.createVaga(req.body);
      res.status(201).json(vaga);
    } catch (error) {
      next(error);
    }
  }

  async listarTodas(req, res, next) {
    try {
      const vagas = await vagaService.listarTodasVagas();
      res.status(200).json(vagas);
    } catch (error) {
      next(error);
    }
  }

  async listarPorTitulo(req, res, next) {
    try {
      const { title } = req.query;
      const vaga = await vagaService.listarVagasPorTitulo(title);
      res.status(200).json(vaga);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const dados = req.body;
      const vagaAtualizada = await vagaService.atualizarVaga(id, dados);
      res.status(200).json(vagaAtualizada);
    } catch (error) {
      next(error);
    }
  }

  async deletar(req, res, next) {
    try {
      const id = Number(req.params.id);
      await vagaService.deletarVaga(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new VagaController();
