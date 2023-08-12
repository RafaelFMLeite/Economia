const questions = [
    {
        question: "O que a política de rendas visa controlar? ",
        answers: [
            { text: " Taxas de juros e oferta de moeda.", correct: false, explanation: " Salários e rendimentos dos trabalhadores e empresas." },
            { text: " Gastos do governo e arrecadação de impostos.", correct: false, explanation: " Salários e rendimentos dos trabalhadores e empresas." },
            { text: " Salários e rendimentos dos trabalhadores e empresas.", correct: true, explanation: " Você acertou! Salários e rendimentos dos trabalhadores e empresas." },
            { text: " Taxas de câmbio e balança comercial.", correct: false, explanation: " Salários e rendimentos dos trabalhadores e empresas." }
        ]
    },
    {
        question: "Como a política de rendas pode impactar a economia?",
        answers: [
            { text: " Aumentando os impostos para os mais ricos.", correct: true, explanation: " Você acertou! Aumentando os impostos para os mais ricos." },
            { text: " Incentivando a inflação através de altos salários.", correct: false, explanation: " Aumentando os impostos para os mais ricos." },
            { text: " Mantendo os salários baixos para controlar a demanda.", correct: false, explanation: " Aumentando os impostos para os mais ricos." },
            { text: " Reduzindo os gastos públicos para aumentar a demanda agregada.", correct: false, explanation: " Aumentando os impostos para os mais ricos." }
        ]
    },
    {

        question: "O que é indexação salarial?",
        answers: [
            { text: " Um sistema que permite que os salários acompanhem automaticamente a inflação.", correct: true, explanation: " Você acertou! Um sistema que permite que os salários acompanhem automaticamente a inflação." },
            { text: " A fixação de salários mínimos e máximos pelo governo.", correct: false, explanation: " Um sistema que permite que os salários acompanhem automaticamente a inflação." },
            { text: " Um método para controle das taxas de câmbio.", correct: false, explanation: " Um sistema que permite que os salários acompanhem automaticamente a inflação." },
            { text: " Um sistema de regulação das taxas de juros.", correct: false, explanation: " Um sistema que permite que os salários acompanhem automaticamente a inflação." }
        ]
    },
    {
        question: "Qual é o objetivo da política de rendas em relação à inflação?",
        answers: [
            { text: " Aumentar os salários para estimular o consumo.", correct: false, explanation: " Manter os salários estáveis para evitar inflação." },
            { text: " Manter os salários estáveis para evitar inflação.", correct: true, explanation: " Você acertou! Manter os salários estáveis para evitar inflação." },
            { text: " Reduzir os impostos sobre a renda para estimular o investimento.", correct: false, explanation: " Manter os salários estáveis para evitar inflação." },
            { text: " Controlar a inflação através do controle das exportações.", correct: false, explanation: " Manter os salários estáveis para evitar inflação." }
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
