import fs from "node:fs";
import { getTodosPosts, criarPost } from "../models/postsModel.js";

export async function listarPosts(req, res) {
  const post = await getTodosPosts();
  res.status(200).json(post);
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;

  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Falha na requisição" });
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imagemUrl: req.file.originalname,
    alt: "",
  };

  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualziada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualziada);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Falha na requisição" });
  }
}
