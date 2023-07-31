// document.addEventListener("DOMContentLoaded", function () {
//   const loginButton = document.querySelector(".loginButton");
//   loginButton.addEventListener("click",async ()=>{
    
//   await handleLogin()
    


//   fetch(`http://127.0.0.1:8000/api/users/74`)
//     .then((response) =>{
//       console.log(response)
//       return response.json()
//     })
//     .then((data) => {
//       console.log("User Data:", data);

//       // Assuming that the user type is available in the 'type' property of the response data
//       const userType = data.data.type;

//       // Store the user type in local storage
//       localStorage.setItem("userType", userType);

//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });

//     window.location.href = 'landingPage.html'



//   });
// });

// const handleLogin =async ()=>{
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   const loginData = {
//       email: email,
//       password: password,
//   };
//   try {
//     console.log(loginData)
//     const response = await fetch("http://127.0.0.1:8000/api/login", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//           "Accept"  : "application/json"
//       },
//       body: JSON.stringify(loginData),
//   })

 
//   const data = await response.json()
//  console.log(data)
//   if(data.authorization){
//     console.log(11)
//     localStorage.setItem("token" ,data.authorization.token)
//     console.log(12)
//   }
//   console.log(data)
//   } catch (error) {
//     console.log(error)
//   }
  
  
// }

// function displayErrorMessage(message) {
//   const errorDiv = document.getElementById("error-message");
//   errorDiv.textContent = message;
// }
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".loginButton");
  loginButton.addEventListener("click", async () => {
    try {
      await handleLogin();
      window.location.href = 'landingPage.html';
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

async function handleLogin() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value;
  const password = passwordInput.value;

  const loginData = {
    email: email,
    password: password,
  };

  try {
    console.log(loginData);
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    console.log(data);

    if (data.authorization) {
      console.log(11);
      localStorage.setItem("token", data.authorization.token);
      localStorage.setItem("userType", data.authorization.user.type); // Store the user type directly from the response
      localStorage.setItem("userId", data.authorization.user.id); // Store the user type directly from the response
      console.log(12);
    }
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error so it can be caught in the click event listener
  }
}

function displayErrorMessage(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = message;
}


