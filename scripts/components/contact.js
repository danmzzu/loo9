const form = document.getElementById("contact-form");
const subjectField = document.getElementById("contact-subject");
const messageField = document.getElementById("contact-message");
const feedbackElement = document.getElementById("feedback"); // Um elemento para exibir feedback para o usuário.

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    // Limpar mensagens anteriores
    feedbackElement.textContent = "";
    
    // Verificar se os campos estão preenchidos
    if (subjectField.value.trim() === "" || messageField.value.trim() === "") {
        feedbackElement.textContent = "Falha: Todos os campos devem ser preenchidos.";
        feedbackElement.style.color = "red";
        return;
    }
    
    // Dados para envio, use variáveis de ambiente para as credenciais em produção
    const data = {
        apikey: process.env.API_KEY, // Exemplo usando variável de ambiente
        port: 587,
        ssl: false,
        smtp: "smtp.gmail.com",
        email: "danmzzu@gmail.com",
        password: process.env.SMTP_PASSWORD, // Exemplo usando variável de ambiente
        from: '"LOO9 - Contato" <danmzzu@gmail.com>',
        to: "danmzzu@gmail.com",
        subject: subjectField.value,
        message: messageField.value
    };

    // Enviar email
    try {
        const response = await fetch("https://sendmail-production-286f.up.railway.app/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Feedback com base na resposta
        if (response.ok) {
            feedbackElement.textContent = "Mensagem enviada com sucesso!";
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.textContent = `Falha: ${result.message || 'Erro desconhecido'}`;
            feedbackElement.style.color = "red";
        }
    } catch (error) {
        // Em caso de falha na requisição
        console.error("Erro ao enviar email:", error);
        feedbackElement.textContent = "Erro ao enviar a mensagem. Tente novamente mais tarde.";
        feedbackElement.style.color = "red";
    }
});
