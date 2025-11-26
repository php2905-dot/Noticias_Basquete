document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('cadastroForm');

    const nomeInput = document.getElementById('nome');
    const idadeInput = document.getElementById('idade');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const senhaInput = document.getElementById('senha');
    const conheceuInput = document.getElementById('conheceu');
    const textarea = document.getElementById('observacoes');
    const charCount = document.getElementById('charCount');
    const ratingSlider = document.getElementById('rating');
    const mensagemSucesso = document.getElementById('mensagemSucesso');

    // --- CONTADOR DE CARACTERES ---
    if (textarea && charCount) {
        textarea.addEventListener('input', () => {
            charCount.textContent = `${textarea.value.length}/300 caracteres`;
        });
    }

    // --- SALVAR CADASTRO ---
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!form.checkValidity()) {
                alert("⚠️ Preencha todos os campos corretamente.");
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Criar objeto usuário
            const novoUsuario = {
                nome: nomeInput.value,
                idade: idadeInput.value,
                cpf: cpfInput.value,
                email: emailInput.value,
                username: usernameInput.value,
                senha: senhaInput.value,
                conheceu: conheceuInput.value,
                observacoes: textarea.value,
                rating: ratingSlider.value
            };

            // Salvar no array
            usuarios.push(novoUsuario);

            // Atualizar localStorage
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            // Definir usuário logado
            localStorage.setItem("currentUser", novoUsuario.username);

            // Mostrar mensagem de sucesso
            mensagemSucesso.style.display = "block";

            // Limpar formulário
            form.reset();
            charCount.textContent = "0/300 caracteres";

            // Redirecionar após 2 segundos
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        });
    }
});
