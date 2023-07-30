const fetchProducts = async () => {
  console.log(11);
  const response = await fetch("http://127.0.0.1:8000/api/products", {
    method: "GET",
    headers: {
      "Authorization":'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjkwNzQ3NTQzLCJleHAiOjE2OTA3NTExNDMsIm5iZiI6MTY5MDc0NzU0MywianRpIjoiUWFFR3JwRE1vd1F1Y09iVCIsInN1YiI6IjM4IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.CPvCzZh0Zyrw2VmqlvsJeHjdU0_BdUBYNNH5AotNYXA',
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data
}

const displayedProducts = document.querySelector(".browse-all-products")
displayedProducts.addEventListener('click' ,async ()=>{
  const prods =await fetchProducts()
  localStorage.setItem("products" , JSON.stringify(prods))
  window.location.href = "allProducts.html"
})
