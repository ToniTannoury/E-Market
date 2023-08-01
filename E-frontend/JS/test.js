let selectedProductId = null;

document.addEventListener("DOMContentLoaded" , async()=>{
  
  const userId = localStorage.getItem('userId')
  const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}?includeProducts=true`)
  const data = await response.json()
  
  const adminProducts = data.products


const cardsContainer = document.querySelector(".cards-container");


function displayProductInfo(product) {
  document.getElementById("title").value = product.title;
  document.getElementById("description").value = product.description;
  document.getElementById("amount").value = product.amount;
}
let clicked = false
const deleteProduct = async ()=>{
  const token = localStorage.getItem("token")
  const response = await fetch(`http://127.0.0.1:8000/api/products/${selectedProductId}`,{
  method:"DELETE",
  headers:{
    'Authorization': `Bearer ${token}`,
    "Accept" : "application/json"
  }
  })
  const data =await response.json()
  console.log(data)
}
const modifyProduct = async ()=>{
  const token = localStorage.getItem("token")
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const image = document.getElementById('image').files[0];
  const response = await fetch(`http://127.0.0.1:8000/api/products/${selectedProductId}`,{
  method:"PATCH",
  headers:{
    'Authorization': `Bearer ${token}`,
    "Accept" : "application/json",
    "Content-type" : "application/json",
  },
  body:JSON.stringify({
    title,
    description,
    amount,
    image,
  })
  })
  const data =await response.json()
  console.log(data)
}
function handleCardClick(product) {
  
  if(clicked===false){
    clicked = true
    document.querySelector(".midSection").innerHTML += `
  <button id="modifyButton" type="button">Modify Product</button>
  <button  id="deleteButton" type="button">Delete Product</button>
`
document.getElementById("deleteButton").addEventListener("click" , ()=>{
  deleteProduct()
})
document.getElementById("modifyButton").addEventListener("click" , ()=>{
  modifyProduct()
})

  }
  displayProductInfo(product);
  selectedProductId = product.id; 
  console.log("Selected Product ID:", selectedProductId);
}
let hoveredCard = null;
function handleCardHover(event) {
  const card = event.currentTarget;
  if (event.type === "mouseenter") {
    if (hoveredCard && hoveredCard !== card) {
      hoveredCard.classList.remove("expanded");
    }
    card.classList.add("expanded");
    hoveredCard = card;
  } else if (event.type === "mouseleave") {
    card.classList.remove("expanded");
  }
}

adminProducts.forEach((item) => {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("cardContainer");

  const card = document.createElement("div");
  card.classList.add("card");

  const imageSection = document.createElement("div");
  imageSection.classList.add("image-section");
  const image = document.createElement("img");
  image.src = `../../backend/public/images/${item.image}`;
  imageSection.appendChild(image);
  card.appendChild(imageSection);

  const infoSection = document.createElement("div");
  infoSection.classList.add("info-section");

  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = item.title;
  infoSection.appendChild(title);

  const description = document.createElement("div");
  description.classList.add("description");
  description.textContent = item.description || "";
  infoSection.appendChild(description);

  const amount = document.createElement("div");
  amount.classList.add("amount");
  amount.textContent = `Amount: ${item.amount}`;
  infoSection.appendChild(amount);

 
  

  



  

  card.appendChild(infoSection);
  card.addEventListener("mouseenter", handleCardHover);
  card.addEventListener("mouseleave", handleCardHover);

  card.addEventListener("click", () => handleCardClick(item));

  cardContainer.appendChild(card);
  cardsContainer.appendChild(cardContainer);
});
document.getElementById('button').addEventListener('click',async  function(event) {
  if (selectedProductId) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    // Create a JSON object to send the data
    const body = {
      amount,
      description,
      title,
      
    };

    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/api/products/${selectedProductId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Product modified successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Product modification failed.');
      });
  } else{
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const image = document.getElementById('image').files[0];

  // Create a FormData object to send the data, including the image file
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('amount', amount);
  formData.append('user_id',+localStorage.getItem("userId"));
  formData.append('image', image);

  const token = localStorage.getItem("token")
  fetch('http://127.0.0.1:8000/api/products', {
    method: 'POST',
    body: formData, 
    headers: {
      "Authorization": `Bearer ${token}`,
      'Accept': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Product created successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Product creation failed.');
    });
  }





});




})
