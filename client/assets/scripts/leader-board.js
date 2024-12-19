async function fetchLeaderBoard(session) {
    const res = await fetch(`${baseUrl}/api/v1.0/leader-board`, {
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
    const leaderBoardContainer = document.getElementById("leader-board");
    leaderBoardContainer.innerHTML = "";
    data.forEach((user, index) => {
        const userContainer = document.createElement("div");
        userContainer.classList.add("user-container");
        userContainer.innerHTML = `
      <div class="rank">${index + 1}</div>
      <div class="username">${user.username}</div>
      <div class="score">${user.score}</div>
    `;
        leaderBoardContainer.appendChild(userContainer);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const session = getSession();
    if (!session) {
        redirectToLogin();
    }
  
    const data = await fetchLeaderBoard(session);
    renderLeaderBoard(data);
})