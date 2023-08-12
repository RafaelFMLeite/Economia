const questions = [
    {
        question: "Qual é o principal objetivo da política comercial internacional? ",
        answers: [
            { text: " Controlar a oferta de moeda em circulação para evitar inflação.", correct: false, explanation: " Manter a estabilidade dos preços internos de produtos e serviços." },
            { text: " Manter a estabilidade dos preços internos de produtos e serviços.", correct: true, explanation: " Você acertou! Manter a estabilidade dos preços internos de produtos e serviços." },
            { text: " Promover o crescimento econômico através de políticas fiscais expansivas.", correct: false, explanation: " Manter a estabilidade dos preços internos de produtos e serviços." },
            { text: " Facilitar o comércio de bens e serviços entre diferentes países, buscando benefícios mútuos.", correct: false, explanation: " Manter a estabilidade dos preços internos de produtos e serviços." }
        ]
    },
    {
        question: "O que são tarifas e quotas na política comercial?",
        answers: [
            { text: " Medidas para controlar a inflação interna.", correct: false, explanation: " Restrições ou impostos sobre a importação de produtos." },
            { text: " Impostos sobre a exportação de bens.", correct: false, explanation: " Restrições ou impostos sobre a importação de produtos." },
            { text: " Restrições sobre a taxa de câmbio.", correct: false, explanation: " Restrições ou impostos sobre a importação de produtos." },
            { text: " Restrições ou impostos sobre a importação de produtos.", correct: true, explanation: " Você acertou! Restrições ou impostos sobre a importação de produtos." }
        ]
    },
    {

        question: "Como a Organização Mundial do Comércio (OMC) contribui para a política comercial internacional?",
        answers: [
            { text: " Regula as políticas fiscais dos países-membros.", correct: false, explanation: " Estabelece regras para o comércio internacional." },
            { text: " Garante empréstimos a países em desenvolvimento.", correct: false, explanation: " Estabelece regras para o comércio internacional." },
            { text: " Estabelece regras para o comércio internacional.", correct: true, explanation: "Você acertou! Estabelece regras para o comércio internacional." },
            { text: " Controla a oferta de moeda global.", correct: false, explanation: " Estabelece regras para o comércio internacional." }
        ]
    },
    {
        question: "O que é protecionismo na política comercial?",
        answers: [
            { text: " Promoção do livre comércio entre países.", correct: false, explanation: " Uso de tarifas e quotas para proteger a indústria nacional." },
            { text: " Incentivo ao investimento estrangeiro direto.", correct: false, explanation: " Uso de tarifas e quotas para proteger a indústria nacional." },
            { text: " Promoção de exportações sem restrições.", correct: false, explanation: " Uso de tarifas e quotas para proteger a indústria nacional." },
            { text: " Uso de tarifas e quotas para proteger a indústria nacional.", correct: true, explanation: " Você acertou! Uso de tarifas e quotas para proteger a indústria nacional." }
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
