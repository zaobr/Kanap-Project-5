// Affichage du numéro de commande
let params = new URLSearchParams(window.location.search);
document.getElementById("orderId").innerHTML = params.get("orderId");