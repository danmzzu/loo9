const form = document.getElementById("contact-form");
const subjectField = document.getElementById("contact-subject");
const messageField = document.getElementById("contact-message");
const submitButton = form.querySelector("button[type='submit']");
const feedbackElement = document.getElementById("contact-result");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const subject = subjectField.value.trim();
    const message = messageField.value.trim();

    if (!subject || !message) {
        displayFeedback("Todos os campos devem ser preenchidos.", "error");
        return;
    }

    // Desabilita os campos e o botão de envio
    toggleFormState(true);
    displayFeedback("Aguarde...");

    try {
        const response = await fetch("https://sendmail-production-286f.up.railway.app/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apikey: "352c42aac430f7ff93734db9bdf828c9",
                port: 587,
                ssl: false,
                smtp: "smtp.gmail.com",
                email: "danmzzu@gmail.com",
                password: "krqq ozuv wwth ouwy",
                from: '"LOO9 - Contato" <danmzzu@gmail.com>',
                to: "danmzzu@gmail.com",
                subject: subject,
                message: message
            })
        });

        const data = await response.json();

        if (response.ok) {
            displayFeedback("Mensagem enviada com sucesso!", "success");
            form.reset(); // Limpa o formulário
        } else {
            displayFeedback(`Erro: ${data.message || "Erro desconhecido."}`, "error");
        }
    } catch (error) {
        displayFeedback("Falha na comunicação com o servidor.", "error");
    }

    // Reabilita os campos e o botão de envio
    toggleFormState(false);
});

function displayFeedback(message, type = "info") {
    feedbackElement.style.display = 'flex';
    feedbackElement.textContent = message;
}

function toggleFormState(disabled) {
    subjectField.disabled = disabled;
    messageField.disabled = disabled;
    submitButton.disabled = disabled;
}
