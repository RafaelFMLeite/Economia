const questions = [
    {
        question: "O que a política monetária se concentra principalmente em regular?",
        answers: [
            { text: "Gastos do governo.", correct: false, explanation: "Taxas de juros e oferta de moeda." },
            { text: "Taxas de câmbio.", correct: false, explanation: "Taxas de juros e oferta de moeda." },
            { text: "Taxas de juros e oferta de moeda.", correct: true, explanation: "Taxas de juros e oferta de moeda." },
            { text: "Níveis de desemprego.", correct: false, explanation: "Taxas de juros e oferta de moeda." }
        ]
    },
    {
        question: "Como as taxas de juros influenciam a política monetária?",
        answers: [
            { text: "Não têm impacto na política monetária.", correct: false, explanation: "As taxas de juros não têm relação com a oferta de moeda." },
            { text: "Baixas taxas de juros estimulam o investimento e o consumo.", correct: false, explanation: "As taxas de juros não têm relação com a oferta de moeda." },
            { text: "Altas taxas de juros reduzem a oferta de moeda.", correct: false, explanation: "As taxas de juros não têm relação com a oferta de moeda." },
            { text: "As taxas de juros não têm relação com a oferta de moeda.", correct: true, explanation: "As taxas de juros não têm relação com a oferta de moeda." }
        ]
    },
    {
        question: "Qual é o instrumento mais comum utilizado pela política monetária? ",
        answers: [
            { text: "Gastos públicos.", correct: false, explanation: "Impostos." },
            { text: "Impostos.", correct: true, explanation: "Impostos." },
            { text: "Regulação de importações e exportações.", correct: false, explanation: "Impostos." },
            { text: "Controle das taxas de juros.", correct: false, explanation: "Impostos." }
        ]
    },
    {
        question: "Qual das seguintes afirmações é verdadeira sobre a política monetária?",
        answers: [
            { text: "Trata das políticas comerciais entre diferentes países para promover o comércio internacional.", correct: false, explanation: "Envolve a regulação da oferta de moeda e das taxas de juros para alcançar objetivos econômicos." },
            { text: "Envolve a regulação da oferta de moeda e das taxas de juros para alcançar objetivos econômicos.", correct: true, explanation: "Envolve a regulação da oferta de moeda e das taxas de juros para alcançar objetivos econômicos." },
            { text: "Refere-se às decisões do governo sobre os salários mínimos e máximos permitidos.", correct: false, explanation: "Envolve a regulação da oferta de moeda e das taxas de juros para alcançar objetivos econômicos." },
            { text: "Foca na promoção do crescimento econômico através do investimento estrangeiro direto.", correct: false, explanation: "Envolve a regulação da oferta de moeda e das taxas de juros para alcançar objetivos econômicos." }
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
