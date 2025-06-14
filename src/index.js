import app from "../app.js";



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/*
INDEX.JS-----------
|||||||||||||||||||

 O que ele faz?
O index.js não é obrigatório, mas serve como ponto de entrada único.
Seu papel é ser o arquivo principal que a gente roda com o comando:

Ele apenas chama o server.js, que é quem realmente sobe o app.


*/