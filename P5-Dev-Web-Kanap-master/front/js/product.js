const searchParam = new URLSearchParams(window.location.search).get("id");
const itemColors = document.getElementById("colors");
const itemQuantity = document.getElementById("quantity");
const pushCart = document.getElementById("addToCart");

const cart = [];

fetch(`http://localhost:3000/api/products/${searchParam}`)
    .then(response => response.json())
    .then(data => {postData(data)}
);

pushCart.addEventListener("click", function(){
    toCart(searchParam, itemColors, itemQuantity)
});

function postData(data) {
    const itemImg = document.querySelector(".item__img");
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const description = document.getElementById("description");

    itemImg.innerHTML = `<img src="${data.imageUrl}" alt=${data.altTxt}>`;
    title.innerHTML = data.name;
    price.innerHTML = data.price;
    description.innerHTML = data.description;
    for(color of data.colors){
        itemColors.innerHTML += `<option value="${color}">${color}</option>`;
    };
}

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
            cart.push({id: id, color: color.value, quantity: quantity.value});
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}