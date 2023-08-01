  document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.querySelector(".cards-container");
    const userId = localStorage.getItem("userId")
    const response = await fetch(`http://127.0.0.1:8000/api/favorites/${userId}`, {
      headers:{
        "Accept" : "application/json"
      }}
    )

    const data = await response.json()

      console.log(data)
    const favoritesArray = data
    
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
    favoritesArray.forEach(async (item) => {
      console.log(item)
      const token = localStorage.getItem("token")
      const response = await fetch(`http://127.0.0.1:8000/api/products/${item.product_id}`,{
        method:"GET",
        headers:{
          "Accept":"application/json",
          "Authorization":`Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log(data)
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("cardContainer"); 

      const card = document.createElement("div");
      card.classList.add("card");

      const imageSection = document.createElement("div");
      imageSection.classList.add("image-section");
      const image = document.createElement("img");
      image.src = `../../backend/public/images/${data.data.image}`
      imageSection.appendChild(image);
      card.appendChild(imageSection);

      const infoSection = document.createElement("div");
      infoSection.classList.add("info-section");

      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = data.data.title;
      infoSection.appendChild(title);

      const description = document.createElement("div");
      description.classList.add("description");
      description.textContent = data.data.description || "";
      infoSection.appendChild(description);

      const amount = document.createElement("div");
      amount.classList.add("amount");
      amount.textContent = `Amount: ${data.data.amount}`;
      infoSection.appendChild(amount);

      const starIcon = document.createElement("i");
      starIcon.classList.add("fas", "fa-star" , 'cards');
      starIcon.classList.add("favorite");
      starIcon.setAttribute("data-product-id", data.data.id); 
      starIcon.addEventListener("click", () => handleStarClick(userId, item.id, starIcon)); 
      infoSection.appendChild(starIcon);

      const cartIcon = document.createElement("i");
    cartIcon.classList.add("fas", "fa-shopping-cart");
    cartIcon.setAttribute("data-product-id", data.data.id);
    
    cartIcon.addEventListener("click", () => handleCartIconClick(data.data));

    
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



  const userType = localStorage.getItem("userType")

if (userType && (userType === "C" || userType === "c")) {
  const yourProductsLink = document.getElementById("yourProducts-link");
  const browseYourProducts = document.querySelector(".browse-your-products");

  if (yourProductsLink) {
    yourProductsLink.style.display = "none";
  }

  if (browseYourProducts) {
    browseYourProducts.style.display = "none";
  }
}





  });


  function handleStarClick(userId, productId, starIcon) {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/favorites/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept" : "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        

      

          let allStarIcons = document.querySelectorAll(".cards");
          console.log(allStarIcons)
          allStarIcons.forEach(icon => icon.classList.remove('favorite'));
          allStarIcons =  Array.from(allStarIcons).filter(item => item.id !== productId);
          console.log(allStarIcons)
    
    
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }