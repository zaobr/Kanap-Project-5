const cartList = JSON.parse(localStorage.getItem("cart"));
const totalQuantity = document.getElementById("totalQuantity");
let x = Number();
const articles = [];
totalQuantity.innerHTML = 0;

for (const article of cartList) {
  articles.push(article);
}

for (let index in articles) {
  displayData(index);
  x += parseInt(articles[index].quantity);
  totalQuantity.innerHTML = x;
}

function displayData(index) {
  const cartItems = document.getElementById("cart__items");
  fetch(`http://localhost:3000/api/products/${articles[index].id}`)
  .then(response => response.json())
  .then(data => {cartItems.innerHTML += `<article class="cart__item" data-id="${data._id}" data-color="${articles[index].color}">
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
    <p class="deleteItem" onClick="deleteItem(${index}, ${1})">Supprimer</p>
    </div>
    </div>
    </div>
    </article>`
  })
}

function deleteItem(index){
  articles.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(articles))
  location.reload();
};

// function modifyQuantity(index){
//   const itemQuantity = document.querySelector(".itemQuantity")
//   itemQuantity.addEventListener("change", function(){
//     articles[index].quantity += parseInt(itemQuantity.value)
//     localStorage.setItem("cart", JSON.stringify(articles))
//     location.reload()
//   });
// }