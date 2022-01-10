const cartItems = document.getElementById("cart__items");
const cartList = JSON.parse(localStorage.getItem("cart"));

console.log(typeof JSON.parse(localStorage.getItem("cart")))

for (let index = cartList.length; index > 0; index--) {
  displayData(index-1);
}

function displayData(index) {
  fetch(`http://localhost:3000/api/products/${cartList[index].id}`)
  .then(response => response.json())
  .then(data => {cartItems.innerHTML = `<article class="cart__item" data-id="${data.id}" data-color="${cartList[index].color}">
    <div class="cart__item__img">
    <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${data.name}</h2>
    <p>${cartList[index].color}</p>
    <p>${data.price} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartList[index].quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>`
  })
}