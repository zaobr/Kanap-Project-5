const searchParam = new URLSearchParams(window.location.search).get("id");
const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const itemColors = document.getElementById("colors");
const itemQuantity = document.getElementById("quantity");
const pushCart = document.getElementById("addToCart");
const articleToPanier = {
    id: searchParam
};

const cart = [

]

fetch(`http://localhost:3000/api/products/${searchParam}`)
    .then(response => response.json())
    .then(data => {
        itemImg.innerHTML = `<img src="${data.imageUrl}" alt=${data.altTxt}>`;
        title.innerHTML = data.name;
        price.innerHTML = data.price;
        description.innerHTML = data.description;
        for(color of data.colors){
            itemColors.innerHTML += `<option value="${color}">${color}</option>`;
        }
    }
);

itemColors.addEventListener("change", function(){
    articleToPanier.color = itemColors.options[itemColors.selectedIndex].value;
    localStorage.setItem("quantity", 0);
})

itemQuantity.addEventListener("change", function(){
    articleToPanier.quantity = Number(itemQuantity.value);
});

pushCart.addEventListener("click", function(){
    if((!articleToPanier.quantity || articleToPanier.quantity == "null") || (!articleToPanier.color || (articleToPanier.color == "" && articleToPanier.color == "null"))){
        alert("Vérifier votre séléction de couleur ainsi que la quantité séléctionnée");
    }
    else{
        localStorage.setItem("id", articleToPanier.id);
        localStorage.setItem("color", articleToPanier.color);

        if (articleToPanier.color == localStorage.getItem("color")) {
            articleToPanier.quantity = Number(localStorage.getItem("quantity")) + Number(itemQuantity.value);
            localStorage.setItem("quantity", articleToPanier.quantity);
        }
        else{
            localStorage.removeItem("quantity");
            localStorage.setItem("quantity", articleToPanier.quantity);
        } 
    }
});

// itemColors.addEventListener("change", function(){
//     articleToPanier.color = itemColors.options[itemColors.selectedIndex].value;
// })

// itemQuantity.addEventListener("change", function(){
//     articleToPanier.quantity = parseInt(itemQuantity.value);
// });

// pushCart.addEventListener("click", function(){
//     if((!articleToPanier.quantity || articleToPanier.quantity == "null") || (!articleToPanier.color || (articleToPanier.color == "" && articleToPanier.color == "null"))){
//         alert("Vérifier votre séléction de couleur ainsi que la quantité séléctionnée");
//     }
//     else{
//         ajouter condition
//         const index = cart.findIndex(product => product.id === articleToPanier.id && product.color === articleToPanier.color)

//         if (index !== -1) {
//             console.log(itemQuantity.value, cart[index])
//             cart[index].quantity = parseInt(cart[index].quantity) + parseInt(itemQuantity.value)            
//         } else {
//             cart.push(articleToPanier)
//         }

//         si existe pas dans le panier
        
//         localStorage.setItem("cart", JSON.stringify(cart));
//     }
// });