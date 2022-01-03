const cartItems = document.getElementById("cart__items");

fetch(`http://localhost:3000/api/products/${localStorage.getItem("id")}`)
    .then(response => response.json())
    .then(data => { cartItems.innerHTML = 
        `<article class="cart__item" data-id="${localStorage.getItem("id")}" data-color="${localStorage.getItem("color")}">
        <div class="cart__item__img">
          <img src="${data.imageUrl}" alt="${data.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${localStorage.getItem("color")}</p>
            <p>${data.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorage.getItem("quantity")}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`  
});
