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
    cardContainer.classList.add("cardContainer"); // Add class for the container

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
  console.log("User ID:", userId);
  console.log("Product ID:", productId);

 
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
      console.log("Response:", data);

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

favoritesLink.addEventListener("click", (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token");
  const decodedToken = decodeJWT(token);

  if (decodedToken) {
    console.log(111)
    const userId = decodedToken.sub;
    const url = `http://127.0.0.1:8000/api/users/${userId}?includeFavorites=true`;
    const token = localStorage.getItem("token");


    fetch(url, {
      headers: {
        Authorization: 'Bearer ' + `${token}`
      },
    })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
      
        localStorage.setItem("favorites", JSON.stringify(data.favorite_products));
        window.location.href = 'favorites.html'
      
        console.log("Favorites Data:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log("Invalid JWT token");
  }
});
let hoveredCard = null;

function handleCardHover(event) {
  const card = event.currentTarget;
  if (hoveredCard !== card) {
    // Remove "expanded" class from the previously hovered card (if any)
    if (hoveredCard) {
      hoveredCard.classList.remove("expanded");
    }
    // Add "expanded" class to the current hovered card
    card.classList.add("expanded");
    hoveredCard = card;
  }
}