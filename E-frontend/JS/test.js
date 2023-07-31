document.getElementById('button').addEventListener('click', function(event) {
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
});



let userProducts= JSON.parse(localStorage.getItem("userProducts"));

const dataArray = userProducts.products
console.log(dataArray)
const cardsContainer = document.querySelector(".cards-container");


function displayProductInfo(product) {
  document.getElementById("title").value = product.title;
  document.getElementById("description").value = product.description;
  document.getElementById("amount").value = product.amount;
}

function handleCardClick(product) {
  displayProductInfo(product);
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

dataArray.forEach((item) => {
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

  const starIcon = document.createElement("i");
  starIcon.classList.add("fas", "fa-star");
  starIcon.setAttribute("data-product-id", item.id);
  starIcon.addEventListener("click", () => handleStarClick(userId, item.id, starIcon));
  infoSection.appendChild(starIcon);

  const cartIcon = document.createElement("i");
  cartIcon.classList.add("fas", "fa-shopping-cart");
  cartIcon.setAttribute("data-product-id", item.id);

  cartIcon.addEventListener("click", () => handleCartIconClick(item));

  infoSection.appendChild(cartIcon);

  card.appendChild(infoSection);
  card.addEventListener("mouseenter", handleCardHover);
  card.addEventListener("mouseleave", handleCardHover);

  card.addEventListener("click", () => handleCardClick(item));

  cardContainer.appendChild(card);
  cardsContainer.appendChild(cardContainer);
});


