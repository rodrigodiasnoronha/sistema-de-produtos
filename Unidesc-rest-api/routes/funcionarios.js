const express = require("express");
const router = express.Router();
const Funcionario = require("../models/funcionarios");
const mongoose = require("mongoose");
const checkauth = require("../middleware/checkauth");

router.get("/", (req, res, next) => {
  Funcionario.find()
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({
        erro: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const funcionario = new Funcionario({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    dataAdmissao: req.body.dataAdmissao,
    salarioBruto: req.body.salarioBruto,
  });

  funcionario
    .save()
    .then((result) => {
      res.status(201).json({
        message: "POST Rquest para /funcionarios",
        funcionario: Funcionario,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/id", (req, res, next) => {
  Funcionario.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(201).json({
        message: "Funcionário apagado",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
