document.addEventListener("DOMContentLoaded", () => {
  console.log(1)
  const button = document.querySelector(".button");
  button.addEventListener('click', async() => {
    const name = document.querySelector(".name").value
    const email = document.querySelector(".email").value
    const password = document.querySelector(".password").value
    const phone_number = document.querySelector(".phone_number").value
    console.log({
      email,
      password,
      phone_number:+phone_number,
      type:"C",
      name
  })
    const apple = await fetch("http://127.0.0.1:8000/api/register" , {
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        phone_number:+phone_number,
        type:"C",
        name
    })
    })
    console.log(apple)
    const data = await apple.json()
    console.log(data.user)
    if(data.user){
      window.location.href = "landingPage.html"
    }
    

  });
});
