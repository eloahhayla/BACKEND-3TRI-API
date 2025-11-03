const form = document.getElementById("form-login")
const btn = document.getElementById(btn-login)

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.value = "Entrando...";

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const dados = {
        email: email,
        senha: senha
    }
    try {
        const resposta = await fetch("http://localhost:3002/login", 
        {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(dados)
            }
        )
        if (!resposta.ok) {
            throw new Error("Erro na API")
        }
        mostrarToast("Login feito com sucesso!", true);
        form.reset()
    } catch {
        mostrarToast("Erro ao fazer login", false);
    }
})