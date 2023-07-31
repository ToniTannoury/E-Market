document.addEventListener("DOMContentLoaded", () => {
  const shoppingCartLink = document.querySelector(".shoppingCart-link");
  const favoritesLink = document.querySelector(".favorites-link");
  const yourProductsLink = document.querySelector(".yourProducts-link");
  const marketLink = document.querySelector(".market");
  const profileLink = document.querySelector(".profile-link");

  shoppingCartLink.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  // favoritesLink.addEventListener("click", () => {
  //   window.location.href = "favorites.html";
  // });

  // yourProductsLink.addEventListener("click", () => {
  //   window.location.href = "test.html";
  // });

  marketLink.addEventListener("click", () => {
    window.location.href = "allProducts.html";
  });

  profileLink.addEventListener("click", () => {
    window.location.href = "profile.html";
  });
});