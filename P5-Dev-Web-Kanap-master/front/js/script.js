const items = document.querySelector('.items');

// Requête vers l'API pour récupération de l'ensemble des produits et affichage
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        items.innerHTML = data.map(couch => `<a href="product.html?id=${couch._id}"><article><img src=${couch.imageUrl} alt=${couch.altTxt}><h3>${couch.name}</h3><p>${couch.description}</p></article></a>`).join("")
    });

