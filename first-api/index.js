const express = require("express");

const server = express();
server.use(express.json());

const cursos = ["JS", "PYTHON", "RUBY", "JS", "JAVA"];

//middleware global
server.use((req, res, next) => {
  console.log(`URL CHAMADA ${req.url}`);

  return next();
});

function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).send({ error: "Campo name é obrigatório" });
  }

  return next();
}

function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];
  if (!curso) {
    return res.status(400).send({ error: "O index informado nao existe" });
  }

  req.curso = curso

  return next();
}


//localhost:3000/cursos

//listando varios cursos
server.get("/cursos", (req, res) => {
  return res.json(cursos);
});

//listando somente um curso
server.get("/cursos/:index",checkIndexCurso, (req, res) => {
  return res.json(req.curso);
});

//criando um novo curso
server.post("/cursos", checkCurso, (req, res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

//atualizando um curso
server.put("/cursos/:index", checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

//excluindo um curso
server.delete("/cursos/:index",checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.send();
});

server.listen(3000); //listen port
