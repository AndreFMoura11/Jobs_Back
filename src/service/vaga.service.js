import VagaRepository from '../repositories/vaga.repository.js';
import Vaga from '../models/vaga.model.js';
import bycrypt from 'bcrypt';



// Erros customizados (crie um arquivo errors.js)





// --- Métodos com REGRAS DE NEGÓCIO ---
class VagaService{

  // Criar 
  async createVaga(data) {
    const existingVaga = await VagaRepository.listarVagas({
      where: { title:data.title } // puxar do data.title qual ?   
    });

    if (existingVaga){
      throw new Error('Vaga ja Existe!'); // throw joga no cath e o new chama o constructor do Error

    }

    const vaga = await VagaRepository.createVaga({data}) // usar o memtodo do CRUD tecnico prisma , jogar para variavel data 
    return vaga; // Retorna os dados da vaga
  }


  // Listar todas as vagas 
  async listarVagas(){
    const vagas = await VagaRepository.listarVagas()
    return vagas;
  } 
  

  // Listar por Titles 
  async listarVagasTitles(data){
    
    const vaga = await VagaRepository.listarVagasTitles({
      where: {title}
    })

    // Talvez precise colocar um if para erro ou swint case

    return vaga;
  }

  // Update 
  async UpdateVagas(data){
    const existingVagas = await VagaRepository.listarVagasTitles({
      where:{title:data.title}
    })

    if(existingVagas){
      throw new Error("Vaga Ja Existe!")
    }

    const vaga = await VagaRepository.update({
      where:{id:data.id},
      data:data
    })
    return vaga;
  }

  // Deletar
  async deletarVaga(data){
    const existingVagas = await Vaga.deletarVaga({
      where:{id:data.id},
      data:data
    })
    if(!existingVagas){
      throw new Error("Vaga Não Existe!")
    }
    return existingVagas;
  }






    




}


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