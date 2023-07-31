const fetchProducts = async () => {
  console.log(11);
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/products", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + `${token}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
};

const userType = localStorage.getItem("userType")
console.log(userType)
console.log(11)
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



const displayedProducts = document.querySelector(".browse-all-products");
displayedProducts.addEventListener('click', async () => {
  

  const prods = await fetchProducts();
  localStorage.setItem("products", JSON.stringify(prods));
  window.location.href = "allProducts.html";
});

