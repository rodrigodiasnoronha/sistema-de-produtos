const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const produtoRoutes = require("./routes/produtos");
const usuarioRoutes = require("./routes/usuarios");
const funcionarioRoutes = require("./routes/funcionarios");

const mongoose = require("mongoose");

app.use(cors());
app.use(morgan("dev"));

mongoose.connect(
  "mongodb+srv://unidesc:unidesc@cluster0.sggk2.mongodb.net/cluster0?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//TRATANDO O CORS

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Acces-control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Acces-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "PUT, POST, PATH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/produtos", produtoRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/funcionarios", funcionarioRoutes);

//app.use((req, res, next) => {
//  const error = new Error('not found');
// error.status = 404;
// next(error);
//});

//app.use((error, req, next) =>{
//res.status(error.status || 500);
//res.json({
// error:{
// message: error.message
// }
//});
//});

module.exports = app;
