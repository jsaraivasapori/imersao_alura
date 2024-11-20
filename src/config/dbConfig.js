import { MongoClient } from "mongodb";

export async function conectarAoBanco(stringConecao) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConecao);
    console.log("Conectando ao cluster do banco de dados...");
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    return mongoClient;
  } catch (erro) {
    console.error("Falha na conexao com o banco! Erro: " + erro);
    process.exit();
  }
}
