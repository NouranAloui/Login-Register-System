let email = document.getElementById("regEmail");
let password = document.getElementById("regPassword");
let emailError = document.getElementById("emailError");
let passError = document.getElementById("passError");
let logRes = document.getElementById("logRes");
let regName = document.getElementById("regName");
let regNameError = document.getElementById("regNameError");

function generateUserId() {
    return "user-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}
function isValidEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.value);
}
async function hashPassword(password) {
    const encoder = new TextEncoder(); // Convert string to bytes
    const data = encoder.encode(password); // Encode the password to a byte array
    const hash = await crypto.subtle.digest("SHA-256", data); // Hash the byte array using SHA-256
    return Array.from(new Uint8Array(hash)) // Convert hashed bytes to hex string
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
}
  
async function registerUser(userName, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || []; // Get existing users or empty array
    const hashedPassword = await hashPassword(password);
  
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      logRes.textContent = "email already taken! Choose another.";
      return;
    }
  
    id= generateUserId();
    userInfo = {id, email, userName}

    users.push({ id, userName, email, password: hashedPassword }); // Add new user
    localStorage.setItem("users", JSON.stringify(users)); // Save updated list
    localStorage.setItem("token", JSON.stringify(userInfo));

    logRes.textContent ="User registered successfully!";
    window.location.href = `https://nouranaloui.github.io/Login-Register-System/profile.html?id=${id}`;
}

async function checkInputs() {
    if (regName.value.length === 0)
    {
        regNameError.textContent = "Please enter a user name";
        return;
    }
    regNameError.textContent = "";
    if (email.value.length === 0)
    {
        emailError.textContent = "Please enter your email";
        return;
    }
    if (!isValidEmail()) {
        emailError.textContent = "❌ Invalid email format!";
        return;
    } 
    emailError.textContent="";
    if (password.value.length === 0)
    {
        passError.textContent = "Please enter your password";
        return;
    }
    passError.textContent="";
        
    await registerUser(regName.value, email.value, password.value);
}