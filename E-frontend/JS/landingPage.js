document.addEventListener("DOMContentLoaded" ,async ()=>{
  const response = await fetch("http://127.0.0.1:8000/api/products",{
    method:"GET",
    headers:{
      "Authorization":'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjkwNzI1ODQyLCJleHAiOjE2OTA3Mjk0NDIsIm5iZiI6MTY5MDcyNTg0MiwianRpIjoiOXVsbE9ncVFLWjE3TE9vYSIsInN1YiI6IjIzNCIsInBydiI6IjFkMGEwMjBhY2Y1YzRiNmM0OTc5ODlkZjFhYmYwZmJkNGU4YzhkNjMifQ.LjRldrWnAWOJevRieTIrlog6xpg1CoEobbAe-Vo4UmY',
      "Accept" : "application/json",
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  console.log(data)
})