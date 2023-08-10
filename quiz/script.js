const questions = [
    {
        question: "Bla bla bla",
        answers: [
            { text: "Bla bla", correct: false, explanation: "Explicação da resposta correta" },
            { text: "Bla bla", correct: true, explanation: "Explicação da resposta incorreta" },
            { text: "Bla bla", correct: false, explanation: "Explicação da resposta correta" },
            { text: "Bla bla", correct: false, explanation: "Explicação da resposta correta" }
        ]
    },
    // Resto das perguntas...
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
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
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
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
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

function finishQuiz() {
    questionElement.innerHTML = "Você terminou o quiz!";
    answerButtonsElement.innerHTML = `Acertos: ${score} de ${questions.length}`;
    nextButton.style.display = "none";

    explanationContainer.innerHTML = "";
    resultContainer.innerHTML = "";

    questions.forEach((question, index) => {
        const questionNumber = index + 1;
        const selectedAnswer = question.answers.find(answer => answer.correct);
        const explanation = selectedAnswer.explanation;

        const questionResult = document.createElement("p");
        questionResult.innerHTML = `<strong>Pergunta ${questionNumber}:</strong> ${question.question}<br><strong>Explicação:</strong> ${explanation}`;

        resultContainer.appendChild(questionResult);
    });
}

startQuiz();
