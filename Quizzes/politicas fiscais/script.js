const questions = [
    {
        question: "Qual é o foco principal da política fiscal em um país? ",
        answers: [
            { text: "Regulação das taxas de juros.", correct: false, explanation: " Controle da oferta de moeda." },
            { text: "Controle da oferta de moeda.", correct: true, explanation: " Você acertou! Controle da oferta de moeda." },
            { text: "Influência nos gastos e receitas do governo.", correct: false, explanation: " Controle da oferta de moeda." },
            { text: "Fixação da taxa de câmbio.", correct: false, explanation: " Controle da oferta de moeda." }
        ]
    },
    {
        question: "O que é um déficit fiscal?",
        answers: [
            { text: " Um excesso de receitas governamentais sobre os gastos.", correct: false, explanation: " Quando os gastos do governo excedem as receitas." },
            { text: " Uma situação em que o governo não arrecada impostos", correct: false, explanation: " Quando os gastos do governo excedem as receitas." },
            { text: " Quando os gastos do governo excedem as receitas.", correct: true, explanation: " Você acertou! Quando os gastos do governo excedem as receitas." },
            { text: " Um superávit comercial resultante de políticas de exportação.", correct: false, explanation: " Quando os gastos do governo excedem as receitas." }
        ]
    },
    {

        question: "Como a política fiscal pode influenciar a distribuição de renda?",
        answers: [
            { text: " Não tem impacto na distribuição de renda.", correct: false, explanation: " Aumentando os impostos para os mais ricos, reduzindo desigualdades." },
            { text: " Pode aumentar a inflação, mas não afeta a distribuição.", correct: false, explanation: " Aumentando os impostos para os mais ricos, reduzindo desigualdades." },
            { text: " Aumentando os impostos para os mais ricos, reduzindo desigualdades.", correct: true, explanation: "Você acertou! Aumentando os impostos para os mais ricos, reduzindo desigualdades." },
            { text: " Reduzindo os salários para controlar a demanda agregada.", correct: false, explanation: " Aumentando os impostos para os mais ricos, reduzindo desigualdades." }
        ]
    },
    {
        question: "Qual das seguintes opções melhor define a política fiscal?",
        answers: [
            { text: " Regulação da oferta monetária para controlar a inflação.", correct: false, explanation: " Decisões sobre gastos e arrecadações do governo para influenciar a economia." },
            { text: " Decisões sobre gastos e arrecadações do governo para influenciar a economia.", correct: true, explanation: "Você acertou! Decisões sobre gastos e arrecadações do governo para influenciar a economia." },
            { text: " Intervenções no mercado cambial para regular a taxa de câmbio.", correct: false, explanation: " Decisões sobre gastos e arrecadações do governo para influenciar a economia." },
            { text: " Restrições comerciais para proteger a indústria nacional.", correct: false, explanation: " Decisões sobre gastos e arrecadações do governo para influenciar a economia." }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");
const explanationContainer = document.getElementById("explanation-container");
const resultContainer = document.getElementById("result-container");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próximo";
    showQuestions();
}

function showQuestions() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button === selectedButton) {
            if (isCorrect) {
                button.classList.add("correct");
                score++;
            } else {
                button.classList.add("incorrect");
            }
        }
    });

    nextButton.style.display = "block";

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerHTML = "Finalizar";
    }
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        finishQuiz();
    } else {
        showQuestions();
    }
});

function restartQuiz() {
    explanationContainer.innerHTML = "";
    resultContainer.innerHTML = "";
    startQuiz();
}

function finishQuiz() {
    questionElement.innerHTML = "Você terminou o quiz!";
    answerButtonsElement.innerHTML = `Acertos: ${score} de ${questions.length}`;
    nextButton.style.display = "none";

    const restartButton = document.createElement("button");
    restartButton.innerHTML = "Reiniciar Quiz";
    restartButton.classList.add("btn", "restart-btn");
    restartButton.addEventListener("click", restartQuiz);

    resultContainer.innerHTML = "";
    resultContainer.appendChild(restartButton);

    questions.forEach((question, index) => {
        const questionNumber = index + 1;
        const selectedAnswer = question.answers.find(answer => answer.correct);
        const explanation = selectedAnswer.explanation;

        const questionResult = document.createElement("p");
        questionResult.innerHTML = `<strong>Pergunta ${questionNumber}:</strong> ${question.question}<br><strong>Alternativa correta:</strong> ${explanation}<br><br>`;

        resultContainer.appendChild(questionResult);
    });
}

startQuiz();
