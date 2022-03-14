const articles = JSON.parse(localStorage.getItem("cart"));;
const cartItems = document.getElementById("cart__items");
const cartParent = document.querySelector(".cart");
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
    y += (parseInt(articles[index].quantity) * parseInt(articles[index].price));
  }
  totalQuantity.innerHTML = x;
  totalPrice.innerHTML = y;
}

function displayItems(data, index) {
  const itemQuantity = document.querySelector(".itemQuantity");
  cartItems.innerHTML += `<article class="cart__item">
    <div class="cart__item__img">
    <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${data.name}</h2>
    <p>${articles[index].color}</p>
    <p>${data.price}€</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" onchange="modifyQuantity(${index}, this)" name="itemQuantity" min="1" max="100" value="${articles[index].quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem" onClick="deleteItem(${index})">Supprimer</p>
    </div>
    </div>
    </div>
    </article>`;
}

function deleteItem(index){
  var oldChild = cartParent.removeChild(cartItems);

  articles.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(articles));
  cartParent.removeChild(cartItems);
  cartItems.innerHTML = oldChild
  x = 0;
  y = 0;
  displayData();
};

function modifyQuantity(index, itemQuantity){
  articles[index].quantity = parseInt(itemQuantity.value);
  localStorage.setItem("cart", JSON.stringify(articles));
  x = 0;
  y = 0;
  displayData();
}

const form = document.querySelector(".cart__order__form");
const customerInfo = {};
const orderRecap = {};

form.addEventListener('click', (e) => {
  // e.preventDefault()
  checkError()
  // if (checkError) {
  //   customerInfo = {prenom: firstName.value, nom: lastName.value, adresse: address.value, ville: city.value, email: email.value};
  //   orderRecap = {contact: customerInfo, products: articles};
  //   localStorage.setItem("Recap", JSON.stringify(orderRecap));
  // }
})

function checkError(){
  const errorMessage = document.querySelectorAll('div.cart__order__form__question > p');
  let err = 0;

  for (let errors of errorMessage) {
    if(errors.innerText.length != 0){
      err++;
      console.log(err);
    }
  }

  if(err == 0){
    return true;
  }
  else{
    return false
  }
}


document.querySelectorAll('div.cart__order__form__question > input[type="text"]').forEach(el => {
  el.addEventListener('change', (e) => {
    if((el.value == "" || el.value == null || el.value == " ")){
      el.nextElementSibling.innerHTML = "Veuillez vérifier les informations renseignées.";
    }
    else{
      el.nextElementSibling.innerHTML = "";
    }
  });
});

document.getElementById("email").addEventListener('change', (e) => {
  let r1 = /\S+@\S+\.\S+/;
  let emailVerif = r1.test(e.target.value);

  if(!emailVerif){
    e.target.nextElementSibling.innerHTML = "Veuillez vérifier le format de l'adresse email.";
    return false;
  }
  else{
    e.target.nextElementSibling.innerHTML = "";
    return true;
  }
});