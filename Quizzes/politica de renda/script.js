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
const resultContainer = document.getElementById("result-container");

let currentQuestionIndex = 0;
let selectedAnswerIndex = -1;
let score = 0;
let questionResults = [];

function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    selectedAnswerIndex = -1;
    score = 0;
    questionResults = [];
    nextButton.innerHTML = "Próximo";
    showQuestions();
}

function showQuestions() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);

        button.addEventListener("click", () => selectAnswer(index));
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answerIndex) {
    selectedAnswerIndex = answerIndex;

    Array.from(answerButtonsElement.children).forEach((button, index) => {
        button.classList.remove("selected");
        if (index === selectedAnswerIndex) {
            button.classList.add("selected");
        }
    });

    nextButton.style.display = "block";

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerHTML = "Finalizar";
    }
}

nextButton.addEventListener("click", () => {
    if (selectedAnswerIndex !== -1) {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedAnswer = currentQuestion.answers[selectedAnswerIndex];
        if (selectedAnswer.correct) {
            score++;
        }
        questionResults.push({
            question: currentQuestion.question,
            selectedAnswer: selectedAnswer.text,
            isCorrect: selectedAnswer.correct,
            explanation: selectedAnswer.explanation,
        });
    }

    selectedAnswerIndex = -1;
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        finishQuiz();
    } else {
        showQuestions();
    }
});

function finishQuiz() {
    questionElement.innerHTML = "Você terminou o quiz!";
    answerButtonsElement.innerHTML = `Acertos: ${score} de ${questions.length}`;
    nextButton.style.display = "none";

    questionResults.forEach((result, index) => {
        const questionNumber = index + 1;
        const resultText = result.isCorrect ? "Correta" : "Incorreta";

        const questionResult = document.createElement("p");
        questionResult.innerHTML = `
            <strong>Pergunta ${questionNumber}:</strong> ${result.question}<br>
            <strong>Alternativa selecionada:</strong> ${result.selectedAnswer} (${resultText})<br>
            <strong>Explicação:</strong> ${result.explanation}<br><br>
        `;

        resultContainer.appendChild(questionResult);
    });

    const restartButton = document.createElement("button");
    restartButton.innerHTML = "Reiniciar Quiz";
    restartButton.classList.add("btn", "restart-btn");
    restartButton.addEventListener("click", restartQuiz);

    resultContainer.appendChild(restartButton);
}

function restartQuiz() {
    resultContainer.innerHTML = "";
    startQuiz();
}

startQuiz();