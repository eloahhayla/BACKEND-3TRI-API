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

app.post("/cadastrar", (req, res)=>{
  const cliente = req.body
  const senhaCript = bcrypt.hashSync(cliente.senha, 10)
  res.send(senhaCript)
})
app.get("/usuarios", (req, res)=>{
  res.send(usuarios)
})

app.listen(port, ()=>{
  console.log("API RODANDO NA PORTA" + port)
})