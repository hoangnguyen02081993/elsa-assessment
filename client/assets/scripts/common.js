var baseUrl = 'http://localhost:4000';

function getSession() {
    const accessToken = localStorage.getItem('accessToken');
    // Get the user information from the jwt token
    if (accessToken) {
        const payload = accessToken.split('.')[1];
        const data = JSON.parse(atob(payload));
        return {
            user: data,
            token: accessToken
        }
    }
    return null;
}

function storeSession(accessToken) {
    if (!accessToken) {
        localStorage.removeItem('accessToken');
        return;
    }
    
    localStorage.setItem('accessToken', accessToken);
}

function getCurrentQuiz() {
    const quiz = localStorage.getItem('currentQuiz');
    return quiz ? JSON.parse(quiz) : null;
}

function storeCurrentQuiz(quiz) {
    if (!quiz) {
        localStorage.removeItem('currentQuiz');
        return;
    }

    localStorage.setItem('currentQuiz', JSON.stringify(quiz));
}

function redirectToLogin() {
    window.location.href = "/login.html";
}