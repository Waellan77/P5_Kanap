// Creation of a function to get the id of each product and insert it in the url of their html page //
// Création d'une fonction pour récupérer l'id de chaque produit et l'insérer dans l'url de leur page html //
function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

// Create a variable containing the getProductID function //
// Création d'une variable contenant la fonction getProductID //
const productId = getProductId();

// Creation of a function to restrict the quantity per item to 100 //
// Création d'une fonction pour restreindre à 100 la quantité par article //
function maxQuantity() {
    let quantityMax = 100
    if (quantityMax != 0) {
        if (productData.quantity > quantityMax) {
            alert("Vous ne pouvez pas commander plus de 100 produits")
            return productSaveInLocalStorage
        }
    }
}

// Retrieval of the <div> tag by class name //
// Récupération de la balise <div> par sa classe //
let divImage = document.getElementsByClassName('item__img')

// Retrieval of the <title> tag by id //
// Récupération de la balise <title> par son id //
let titlePrice = document.getElementById('title')

// Retrieval of the <span> tag by id //
// Récupération de la balise <span> par son id //
let spanPrice = document.getElementById('price')

// Retrieval of the <paragraphe> tag by id //
// Récupération de la balise <paragraphe> par son id //
let paragrapheDescription = document.getElementById('description')

// Retrieval of the <select> tag by id //
// Récupération de la balise <select> par son id //
let select = document.getElementById("colors")

let productData

// Use fetch with the address of the selected product using the productId variable to retrieve data from the API //
// Utilisation de fetch avec l'adresse du produit sélectionné à l'aide de la variable productId pour récupérer les données depuis l'API //
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then((response2) => {
        productData = response2
        // We create the HTML <img> tag and fill in its url, its alternative text and insert it into its parent tag //
        // On crée la balise HTML <img> et on remplit son url, son texte alternatif et on l'insère dans sa balise parente //
        let image = document.createElement("img")

        image.src = productData.imageUrl
        image.alt = productData.altTxt

        divImage[0].append(image)

        // We fill in the title, price and description //
        // On remplit le titre, le prix et la description // 
        titlePrice.innerText = productData.name

        spanPrice.innerText = productData.price

        paragrapheDescription.innerText = productData.description
        // For each color available in the "colors" table: //
        // Pour chaque couleur disponible dans le tableau "colors": //
        productData.colors.forEach(color => {
            // Create the <option> tag //
            // On crée la balise <option> //
            let addColorOption = document.createElement("option")

            // We fill it with different colors //
            // On l'a remplie par les différentes couleurs //
            addColorOption.innerText = `${color}`

            // We insert the <option> tag into the <select> tag //
            // On insère la balise <option> dans la balise <select> //  
            select.append(addColorOption)
        });
        // We use the addCart() function to add the selected product to the cart //
        // On utilise la fonction addCart() pour ajouter le produit sélectionné au panier //  
        addCart(productData)
    })
// We create a function to add the product in the basket and the localStorage //
// On crée une fonction pour ajouter le produit dans le panier et le localStorage //
let addCart = () => {
    // We get the "Add to cart" button and we add an event to the click //
    // On récupére le bouton "Ajouter au panier" et on ajoute un événement au click //
    let buttonAddToCart = document.getElementById("addToCart")
    buttonAddToCart.addEventListener("click", (e) => {
        // We create the key "product" in the localStorage to save the selected products //
        // On crée la clé "product" dans le localStorage pour sauvegarder les produits sélectionnés //
        let productSaveInLocalStorage = JSON.parse(localStorage.getItem("product"))

        // We want to keep the quantity and color of the products in the localStorage but we remove the price to avoid any fraud //
        // On veut conserver la quantité et la couleur des produits dans le localStorage mais on supprime le prix pour éviter toute fraude //
        const quantity = document.getElementById("quantity").value
        productData.color = select.value

        // We use parseInt to put the quantity in number because it is in string //
        // On utilise parseInt pour mettre la quantité en nombre car elle est en chaîne de caractères //
        productData.quantity = parseInt(quantity)
        delete productData.price

        // If the LocalStorage is empty, we add the products to the LocalStorage and we restrict the quantity to 100 per product //
        // Si le localStorage est vide, on ajoute les produits au LocalStorage et on restreint la quantité à 100 par produit //  
        if (productSaveInLocalStorage === null) {
            productSaveInLocalStorage = []
            maxQuantity()
            productSaveInLocalStorage.push(productData)
        } else {
            // Otherwise we use .find to check that the product id and its color are equal to those of productData //
            // Sinon on utilise .find pour vérifier que l'id du produit et sa couleur sont égaux à ceux de productData //    
            let chosenProduct = productSaveInLocalStorage.find(p => p._id === productData._id && p.color === productData.color)

            // If it is the case we add the quantity always restricted to 100 //
            // Si c'est le cas on ajoute la quantité toujours restreinte à 100 //
            if (chosenProduct != undefined) {
                maxQuantity()
                chosenProduct.quantity += parseInt(quantity)
            } else {
                // Otherwise we add it to the localStorage //
                // Sinon on l'ajoute au localStorage //   
                maxQuantity()
                productSaveInLocalStorage.push(productData)
            }
        }
        // We add the key and the products to the localStorage and we convert them into JSON //
        // On ajoute la clé ainsi que les produits au localStorage et on les convertit en JSON //
        localStorage.setItem("product", JSON.stringify(productSaveInLocalStorage))
    })
}

