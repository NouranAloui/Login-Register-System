let email = document.getElementById("loginEmail");
let password = document.getElementById("loginPassword");
let emailError = document.getElementById("emailError");
let passError = document.getElementById("passError");
let logRes = document.getElementById("logRes");


async function validateLogin(inputEmail, inputPassword) {
    const users = JSON.parse(localStorage.getItem("users")) || []; // Get users list
    const hashedInputPassword = await hashPassword(inputPassword);
  
    const user = users.find(user => user.email === inputEmail); // Find matching user
  
    if (!user) {
      logRes.textContent ="User not found! Please register first.";
      console.log(logRes.textContent);
      return false;
    }
  
    if (user.password === hashedInputPassword) {

        const userInfo = { id: user.id, email: user.email, userName: user.userName }; 

        logRes.textContent = "Login successful!";
        localStorage.setItem("token", JSON.stringify(userInfo));
        console.log("Token")

        window.location.href = `https://nouranaloui.github.io/Login-Register-System/profile.html?id=${user.id}`;
        return true;
    } else {
      logRes.textContent ="Invalid credentials! Try again.";
      return false;
    }
}

async function hashPassword(password) {
    const encoder = new TextEncoder(); // Convert string to bytes
    const data = encoder.encode(password); // Encode the password to a byte array
    const hash = await crypto.subtle.digest("SHA-256", data); // Hash the byte array using SHA-256
    return Array.from(new Uint8Array(hash)) // Convert hashed bytes to hex string
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
}
  
function isValidEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.value);
}

function checkEmailBlur() {
    if (email.value.length === 0)
    {
        emailError.textContent = "Please enter your email";
        return;
    }
    if (!isValidEmail()) {
        emailError.textContent = "❌ Invalid email format!";
    } else {
        emailError.textContent = "";
    }
}

async function checkInputs() {
    if (email.value.length === 0 || !isValidEmail())
        {
            if(emailError.textContent === "")
                emailError.textContent = "Please enter your email";
            return;
        }
    if (password.value.length === 0)
        {
            passError.textContent = "Please enter your password";
            return;
        }
        passError.textContent="";
        emailError.textContent="";
    await validateLogin(email.value, password.value);
}

function goToReg()
{
    window.location.href = "https://nouranaloui.github.io/Login-Register-System/Registration.html";
}