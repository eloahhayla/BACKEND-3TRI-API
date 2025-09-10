const form = document.getElementById("form-cliente")
const btnEnviar = document.getElementById("btn-enviar")

form.addEventListener("submit", async (event)=>{
    event.preventDefault() // evita recarregar a página antes de enviar os dados
    // pegar dados do formulário
    const dados = pegarDadosCliente();
    // enviar dados para a API
    try {
        const resposta = await fetch("http://localhost:3002/cadastrar", 
        {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(dados)
            }
        )
        if (!resposta.ok) {
            throw new Error("Erro na API")
        }
        mostrarToast("Cadastro enviado com sucesso!", true);
        form.reset()
    } catch {
        mostrarToast("Erro ao enviar cadastro", false);
    }
})

function pegarDadosCliente(){
    let cliente = new Object()
    cliente.nome_completo = document.getElementById("nome_completo").value;
    cliente.cpf = document.getElementById("cpf").value;
    cliente.estado = document.getElementById("estado").value;
    cliente.cidade = document.getElementById("cidade").value;
    cliente.bairro = document.getElementById("bairro").value;
    cliente.n_casa = document.getElementById("numero").value;
    cliente.rua = document.getElementById("rua").value;
    cliente.cep = document.getElementById("cep").value;
    cliente.email = document.getElementById("email").value;
    cliente.telefone = document.getElementById("telefone").value;
    cliente.senha = document.getElementById("senha").value;
    return cliente;
}