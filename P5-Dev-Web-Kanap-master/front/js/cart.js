const cartItems = document.getElementById("cart__items");
const cartList = JSON.parse(localStorage.getItem("cart"));
const ids = [];
const colors = [];
const quantities = [];

for (const article of cartList) {
  ids.push(article.id);
  colors.push(article.color);
  quantities.push(article.quantity);
}

for (let id in ids) {
  displayData(id);
}

function displayData(id) {
  fetch(`http://localhost:3000/api/products/${ids[id]}`)
  .then(response => response.json())
  .then(data => {cartItems.innerHTML += `<article class="cart__item" data-id="${data.id}" data-color="${colors[id]}">
    <div class="cart__item__img">
    <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${data.name}</h2>
    <p>${colors[id]}</p>
    <p>${data.price} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantities[id]}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>`
  })
}