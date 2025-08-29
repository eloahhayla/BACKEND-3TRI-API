// npm init -> inicia a API
// npm i express -> biblioteca do express
const express = require("express")
const app = express()
const port = 3002
app.use(express.json())

// npm i mysql2
const db = require("./db")

// npm i bcrypt
const bcrypt = require("bcrypt")
const { reduce } = require("lodash")

app.post("/cadastrar", async (req, res)=>{
  const cliente = req.body
  const senhaCript = bcrypt.hashSync(cliente.senha, 10)
try {
  const resultado = await db.pool.query(
     `INSERT INTO clientes (
      nome_completo, cpf, estado, cidade,
      bairro, n_casa, rua, cep, email, telefone, senha
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`,
      [cliente.nome_completo, cliente.cpf,
      cliente.estado, cliente.cidade,
      cliente.bairro, cliente.n_casa,
      cliente.rua, cliente.cep,
      cliente.email, cliente.telefone,
      senhaCript]
   )
   res.status(200).send("Cliente cadastrado!")
  } catch (erro) {
    res.status(500).send("Erro interno")
    console.log(erro)
  }
})

app.get("/usuarios", async (req, res)=>{
  try {
    const resultado = await db.pool.query("SELECT * FROM clientes")
    res.status(200).json(resultado[0])
  } catch (erro) {
    res.status(500).send("erro")
  }
})
app.listen(port, ()=>{
  console.log("API RODANDO NA PORTA" + port)
})