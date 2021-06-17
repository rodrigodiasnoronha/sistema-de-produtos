const mongoose = require('mongoose');

const funcionarioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: String,
    dataAdmissao: Date,
    salarioBruto:Number
});


module.exports = mongoose.model('Funcionario', funcionarioSchema);
