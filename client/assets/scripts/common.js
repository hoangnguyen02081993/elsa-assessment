var baseUrl = 'http://localhost:4001';
var baseWSUrl = 'http://localhost:4005';

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

async function getMe(session) {
    const res = await fetch(`${baseUrl}/api/v1.0/user-scores/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
        }
    });

    if (res.status < 300) {
        const resData = await res.json();
        return resData.data;
    }

    return null;
}

function renderScore(score) {
    const scoreContainer = document.getElementById('user-score');
    if (scoreContainer) {
        scoreContainer.textContent = score;
    }
}

async function initWebSocketAndCommonEvent(session) {
    const socket = io(baseWSUrl, {
        extraHeaders: {
            Authorization: `${session.token}`
        },
        path: '/ws'
    });

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('updateSelfScore', (data) => {
        renderScore(data.score);
    });

    return socket;
}

document.addEventListener('DOMContentLoaded', async function () {
    const session = getSession();
    if (session) {
        const usernameContainer = document.getElementById('user-name');
        if (usernameContainer) {
            usernameContainer.textContent = session.user.profile.username;
        }
        
        const me = await getMe(session);
        renderScore(me.score);
    }
})