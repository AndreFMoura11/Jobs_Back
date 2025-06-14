import VagaRepository from '../repositories/vaga.repository.js';

class VagaService {

  // CRIAR
  async createVaga(data) {
    const existingVaga = await VagaRepository.findByTitle(data.title); // nao tem filtro (data.title); 
    if (existingVaga) {
      throw new Error("Vaga já existe!");
    }
    const vaga = await VagaRepository.create(data); // nao pode ser entre {}
    return vaga;
  }

  // LISTAR TODAS
  async listarVagas() {
    return await VagaRepository.findMany();
  }

  // LISTAR POR TÍTULO
  async listarVagaPorTitulo(title) {
    const vaga = await VagaRepository.findByTitle(title);
    if (!vaga) {
      throw new Error("Vaga não encontrada!");
    }
    return vaga;
  }

  // ATUALIZAR
  async updateVaga(id, data) {
    const existing = await VagaRepository.findUnique(id);
    if (!existing) {
      throw new Error("Vaga não encontrada para atualizar");
    }
    return await VagaRepository.update(id, data);
  }

  // DELETAR
  async deletarVaga(id) {
    const existing = await VagaRepository.findUnique(id); // deletar precisa receber o id 
    if (!existing) {
      throw new Error("Vaga não encontrada para deletar");
    }
    return await VagaRepository.delete(id);
  }
}

export default new VagaService();
