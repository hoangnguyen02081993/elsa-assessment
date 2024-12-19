const submitData = {
    quiz: {},
    answers: {},
}

function chooseOption(questionId, optionId) {
    submitData.answers[questionId] = optionId;
    console.log(answers);
}

function back() {
    storeCurrentQuiz(null);
    window.location.href = "/index.html";
}


async function submitQuiz() {
    if (Object.keys(submitData.answers).length < submitData.quiz.questions.length) {
        alert("Please answer all questions before submitting");
        return;
    }

    const res = await fetch(`${baseUrl}/api/v1.0/quiz-sessions`, {
        method: 'POST',
        body: JSON.stringify({
            quizCode: submitData.quiz.code,
            answers: submitData.answers,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
        }
    })

    if (res.status < 300) {
        alert("Quiz submitted successfully");
        back()
    }
    else {
        alert("Failed to submit quiz");
    }
}

function renderQuestions(quiz) {
    const questions = quiz.questions;
    const questionsContainer = document.getElementById("quiz-container");
    questionsContainer.innerHTML = "";
    questions.forEach((question, index) => {
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");
        questionContainer.innerHTML = `
      <div class="question">${(index + 1)}. ${question.text}</div>
      <div class="options">
        ${question.options.map((option, i) => `
          <div class="option" onclick="chooseOption('${question.id}', '${option.id}')">
            <input type="radio" id="q${index}-o${i}" name="q${index}" value="${option.id}">
            <label for="q${index}-o${i}">${option.text}</label>
          </div>
        `).join('')}
      </div>
    `;
        questionsContainer.appendChild(questionContainer);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const session = getSession();
    if (!session) {
        redirectToLogin();
    }

    const currentQuiz = getCurrentQuiz();
    if (!currentQuiz) {
        redirectToQuizList();
    }

    submitData.quiz = currentQuiz;
    renderQuestions(currentQuiz);
})