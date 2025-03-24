const form = document.getElementById("contact-form");
const subjectField = document.getElementById("contact-subject");
const messageField = document.getElementById("contact-message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (subjectField.value.trim() === "" || messageField.value.trim() === "") {
        console.log("Falha: Todos os campos devem ser preenchidos.");
    } else {
        const sendmail = async () => {
            const response = await fetch("https://sendmail-production-286f.up.railway.app/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    apikey: "352c42aac430f7ff93734db9bdf828c9",
                    port: 587,
                    ssl: false,
                    smtp: "smtp.gmail.com",
                    email: "danmzzu@gmail.com",
                    password: "krqq ozuv wwth ouwy",
                    from: '"LOO9 - Contato" <danmzzu@gmail.com>',
                    to: "danmzzu@gmail.com",
                    subject: subjectField.value,
                    message: messageField.value
                })
            });
        
            const data = await response.json();
            console.log("Status:", data.status);
            console.log("Message:", data.message);
        };
        
        sendmail();
    }
});