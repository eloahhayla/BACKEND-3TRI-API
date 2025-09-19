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

// npm i cors
const cors = require('cors')
app.use(cors())

// npm i jsonwebtoken
const jwt = require("jsonwebtoken")

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

app.post("/login", async (req, res) => {
  // pegar dados do body
  const login = req.body
  if (login.email == null || login.senha == null) {
    return res.status(400).json({erro: "Informe o email e senha"})
  }
    // comparar com os dados do banco de dados
    try {
      const [resposta] = await db.pool.query(
        "SELECT nome_completo, email, senha FROM clientes WHERE email = ?",
        [login.email]
      )
      if(!resposta[0]){
        return res.status(401).json({erro: "Credenciais inválidas"})
      }
      // verificar se a senha está correta
      if(resposta[0].senha.length < 20){
        if(resposta[0].senha != login.senha){
          return res.status(401).json({erro: "Credenciais inválidas"})
        }
      } else {
        const senhaValida = await bcrypt.compare(login.senha, resposta[0].senha)
        if(!senhaValida){
          return res.status(401).json({erro: "Credenciais inválidas"})
        }
      }
      // dar uma resposta 200(ok) e devolver p token(JWT)
      const infoToken = {
        nome_completo: resposta[0].nome_completo,
        email: resposta[0].email
      }
      const tokenDeAcesso = jwt.sign(infoToken, "senha_secreta", {expiresIn: "1m"})
      return res.status(200).json({token: tokenDeAcesso})
    } catch (erro) {
      return res.status(500).json({erro: "Erro interno na API"})
    }
})

app.get("/clientes/dados", async (req, res)=>{ // ** AUTENTICAR USUÁRIO
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