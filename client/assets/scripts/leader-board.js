async function fetchLeaderBoard(session) {
    const res = await fetch(`${baseUrl}/api/v1.0/user-scores/leaderboard`, {
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
    else {
        alert("Failed to fetch leader board");
    }

    return null;
}

function renderLeaderBoard(data) {
    const leaderBoardContainer = document.getElementById("leader-board-container");
    leaderBoardContainer.innerHTML = "";
    data.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.user.username}</td>
        <td>${item.score}</td>
    `;
        leaderBoardContainer.appendChild(tr);
    });
}

function informDataChanged(data) {
    const changedData = data.changedData
    const leaderBoardData = data.data;
    const index = leaderBoardData.findIndex(item => item.userId === changedData.userId);
    if (index === -1) {
        return;
    }

    rank = index + 1;
    const userData = leaderBoardData[index];
    const message = `<b>[${dayjs().format('HH:mm:ss DD-MM-YYYY')}]</b> User <b>${userData.user.username}</b> has scored <b>${userData.score}</b> and is now at rank <b>${rank}</b>`;
    document.getElementById("recent-message").innerHTML = message;
}

function redirectToQuizList() {
    window.location.href = '/index.html';
}

document.addEventListener("DOMContentLoaded", async () => {
    const session = getSession();
    if (!session) {
        redirectToLogin();
    }

    const socket = await initWebSocketAndCommonEvent(session);
    socket.on('updateLeaderBoard', (data) => {
        informDataChanged(data);
        renderLeaderBoard(data.data);
    });
    const data = await fetchLeaderBoard(session);
    renderLeaderBoard(data);
})