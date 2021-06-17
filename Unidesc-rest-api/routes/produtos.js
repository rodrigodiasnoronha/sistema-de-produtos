const express = require("express");
const router = express.Router();
const Produto = require("../models/produtos");
const mongoose = require("mongoose");
const checkauth = require("../middleware/checkauth");
const { response } = require("express");

router.get("/", (req, res, next) => {
  Produto.find()
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

// router.post("/", checkauth, (req, res, next) => {
router.post("/", (req, res, next) => {
  const produto = new Produto({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    preco: req.body.preco,
  });
  produto
    .save()
    .then((result) => {
      res.status(201).json({
        message: "POST Rquest para /funcionarios",
        produto: Produto,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Produto.deleteOne({ _id: req.params.id })
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

router.put("/:id", async (req, res) => {
  try {
    const p = await Produto.findOne({ _id: req.params.id });

    if (!p) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    p.nome = req.body.nome;
    p.preco = req.body.preco;

    await p.save();

    return res.status(200).json(p);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get("/:id", (req, res) => {
  Produto.findById(req.params.id)
    .then((produto) => {
      return res.status(200).json(produto);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

module.exports = router;
