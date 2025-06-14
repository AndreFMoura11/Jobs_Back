import { prisma } from "../database/prisma.js";

class VagaRepository {
  async create(data) {
    return await prisma.vaga.create(data);
  }

  async findMany(options) {
    return await prisma.vaga.findMany(options);
  }

  async findFirst(options) {
    return await prisma.vaga.findFirst(options);
  }

  async findUnique(options) {
    return await prisma.vaga.findUnique(options);
  }

  async update(options) {
    return await prisma.vaga.update(options);
  }

  async delete(options) {
    return await prisma.vaga.delete(options);
  }
}

export default new VagaRepository();
