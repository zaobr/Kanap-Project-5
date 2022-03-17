const searchParam = new URLSearchParams(window.location.search).get("id");
const itemColors = document.getElementById("colors");
const itemQuantity = document.getElementById("quantity");
const productPrice = document.getElementById("price");
const pushCart = document.getElementById("addToCart");
const cart = new Array();

// Requête vers l'API de récupération des données correspondant à l'ID du produit via l'URL et affichage via la fonction postData(data)
fetch(`http://localhost:3000/api/products/${searchParam}`)
    .then(response => response.json())
    .then(data => {postData(data)}
);
 
// Affichage des données récupérés depuis l'API via le paramètre data
function postData(data) {
    const itemImg = document.querySelector(".item__img");
    const title = document.getElementById("title");
    const description = document.getElementById("description");

    itemImg.innerHTML = `<img src="${data.imageUrl}" alt=${data.altTxt}>`;
    title.innerHTML = data.name;
    productPrice.innerHTML = data.price;
    description.innerHTML = data.description;
    for(color of data.colors){
        itemColors.innerHTML += `<option value="${color}">${color}</option>`;
    };
}

// Récupération des articles du panier(localStorage) avant manipulation/insertion de nouveaux éléments
if (localStorage.getItem("cart")) {
    for (const element of JSON.parse(localStorage.getItem("cart"))) {
        cart.push(element);
    }
}

// Envoi de l'ID contenu dans l'URL et caractéristique du produit pour ajout au panier via la fonction toCart()
pushCart.addEventListener("click", function(){
    toCart(searchParam, itemColors, itemQuantity, productPrice)
});

// Ajout de l'article au panier(localStorage) ou itération de la quantité si article déjà présent
function toCart(id, color, quantity) {
    if((!quantity.value || quantity.value == "null" || quantity.value == 0) || (!color.value || (color.value == "" && color.value == "null"))){
        alert("Vérifier votre séléction de couleur ainsi que la quantité séléctionnée.");
    }
    else{
        const index = cart.findIndex(article => article.id === id && article.color === color.value);
        if(index !== -1){
            cart[index].quantity = parseInt(cart[index].quantity) + parseInt(quantity.value);
        }
        else{
            cart.push(new Object({id: id, color: color.value, quantity: parseInt(quantity.value)}));
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}