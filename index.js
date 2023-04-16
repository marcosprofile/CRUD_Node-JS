const express = require('express');
const server = express();
server.use(express.json());

/* ---------------------- Q U E R Y _ P A R A M S --------------------- */

// Query params = ?nome=NodeJS
/*
server.get("/curso", (req, res) => {
  const nome = req.query.nome;
  return res.json({ curso: `Aprendendo: ${nome}`});
})
*/

/* ---------------------- Q U E R Y _ P A R A M S --------------------- */

/* -------------------------------------------------------------------- */
/* -------------------------------------------------------------------- */

/* --------------------- R O U T E _ P A R A M S --------------------- */

// Route params = /curso/2
/*
server.get("/curso/:id", (req, res) => {
  const id = req.query.id;
  return res.json({ curso: `Curso: ${id}`});
})
*/

/* --------------------- R O U T E _ P A R A M S --------------------- */

/* ------------------------------------------------------------------- */
/* ------------------------------------------------------------------- */

/* --------------------- R E Q U E S T _ B O D Y --------------------- */

// Request body = { nome: "Nodejs", tipo: "Backend" }
/*
const cursos = ["JavaScript", "Node JS", "React", "React Native"];

server.get("/curso/:index", (req, res) => {
  const { index } = req.params;
  // return res.send("Node JS")
  return res.json(cursos[index]);
})
*/

/* --------------------- R E Q U E S T _ B O D Y --------------------- */

/* -------------------------------------------------------------------- */
/* -------------------------------------------------------------------- */

/* ----------------------------- C R U D ----------------------------- */
/* ----------------------------- C R U D ----------------------------- */
/* ----------------------------- C R U D ----------------------------- */

const cursos = ["JavaScript", "Node JS", "React", "React Native"];

/* ------------ MIDDLEWARE - GLOBAL ------------ */

server.use((req, res, next) => {
  console.log(`URL CHAMADA: ${req.url}`);
  return next();
});

function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Nome do curso é obrigatório" });
  }

  return next();
}

function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];

  if(!curso) {
    return res.status(404).json({ error: "Nenhum curso encontrado!"})
  }

  req.curso = curso

  return next();
}

/* ------------ MIDDLEWARE - GLOBAL ------------ */

/* ---------------------------------------------- */
/* ---------------------------------------------- */

/* ------- LISTANDO - TODOS - OS - CURSOS ------- */

server.get("/cursos", (req, res) => {
  return res.json(cursos);
});

/* ------- LISTANDO - TODOS - OS - CURSOS ------- */

/* ---------------------------------------------- */
/* ---------------------------------------------- */

/* ----------- LISTANDO - UM - CURSO ----------- */

server.get("/cursos/:index", checkIndexCurso, (req, res) => {
  return res.json(req.curso);
});

/* ----------- LISTANDO - UM - CURSO ----------- */

/* ---------------------------------------------- */
/* ---------------------------------------------- */

/* -------- CRIANDO - UM - NOVO - CURSO -------- */

server.post("/cursos", checkCurso, (req, res) => {
  const { name } = req.body;
  cursos.push(name);
  return res.json(cursos);
});

/* -------- CRIANDO - UM - NOVO - CURSO -------- */

/* ---------------------------------------------- */
/* ---------------------------------------------- */

/* ---------- ATUALIZANDO - UM - CURSO ---------- */

server.put("/cursos/:index", checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

/* ---------- ATUALIZANDO - UM - CURSO ---------- */

/* ---------------------------------------------- */
/* ---------------------------------------------- */

/* --------- EXCLUINDO - ALGUM - CURSO --------- */

server.delete("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;
  
  cursos.splice(index, 1);
  return res.json(cursos);
  // return res.json({ message: "Curso deletado com sucesso!"});
  // return res.send();
});

/* --------- EXCLUINDO - ALGUM - CURSO --------- */

/* ----------------------------- C R U D ----------------------------- */
/* ----------------------------- C R U D ----------------------------- */
/* ----------------------------- C R U D ----------------------------- */

server.listen(3000);