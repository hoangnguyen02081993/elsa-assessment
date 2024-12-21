async function fetchQuizList(session) {
    const res = await fetch(`${baseUrl}/api/v1.0/quizzes?includeProfile=true`, {
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
        const isCompleted = quiz.profile?.isCompleted
        const quizContainer = document.createElement("div");
        quizContainer.classList.add("quiz-container");
        quizContainer.innerHTML = `<h3>${quiz.name}</h3> <div>${isCompleted ? `(completed with ${quiz.profile.score} points)` : ''}</div>`;
        quizContainer.onclick = () => redirectToQuizSession(quiz);
        quizListContainer.appendChild(quizContainer);
    });
}

function redirectToQuizSession(quiz) {
    const isCompleted = quiz.profile?.isCompleted;
    if (isCompleted) {
        alert("You have already completed this quiz");
        return;
    }

    storeCurrentQuiz(quiz);
    window.location.href = `/quiz-session.html`;
}

function redirectToLeaderboard() {
    window.location.href = "/leader-board.html";
}

function logout() {
    storeSession(null);
    redirectToLogin();
}

document.addEventListener("DOMContentLoaded", async () => {
    const session = getSession();
    if (!session) {
        redirectToLogin();
    }

    initWebSocketAndCommonEvent(session);

    const quizzes = await fetchQuizList(session);
    quizzes && renderQuizList(quizzes);
})