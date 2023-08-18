const questions = [
    {
        question: "Qual é o principal objetivo da política cambial? ",
        answers: [
            { text: " Regular a oferta de moeda no mercado.", correct: false, explanation: " Controlar as taxas de câmbio entre diferentes moedas." },
            { text: " Manter as taxas de juros estáveis.", correct: false, explanation: " Controlar as taxas de câmbio entre diferentes moedas." },
            { text: " Controlar as taxas de câmbio entre diferentes moedas.", correct: true, explanation: " Você acertou! Controlar as taxas de câmbio entre diferentes moedas." },
            { text: " Aumentar os salários dos trabalhadores.", correct: false, explanation: " Controlar as taxas de câmbio entre diferentes moedas." }
        ]
    },
    {
        question: "Como uma taxa de câmbio fixa difere de uma taxa de câmbio flutuante?",
        answers: [
            { text: " Uma taxa fixa é determinada pelo mercado, enquanto uma flutuante é definida pelo governo.", correct: false, explanation: " Uma taxa fixa permanece constante, enquanto uma flutuante pode variar com base em demanda e oferta." },
            { text: " Uma taxa fixa permanece constante, enquanto uma flutuante pode variar com base em demanda e oferta.", correct: true, explanation: " Você acertou! Uma taxa fixa permanece constante, enquanto uma flutuante pode variar com base em demanda e oferta." },
            { text: " Uma taxa fixa varia diariamente, enquanto uma flutuante permanece estável.", correct: false, explanation: " Uma taxa fixa permanece constante, enquanto uma flutuante pode variar com base em demanda e oferta." },
            { text: " Não há diferença entre as duas, ambas são idênticas.", correct: false, explanation: " Uma taxa fixa permanece constante, enquanto uma flutuante pode variar com base em demanda e oferta." }
        ]
    },
    {

        question: "O que é uma desvalorização cambial?",
        answers: [
            { text: " Um aumento no valor da moeda nacional em relação a outras moedas.", correct: false, explanation: " Uma redução nas reservas internacionais do país." },
            { text: " Uma redução nas reservas internacionais do país.", correct: false, explanation: " Uma redução nas reservas internacionais do país." },
            { text: " Uma diminuição no valor da moeda nacional em relação a outras moedas.", correct: true, explanation: "Você acertou! Uma redução nas reservas internacionais do país." },
            { text: " Um aumento nas exportações sem afetar as importações.", correct: false, explanation: " Uma redução nas reservas internacionais do país." }
        ]
    },
    {
        question: "Qual é o impacto esperado de uma desvalorização da moeda nacional na balança comercial?",
        answers: [
            { text: " Aumento das importações e redução das exportações.", correct: true, explanation: " Você acertou! Aumento das importações e redução das exportações." },
            { text: " Aumento das exportações e redução das importações.", correct: false, explanation: "Aumento das importações e redução das exportações." },
            { text: " Aumento tanto das exportações quanto das importações.", correct: false, explanation: " Aumento das importações e redução das exportações." },
            { text: " Não há impacto na balança comercial.", correct: false, explanation: " Aumento das importações e redução das exportações." }
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