// Page Elements
const loginPage = document.getElementById("login-page");
const quizListPage = document.getElementById("quiz-list-page");
const quizSessionPage = document.getElementById("quiz-session-page");
const leaderboardPage = document.getElementById("leaderboard-page");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const quizListContainer = document.getElementById("quiz-list");
const quizContainer = document.getElementById("quiz-container");
const leaderboardTable = document.querySelector("#leaderboard tbody");

let authToken = ""; // Store token from login

// Mock Backend Endpoints
const API = {
  login: "/api/login",
  quizList: "/api/quizzes",
  leaderboard: "/api/leaderboard",
};

// Mock Data for Demo
const mockQuizzes = [
  { id: 1, title: "Math Quiz" },
  { id: 2, title: "History Quiz" },
];
const mockLeaderboard = [
  { username: "User1", score: 100 },
  { username: "User2", score: 95 },
];

// Functions
function login() {
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Mock login logic
  if (username === "admin" && password === "password") {
    authToken = "mockToken";
    alert("Login Successful");
    redirectToQuizList();
  } else {
    alert("Invalid credentials");
  }
}

function redirectToQuizList() {
  showPage(quizListPage);
  fetchQuizList();
}

function fetchQuizList() {
  quizListContainer.innerHTML = "";
  mockQuizzes.forEach((quiz) => {
    const li = document.createElement("li");
    li.textContent = quiz.title;
    li.onclick = () => redirectToQuizSession(quiz);
    quizListContainer.appendChild(li);
  });
}

function redirectToQuizSession(quiz) {
  showPage(quizSessionPage);
  quizContainer.innerHTML = `<h2>${quiz.title}</h2><p>Quiz content goes here...</p>`;
}

function submitQuiz() {
  alert("Quiz Submitted!");
  redirectToQuizList();
}

function redirectToLeaderboard() {
  showPage(leaderboardPage);
  fetchLeaderboard();
}

function fetchLeaderboard() {
  leaderboardTable.innerHTML = "";
  mockLeaderboard.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${index + 1}</td><td>${entry.username}</td><td>${entry.score}</td>`;
    leaderboardTable.appendChild(row);
  });
}

function showPage(page) {
  [loginPage, quizListPage, quizSessionPage, leaderboardPage].forEach((p) =>
    p.classList.remove("active")
  );
  page.classList.add("active");
}
