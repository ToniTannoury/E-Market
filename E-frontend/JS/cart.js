document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
const token = localStorage.getItem("token")
  const cartItems = JSON.parse(localStorage.getItem("cardItems"));
  function decodeJWT(token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }
  function handleCartIconClick(item) {
    const cartItems = JSON.parse(localStorage.getItem("cardItems")) || [];
  
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  

    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    console.log(updatedCartItems)
    localStorage.setItem("cardItems", JSON.stringify(updatedCartItems));
  
      console.log("Product added to cart:", item);
    
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
  const decodedToken = decodeJWT(token);
if (decodedToken) {
  const userId = decodedToken.sub;
  cartItems.forEach((item) => {
    console.log(item)
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("cardContainer"); 

    const card = document.createElement("div");
    card.classList.add("card");

    const imageSection = document.createElement("div");
    imageSection.classList.add("image-section");
    const image = document.createElement("img");
    image.src = `../../backend/public/images/${item.image}`
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
  cartIcon.classList.add("favorite");
  cartIcon.addEventListener("click", () => handleCartIconClick(item));

  
  infoSection.appendChild(cartIcon);

    card.appendChild(infoSection);
    card.addEventListener("mouseenter", handleCardHover); 
  card.addEventListener("mouseleave", handleCardHover); 


   
  cardContainer.appendChild(card);
  cartItemsContainer.appendChild(cardContainer);
  });
} else {
  console.log('Invalid JWT token');
}

});
