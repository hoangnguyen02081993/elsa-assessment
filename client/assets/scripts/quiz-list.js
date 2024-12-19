async function fetchQuizList(session) {
    const res = await fetch(`${baseUrl}/api/v1.0/quizzes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
        }
    })

    if (res.status < 300) {
        const resData = await res.json();
        return resData.data;
    }
    else {
        alert("Failed to fetch quizzes");
    }

    return null;
}

function renderQuizList(quizzes) {
    const quizListContainer = document.getElementById("quiz-list");
    quizListContainer.innerHTML = "";
    quizzes.forEach((quiz) => {
        const quizContainer = document.createElement("div");
        quizContainer.classList.add("quiz-container");
        quizContainer.textContent = quiz.name;
        quizContainer.onclick = () => redirectToQuizSession(quiz);
        quizListContainer.appendChild(quizContainer);
    });
}

function redirectToQuizSession(quiz) {
    storeCurrentQuiz(quiz);
    window.location.href = `/quiz-session.html`;
}

function redirectToLeaderboard() {
    window.location.href = "/leader-board.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    const session = getSession();
    if (!session) {
        redirectToLogin();
    }

    const quizzes = await fetchQuizList(session);
    quizzes && renderQuizList(quizzes);
})