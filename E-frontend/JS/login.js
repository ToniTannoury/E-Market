document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".loginButton");
  loginButton.addEventListener("click", handleLogin);
});

const handleLogin =async ()=>{
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value;
  const password = passwordInput.value;

  const loginData = {
      email: email,
      password: password,
  };
  try {
    console.log(loginData)
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept"  : "applicatoin/json"
      },
      body: JSON.stringify(loginData),
  })

  console.log(response)
  const data = await response.json()
  console.log(data.authorization)
  if(data.authorization){
    console.log(11)
    localStorage.setItem("token" , data.authorization.token)
    window.location.href = 'landingPage.html'
    console.log(12)
  }
  console.log(data)
  } catch (error) {
    console.log(error)
  }
  
  
}

function displayErrorMessage(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = message;
}