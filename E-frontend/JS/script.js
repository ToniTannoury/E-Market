
document.addEventListener('DOMContentLoaded', () => {
  const registrationButton = document.querySelector('.registerButton');
  console.log(registrationButton)
  registrationButton.addEventListener('click', async () => {
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const phoneNumber = document.getElementById('phoneNumber').value;

      const formData = {
          name: fullName,
          email: email,
          password: password,
          phone_number: +phoneNumber,
          type:"C"
      };
      try {
        const apple = await fetch("http://127.0.0.1:8000/api/register" , {
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        name:fullName,
        email,
        password,
        phone_number: +phoneNumber,
        type:"C",
        
    })
    })
    console.log(apple)
    const data = await apple.json()
   
    if(data.user){
      console.log(22)
      window.location.href = "login.html"
    }
        
      } catch (error) {
        console.log(error)
      }
     
      // try {
      //   const response = await fetch("http://127.0.01:8000/api/register" , {
      //     method:"POST",
      //     headers:{
      //       "Accept" : "application/json"
      //     },
      //     body:formData
      //   })
        
      //     const data = await response.json();
      //     console.log(data);

      //     if (response.ok) {
      //         // Registration successful, redirect to login page or do something else
      //         window.location.href = 'login.html';
      //     } else {
      //         // Display error messages
      //         displayValidationErrors(data.errors);
      //     }
      // } catch (error) {
      //     console.error('Error:', error);
      // }
  });

  // function displayValidationErrors(errors) {
  //     const errorElements = document.getElementsByClassName('validation-message');
  //     for (const field in errors) {
  //         const errorMessage = errors[field][0];
  //         const errorElement = document.getElementById(`${field}Error`);
  //         errorElement.textContent = errorMessage;
  //     }
  // }
});


