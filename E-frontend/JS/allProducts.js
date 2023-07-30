const cardsContainer = document.querySelector(".cards-container");
const dataArray = JSON.parse(localStorage.getItem("products"))
dataArray.forEach((item) => {
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

    card.appendChild(infoSection);

    cardsContainer.appendChild(card);
});
document.getElementById("prev-btn").addEventListener("click" , )
