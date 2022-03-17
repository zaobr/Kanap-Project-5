const articles = JSON.parse(localStorage.getItem("cart"));;
const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const form = document.querySelector(".cart__order__form");
let products = [];
let contact = {};
let order = {};

// Initialisation des valeurs avant manipulation
let x = 0;
let y = 0;
totalQuantity.innerHTML = 0;
totalPrice.innerHTML = 0;

// Récupération des articles depuis localStorage et caractéristique associés depuis l'API. Affichage du contenu via la fonction displayItems()
function displayData() {
  products.length = 0;
  while(cartItems.firstChild){
    cartItems.removeChild(cartItems.firstChild);
  }
  for (let index in articles) {
    fetch(`http://localhost:3000/api/products/${articles[index].id}`)
    .then(response => response.json())
    .then(data => {
      displayItems(data, index);
      y += (parseInt(articles[index].quantity) * parseInt(data.price));
      totalPrice.innerHTML = y;
    });
    x += parseInt(articles[index].quantity);
    products.push(articles[index].id);
  }
  totalQuantity.innerHTML = x;
}
displayData();

// Affichage du contenu du panier via les données récupéres avec le paramétre data et l'ordre des articles du panier via index
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

// Suppression des articles du panier via son index ainsi que du localStorage avant re-affichage des articles
function deleteItem(index){
  const oldChild = document.querySelector(".cart").removeChild(document.getElementById("cart__items"));
  articles.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(articles));
  document.querySelector(".cart").prepend(oldChild);
  x = 0;
  y = 0;
  displayData();
};

// Modification de la quantité affichée et stockée d'un article du panier via son index ainsi que dans le localStorage avant re-affichage des articles
function modifyQuantity(index, itemQuantity){
  articles[index].quantity = parseInt(itemQuantity.value);
  localStorage.setItem("cart", JSON.stringify(articles));
  x = 0;
  y = 0;
  displayData();
}

// Vérification des champs texte du formulaire via la fonction checkInput()
document.querySelectorAll('div.cart__order__form__question > input[type="text"]').forEach(input => {
  input.addEventListener('change', (e) => {checkInput(input)});
});

// Vérification du contenu entrés dans les champs du formulaire avant envoi (renvoi true si affichage de message d'erreur et false si tout se déroule bien)
function checkInput(input){
  if((input.value == "" || input.value == null || input.value == " ")){
    input.nextElementSibling.innerHTML = "Veuillez vérifier les informations renseignées.";
    return false;
  }
  else{
    if(input.name == "firstName"|| input.name == "lastName"){
      let r2 = /^[a-zA-Z]+$/;
      let inputVerif = r2.test(input.value)
      if(!inputVerif){
        input.nextElementSibling.innerHTML = "Caractères incorrects. Veuillez entrer seulement des lettres.";
      }
      else{
        input.nextElementSibling.innerHTML = "";
        return true;
      }
    }
    else{
      input.nextElementSibling.innerHTML = "";
      return true;
    }
  }
}

// Vérification du contenu du champ email (renvoi true si affichage de message d'erreur et false si tout se déroule bien)
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

// Vérification de message d'erreur via la retour de checkInput(), envoi du formulaire et récupération du numéro de commande via getOrderId() avant redirection vers la page Confirmation
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let error = false;
  document.querySelectorAll('div.cart__order__form__question > input[type="text"]').forEach(input => {
    if(!checkInput(input)){
      error = true;
    }
  });
  if(!error && articles.length > 0){
    contact = {firstName: firstName.value, lastName: lastName.value, address: address.value, city: city.value, email: email.value};
    order = {contact: contact, products: products};
    getOrderId();
  }
})

// Envoi du formulaire vers l'API et écupération du numéro de commande et affichage/redirection via la fonction displayOrderId
function getOrderId(){
  fetch('http://localhost:3000/api/products/order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(order)
})
.then(res => res.json())
.then(data => {displayOrderId(data)})
}

// Redirection vers la page Confirmation et ajout du numéro de commande retourné par l'API dans l'URL de destination
function displayOrderId(data) {
  let url = "../html/confirmation.html?orderId=" + data.orderId;
  window.location.href = url;
}