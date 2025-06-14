import VagaRepository from "../repository/vaga.repository.js";

class VagaService {
  async createVaga(data) {
    const existingVaga = await VagaRepository.findFirst({ 
      where: { title: data.title }
    });

    if (existingVaga) {
      throw new Error("Vaga já existe!");
    }

    return await VagaRepository.create({ data });
  }

  async listarTodasVagas() {
    return await VagaRepository.findMany();
  }

  async listarVagasPorTitulo(title) {
    if (!title) throw new Error("Campo 'title' obrigatório");
    return await VagaRepository.findMany({
      where: { title: { contains: title } }
    });
  }

  async atualizarVaga(id, data) {
    if (data.title) {
      const existing = await VagaRepository.findFirst({
        where: {
          title: data.title,
          NOT: { id }
        }
      });
      if (existing) throw new Error("Já existe uma vaga com esse título!");
    }

    return await VagaRepository.update({
      where: { id },
      data
    });
  }

  async deletarVaga(id) {
    const vaga = await VagaRepository.findUnique({ where: { id } });
    if (!vaga) throw new Error("Vaga não encontrada!");
    return await VagaRepository.delete({ where: { id } });
  }
}

export default new VagaService();



/*

PEGAR ERROS DO BANCO 

VERSOES SERVICE -----------------
|||||||||||||||||||||||||||||||||


1. Versão Mais Simples (Sem regras/tratamento)===============
-------------------------------------------------------------

// services/vagaService.js
const VagaRepository = require("../repositories/vagaRepository");

class VagaService {
  constructor() {
    this.repository = new VagaRepository();
  }

  // Apenas repassa a chamada para o repository
  async listarVagas() {
    return await this.repository.findMany();
  }

  async criarVaga(dados) {
    return await this.repository.create(dados);
  }
}

Problema: Se o banco falhar, o erro vai propagar sem tratamento.



2. Versão com Try/Catch Básico (Tratamento genérico)==========
--------------------------------------------------------------

// services/vagaService.js
const VagaRepository = require("../repositories/vagaRepository");

class VagaService {
  constructor() {
    this.repository = new VagaRepository();
  }

  async listarVagas() {
    try {
      return await this.repository.findMany();
    } catch (error) {
      console.error("Erro no service:", error);
      throw new Error("Falha ao listar vagas");
    }
  }
}

Melhoria: Captura erros de banco e lança um erro genérico.


3. Versão Completa (Erros customizados + validações) ==========
---------------------------------------------------------------

// services/vagaService.js
const VagaRepository = require("../repositories/vagaRepository");

// Erros customizados (crie um arquivo errors.js)
class DadosIncompletosError extends Error {
  constructor(camposFaltantes) {
    super(`Campos obrigatórios faltando: ${camposFaltantes.join(", ")}`);
    this.name = "DadosIncompletosError";
  }
}

class VagaService {
  constructor() {
    this.repository = new VagaRepository();
  }

  async criarVaga(dados) {
    // Validação simples (sem try/catch)
    const camposObrigatorios = ["titulo", "descricao"];
    const faltantes = camposObrigatorios.filter(campo => !dados[campo]);

    if (faltantes.length > 0) {
      throw new DadosIncompletosError(faltantes); // Erro customizado
    }

    try {
      // Lógica adicional (ex: formatar dados antes de salvar)
      const dadosFormatados = {
        ...dados,
        titulo: dados.titulo.trim(),
      };

      return await this.repository.create(dadosFormatados);

    } catch (error) {
      console.error("Erro no banco:", error);
      throw new Error("Falha ao criar vaga no banco de dados");
    }
  }
}


*/


/*

os jws fica no dentro do conroler ou em autheticar.controler q funciona em todos 
*/