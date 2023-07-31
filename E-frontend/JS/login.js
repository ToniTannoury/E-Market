document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".loginButton");
  loginButton.addEventListener("click", ()=>{
    
    handleLogin()
    
function decodeJWT(token) {
  try {
    const decodedToken = token;
    console.log(decodedToken)
    return decodedToken;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}
const token = localStorage.getItem("token")
const decodedToken = decodeJWT(token);

if (decodedToken) {
  const userId = decodedToken.sub;
  const url = `http://127.0.0.1:8000/api/users/68`;

  fetch(url, {
    headers: {
     "Accept":"application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User Data:", data);

      // Assuming that the user type is available in the 'type' property of the response data
      const userType = data.data.type;

      // Store the user type in local storage
      localStorage.setItem("userType", userType);
      window.location.href = 'landingPage.html'

    })
    .catch((error) => {
      console.error("Error:", error);
    });
} else {
  console.log("Invalid JWT token");
}

  });
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
          "Accept"  : "application/json"
      },
      body: JSON.stringify(loginData),
  })

 
  const data = await response.json()
 
  if(data.authorization){
    console.log(11)
    localStorage.setItem("token" ,data.authorization.token)
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
