
// Get the user ID from the URL
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

const user = JSON.parse(localStorage.getItem("token")) || []; // Get users list

// Update the profile page
document.getElementById("username").innerText = user.userName;
document.getElementById("email").innerText = user.email;

function logout()
{
    localStorage.removeItem("token");
    window.location.href = "https://nouranaloui.github.io/Login-Register-System/logIn.html"; // Redirect to login page
}

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to error page if no token exists
        window.location.href = "https://nouranaloui.github.io/Login-Register-System/error.html";
    }
});

