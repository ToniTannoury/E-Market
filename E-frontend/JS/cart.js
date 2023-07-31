document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItemsContainer");

  const cartItems = JSON.parse(localStorage.getItem("cardItems"));

  if (cartItems && Array.isArray(cartItems)) {
    cartItems.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const imageSection = document.createElement("div");
      imageSection.classList.add("image-section");
      const image = document.createElement("img");
      image.src = "path/to/your/images/placeholder.jpg";
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
      cartItemsContainer.appendChild(card);
    });
  } else {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.textContent = "Your shopping cart is empty.";
    cartItemsContainer.appendChild(emptyCartMessage);
  }
});
