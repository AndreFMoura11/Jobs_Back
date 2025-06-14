import vagaService from "../service/vaga.service.js"

class vagaController{

    //CRIAR 
    async create(req,res,next ){
        try{
            const vaga = await vagaService.create(req.body);
            return res.status(201).json(vaga);
        }catch(error){
            next(error);
        }
    }

    // LISTAR TODOS 
    async listarvagas(req,res,next){
        try{
            const vaga = await vagaService.listarvagas(req.body);
            return res.status(200).json(vaga);
        }catch(error){
            next(error);
        }
    }

    // LISTAR ESPECIFICO
    async listarVagasTitles(req,res,next){
        try{
            const title = await vagaService.findFirst(req.body);
            return res.status(200).json(title);
        }catch(error){
            next(error);
        }
}
        
    // DELETAR 
    async delete(req,res,next){
        try{
            const vaga = await vagaService.delete(req.body);
            return res.status(204).json(vaga);
        }catch(error){
            next(error);
        }

    }
}

export default new vagaController();

/*

PRECISA CRIAR UM MIDWARE PARA Q ELE ENVIEI O ERRO 

*/