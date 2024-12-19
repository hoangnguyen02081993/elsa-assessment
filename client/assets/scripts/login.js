function redirectToQuizList() {
    window.location.href = "/index.html";
  }
  

async function login() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value;
    const password = passwordInput.value;

    const res = await fetch(`${baseUrl}/api/v1.0/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.status < 300) {
        alert("Login Successful");
        const resData = await res.json();
        const data = resData.data;
        const accessToken = data.accessToken;
        storeSession(accessToken);
        redirectToQuizList();
    }
    else {
        alert("Invalid credentials");
    }
}