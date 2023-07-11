const questions = [
    {
        question: "Bla bla bla",
        answers: [
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: true },
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: false }
        ]
    },
    {
        question: "Bla bla bla",
        answers: [
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: true },
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: false }
        ]
    },
    {
        question: "Bla bla bla",
        answers: [
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: true },
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: false }
        ]
    },
    {
        question: "Bla bla bla",
        answers: [
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: true },
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: false }
        ]
    },
    {
        question: "Bla bla bla",
        answers: [
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: true },
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: false }
        ]
    },
    {
        question: "Bla bla bla",
        answers: [
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: true },
            { text: "Bla bla", correct: false },
            { text: "Bla bla", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

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
        resetState();
        showQuestions();
    }
});

function finishQuiz() {
    questionElement.innerHTML = "Você terminou o quiz!";
    answerButtonsElement.innerHTML = `Acertos: ${score} de ${questions.length}`;
    nextButton.style.display = "none";
}

startQuiz();
