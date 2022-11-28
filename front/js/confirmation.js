// Creation of a function to get the id of the order and insert it in the url of the html confirmation page //
// Création d'une fonction pour récupérer l'id de la commande et l'insérer dans l'url de la page html de confirmation //
function getCommandId() {
    return new URL(location.href).searchParams.get("orderId")
}

// Create a variable containing the getCommandId function //
// Création d'une variable contenant la fonction getCommandId //
const commandId = getCommandId()


// We retrieve the <span> tag which must contain the order id by its id //
// On récupére la balise <span> qui doit contenir l'id de commande par son id //
let orderId = document.getElementById("orderId")

// We fill orderId with the order number //
// On remplit orderId par le numéro de commande // 
orderId.innerText = commandId

// We empty the localStorage at the command //
// On vide le localStorage à la commande //
localStorage.clear()