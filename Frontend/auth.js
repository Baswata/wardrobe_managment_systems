const API_URL = "http://localhost:5000/api/auth";

// ✅ Register User
async function register() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    let data = await response.json();
    alert(data.message);
}

// ✅ Login User
async function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    let data = await response.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert(data.error);
    }
}

// ✅ Check User Authentication
async function getUserData() {
    let token = localStorage.getItem("token");

    let response = await fetch(`${API_URL}/me`, {
        headers: { Authorization: token }
    });

    let data = await response.json();
    if (data.user) {
        alert(`Welcome ${data.user.email}`);
    } else {
        alert("Please log in");
        window.location.href = "login.html";
    }
}
