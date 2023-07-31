const cardsContainer = document.querySelector(".cards-container");
const dataArray = JSON.parse(localStorage.getItem("products"));
console.log(dataArray)
const token = localStorage.getItem("token");

function decodeJWT(token) {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

const decodedToken = decodeJWT(token);
if (decodedToken) {
  const userId = decodedToken.sub;

  dataArray.forEach((item) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("cardContainer"); 

    const card = document.createElement("div");
    card.classList.add("card");

    const imageSection = document.createElement("div");
    imageSection.classList.add("image-section");
    const image = document.createElement("img");
    image.src = "placeholder.jpg";
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


   
  cardContainer.appendChild(card);
  cardsContainer.appendChild(cardContainer);
  });
} else {
  console.log('Invalid JWT token');
}

function handleStarClick(userId, productId, starIcon) {

  fetch("http://127.0.0.1:8000/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: userId,
      product_id: productId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      

      if (data.message === 'Product added to favorites') {

        const allStarIcons = document.querySelectorAll(".fas.fa-star");
        allStarIcons.forEach(icon => icon.classList.remove('favorite'));

        starIcon.classList.add('favorite');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
const favoritesLink = document.querySelector(".favorites-link");
  console.log(favoritesLink)
favoritesLink.addEventListener("click", (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token");
  const decodedToken = decodeJWT(token);
  console.log(decodedToken)
  if (decodedToken) {
  
    const userId = decodedToken.sub;
    
    
    console.log("http://127.0.0.1:8000/api/users/${userId}?includeFavorites=true")
    fetch(`http://127.0.0.1:8000/api/users/${userId}?includeFavorites=true`).then((response) => {
        console.log(111222)
        console.log(response)
        console.log(222)
        return response.json()
      })
      .then((data) => {
      console.log(data)
      console.log(userId)
        localStorage.setItem("favorites", JSON.stringify(data.favorite_products));
        console.log(11111111111111)
        window.location.href = 'favorites.html'
      
        console.log("Favorites Data:", data);
      })
      .catch((error) => {
        console.log(11)
        console.error("Error:", error);
      });
  } else {
    console.log("Invalid JWT token");
  }
});


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

function handleCartIconClick(item) {
  const cartItems = JSON.parse(localStorage.getItem("cardItems")) || [];

  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    console.log("Product is already in the cart.");
  } else {
    cartItems.push(item);

    localStorage.setItem("cardItems", JSON.stringify(cartItems));

    console.log("Product added to cart:", item);
  }
}


const userType = localStorage.getItem("userType")
console.log(userType)
console.log(11)
if (userType && (userType === "C" || userType === "c")) {
  const yourProductsLink = document.getElementById("yourProducts-link");
  console.log(yourProductsLink)
  if (yourProductsLink) {
    yourProductsLink.style.display = "none";
  }

}

