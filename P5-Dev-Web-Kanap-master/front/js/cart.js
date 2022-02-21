const articles = JSON.parse(localStorage.getItem("cart"));;
const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
totalQuantity.innerHTML = 0;
totalPrice.innerHTML = 0;
let x = 0;
let y = 0;

displayData();


function displayData() {
  for (let index in articles) {
    fetch(`http://localhost:3000/api/products/${articles[index].id}`)
    .then(response => response.json())
    .then(data => {displayItems(data, index)});
    x += parseInt(articles[index].quantity);
    y += parseInt(articles[index].quantity) * parseInt(articles[index].price);
  }
  totalQuantity.innerHTML = x;
  totalPrice.innerHTML = y;
}

function displayItems(data, index) {
  cartItems.innerHTML += `<article class="cart__item">
    <div class="cart__item__img">
    <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${data.name}</h2>
    <p>${articles[index].color}</p>
    <p>${data.price} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" onClick="modifyQuantity(${index})" name="itemQuantity" min="1" max="100" value="${articles[index].quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem" onClick="deleteItem(${index})">Supprimer</p>
    </div>
    </div>
    </div>
    </article>`;
  }

function deleteItem(index){
  articles.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(articles));
  cartItems.innerHTML = "";
  displayData();
  x = 0;
};

// function modifyQuantity(index){
//   const itemQuantity = document.querySelector(".itemQuantity")
//   itemQuantity.addEventListener("change", function(){
//     articles[index].quantity += parseInt(itemQuantity.value)
//     localStorage.setItem("cart", JSON.stringify(articles))
//     location.reload()
//   });
// }