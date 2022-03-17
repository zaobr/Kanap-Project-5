if (document.querySelector("title").text == "Cart") {
  const articles = JSON.parse(localStorage.getItem("cart"));;
  const cartItems = document.getElementById("cart__items");
  const totalQuantity = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");
  const form = document.querySelector(".cart__order__form");
  let products = [];
  let contact = {};
  let order = {};
  let x = 0;
  let y = 0;
  totalQuantity.innerHTML = 0;
  totalPrice.innerHTML = 0;
  
  displayData();
  
  function displayData() {
    products.length = 0;
    while(cartItems.firstChild){
      cartItems.removeChild(cartItems.firstChild);
    }
    for (let index in articles) {
      fetch(`http://localhost:3000/api/products/${articles[index].id}`)
      .then(response => response.json())
      .then(data => {displayItems(data, index)});
      x += parseInt(articles[index].quantity);
      y += (parseInt(articles[index].quantity) * parseInt(articles[index].price));
      products.push(articles[index].id)
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
    const oldChild = document.querySelector(".cart").removeChild(document.getElementById("cart__items"));
    articles.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(articles));
    document.querySelector(".cart").prepend(oldChild);
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
  
  function checkInput(input){
    if((input.value == "" || input.value == null || input.value == " ")){
      input.nextElementSibling.innerHTML = "Veuillez vérifier les informations renseignées.";
      return false;
    }
    else{
      input.nextElementSibling.innerHTML = "";
      return true;
    }
  }
  
  
  document.querySelectorAll('div.cart__order__form__question > input[type="text"]').forEach(input => {
    input.addEventListener('change', (e) => {checkInput(input)});
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
  
  function displayOrderId(data) {
    let url = "http://127.0.0.1:5500/Ouhabmehdi_5_25122021/P5-Dev-Web-Kanap-master/front/html/confirmation.html?orderId=" + data.orderId;
    window.location.href = url;
  }
}

let params = new URLSearchParams(window.location.search);
document.getElementById("orderId").innerHTML = params.get("orderId");