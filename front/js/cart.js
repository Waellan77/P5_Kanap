// We retrieve the products from the localStorage //
// On récupére les produits du localStorage //
let productSaveInLocalStorage = JSON.parse(localStorage.getItem("product"))

// We retrieve the ID of the tag where the total number of products in the basket will be placed //
// On récupére l'Id de la balise où sera placé le nombre total de produit dans le panier //
let totalQuantity = document.getElementById("totalQuantity")

// We retrieve the ID of the tag where the total price of the products will be placed //
// On récupére l'ID de la balise où sera placé le prix total des produits //
let totalPrice = document.getElementById("totalPrice")

// Creation of a function to calculate the total number of products in the cart //
// Création d'une fonction pour calculer le nombre total de produit dans le panier //
function getNumberProduct() {
    let cart = productSaveInLocalStorage
    let number = 0
    for (let product of cart) {
        number += product.quantity
    }
    return number
}

// Creation of a function to calculate the total of products in the cart //
// We retrieve the place where the price of the items is placed thanks to its id then with parseInt we transform the price into a number to be able to add it to the total and this for each element //
// Création d'une fonction pour calculer le total des produits du panier //
// On récupére l'endroit où est placé le prix des articles grace à son id puis avec parseInt on transforme le prix en nombre pour pouvoir l'ajouter à total et cela pour chaque élement // 
function getTotalPrice() {
    let productPriceCart = document.querySelectorAll(".cart__item__content__description__price")
    let total = 0
    productPriceCart.forEach((element) => {
        total += parseInt(element.innerText)
        totalPrice.innerText = total
    })
    return total
}

// Creation of a function to save the result of a deletion or a quantity change in the localStorage //
// Création d'une fonction pour sauvegarder le résultat d'une suppression ou d'un changement de quantité dans le localStorage //
function saveCart(product) {
    localStorage.setItem("product", JSON.stringify(productSaveInLocalStorage))
}

// Create a function to remove an item from the cart using the position //
// The position added as an attribute is used to delete the desired item, //
// then we save the localStorage once the deletion is done and reload the page and finally we recalculate the total price //
// Création d'une fonction pour supprimer un article du panier en utilisant la position //
// On utilise la position que l'on a ajoutée en attribut pour supprimer l'article souhaité, //
// puis on sauvegarde le localStorage une fois la suppression effectuée et recharge la page et enfin on recalcule le prix total //
function removeFromBasket(position) {
    let productdelete = productSaveInLocalStorage.splice(position, 1)
    saveCart()
    location.reload()
    getTotalPrice()
}

// Creation of a function to change the quantity of products using the value and position //
// We use the function updatePrices(), the function getTotalPrice(), the function saveCart() and we use the function getNumberProduct() //
// Création d'une fonction pour changer la quantité des produits en utilisant la valeur et la position //
// On utilise la fonction updatePrices(), la fonction getTotalPrice(), la fonction saveCart() et on utilise la fonction getNumberProduct() // 
function changeQuantity(value, position) {
    productSaveInLocalStorage[position].quantity = parseInt(value)
    saveCart()
    updatePrices()
    getTotalPrice()
    totalQuantity.innerText = getNumberProduct()
}


// If the basket is empty we write it down and make the form disappear //
// Si le panier est vide on l'écrit et on fait disparaître le formulaire //
if (productSaveInLocalStorage === null || productSaveInLocalStorage.length === 0) {
    let sectionCart = document.getElementById("cart__items")
    let form = document.querySelector(".cart__order__form")
    sectionCart.innerText = "Le panier est vide !"
    form.style.visibility = "hidden"
} else {
    // Otherwise, for each product in the basket, we create the DOM elements and fill them with the requested elements (id, image, ...) //
    // Sinon pour chaque produit du panier on crée les éléments du DOM et on les remplit par les éléments demandés (id, image, etc.) //
    productSaveInLocalStorage.forEach((oneProductInLocalStorage, index) => {
        let sectionCart = document.getElementById("cart__items")

        let articleCart = document.createElement("article")
        articleCart.classList.add("cart__item")
        articleCart.dataset.id = `${oneProductInLocalStorage._ID}`
        articleCart.dataset.color = `${oneProductInLocalStorage.color}`

        let divImageCart = document.createElement("div")
        divImageCart.classList.add("cart__item__img")

        let imageCart = document.createElement("img")
        imageCart.src = oneProductInLocalStorage.imageUrl
        imageCart.alt = oneProductInLocalStorage.altTxt

        let divContentCart = document.createElement("div")
        divContentCart.classList.add("cart__item__content")

        let divContentDescriptionCart = document.createElement("div")
        divContentDescriptionCart.classList.add("cart__item__content__description")

        let titleProductCart = document.createElement("h2")
        titleProductCart.innerText = oneProductInLocalStorage.name

        let paragrapheProductColorCart = document.createElement("p")
        paragrapheProductColorCart.innerText = oneProductInLocalStorage.color

        let paragrapheProductPriceCart = document.createElement("p")
        paragrapheProductPriceCart.classList.add("cart__item__content__description__price")

        let divContentSettings = document.createElement("div")
        divContentSettings.classList.add("cart__item__content__settings")

        let divContentSettingsQuantity = document.createElement("div")
        divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")

        let paragrapheProductQuantityCart = document.createElement("p")
        paragrapheProductQuantityCart.innerText = "Qté :"

        // We add the attributes value and position for the function changeQuantity() //
        // On ajoute les attributs value et position pour la function changeQuantity() //
        let inputProductQuantityCart = document.createElement("input")
        inputProductQuantityCart.classList.add("itemQuantity")
        inputProductQuantityCart.setAttribute("type", "number")
        inputProductQuantityCart.setAttribute("name", "itemQuantity")
        inputProductQuantityCart.setAttribute("min", 1)
        inputProductQuantityCart.setAttribute("max", 100)
        inputProductQuantityCart.setAttribute("value", oneProductInLocalStorage.quantity)
        inputProductQuantityCart.setAttribute("position", index)


        let divContentSettingsDelete = document.createElement("div")
        divContentSettingsDelete.classList.add("cart__item__content__settings__delete")

        // We add the position attribute for the removeFromBasket() function//
        // On ajoute l'attribut position pour la function removeFromBasket() //
        let paragrapheProductDeleteItemCart = document.createElement("p")
        paragrapheProductDeleteItemCart.classList.add("deleteItem")
        paragrapheProductDeleteItemCart.setAttribute("position", index)
        paragrapheProductDeleteItemCart.innerText = "Supprimer"

        // Inserting elements in their parent tag //
        //Insertion des éléments dans leur balise parente //
        divContentSettingsDelete.append(paragrapheProductDeleteItemCart)

        divContentSettingsQuantity.append(paragrapheProductQuantityCart)
        divContentSettingsQuantity.append(inputProductQuantityCart)


        divContentSettings.append(divContentSettingsQuantity)
        divContentSettings.append(divContentSettingsDelete)

        divContentDescriptionCart.append(titleProductCart)
        divContentDescriptionCart.append(paragrapheProductColorCart)
        divContentDescriptionCart.append(paragrapheProductPriceCart)

        divContentCart.append(divContentDescriptionCart)
        divContentCart.append(divContentSettings)

        divImageCart.append(imageCart)

        articleCart.append(divImageCart)
        articleCart.append(divContentCart)

        sectionCart.append(articleCart)

        // Add the total number of items to the desired location using the getNumberProduct() function //
        // Ajout du nombre total d'articles à l'emplacement souhaité grâce à la fonction getNumberProduct() //
        totalQuantity.innerText = getNumberProduct()

        // Add the total price to the desired location using the getTotalPrice() function //
        // Ajout du prix total à l'emplacement souhaité grâce à la fonction getTotalPrice() //
        getTotalPrice()
    });
}

// We get the class of paragraphs containing the price of each item//
// On récupére la classe des paragraphes contenant le prix de chaque article //
let productPriceCart = document.querySelectorAll(".cart__item__content__description__price")

let productData

// We retrieve the price of each product in the basket from the api with fetch because we have not saved the price in the localStorage to avoid any fraud //
// On récupére le prix de chaque produit du panier depuis l'api avec fetch car nous n'avons pas sauvegardé le prix dans le localStorage pour éviter toutes fraudes //
fetch(`http://localhost:3000/api/products/`)
    .then(response => response.json())
    .then((response2) => {
        productData = response2
        productSaveInLocalStorage.forEach((product, index) => {
            const foundProduct = response2.find(apiProduct => apiProduct._id === product._id)
        })
        updatePrices()
        getTotalPrice()
    })

// Creation of a function to update prices //
// For each product of the localStorage, we create a variable that returns the value of the first element with the same id //
// finally by multiplying the number of products by the price//
// Création d'une fonction pour mettre à jour les prix //
// Pour chaque produit du localStorage, on crée une variable qui renvoie la valeur du premier élément ayant le même id //
// enfin en multiplie le nombre de produits par le prix //
function updatePrices() {
    productSaveInLocalStorage.forEach((product, index) => {
        const foundProduct = productData.find(apiProduct => apiProduct._id === product._id)
        productPriceCart[index].innerText = foundProduct.price * product.quantity + " €"
    })

}

// We get the class of "delete" buttons //
// On récupére la classe des boutons "supprimer" //
let buttonRemoveToCart = document.querySelectorAll(".deleteItem")

// We add an eventListener to the "click" on the different "delete" buttons and we apply removeFromBasket depending on the position //
// On ajoute un eventListener au "click" sur les différents boutons "supprimer" et on applique removeFromBasket en fonction de la position //
buttonRemoveToCart.forEach(button => {
    button.addEventListener('click', function handleClick(event) {
        const position = event.target.getAttribute("position")
        removeFromBasket(position)
    })
})

// We retrieve the class of quantity inputs //
// On récupére la classe des inputs de quantité //
let inputQuantity = document.querySelectorAll(".itemQuantity")

// For each input, we add an eventListener to the "change" and we apply changeQuantity according to the position and the value //
// Pour chaque input, on ajoute un eventListener au "change" et on applique changeQuantity en fonction de la position et de la valeur //
inputQuantity.forEach(quantity => {
    quantity.addEventListener('change', function handleClick(event) {
        const value = this.value
        const position = event.target.getAttribute("position")
        changeQuantity(value, position)
    })
})


// ---------- Vérification du formulaire ---------- //

// We get the form//
// On récupére le formulaire //
let form = document.querySelector(".cart__order__form")

// We add an event to the submission of the form then we get each field and we create the regular expressions //
// On ajoute un event à la soumission du formulaire puis on y récupére chaque champ et on crée les expressions régulières //
form.addEventListener("submit", (e) => {
    let firstName = document.getElementById("firstName")
    let errorFirstName = document.getElementById("firstNameErrorMsg")
    let lastName = document.getElementById("lastName")
    let errorLastName = document.getElementById("lastNameErrorMsg")
    let address = document.getElementById("address")
    let errorAddress = document.getElementById("lastNameErrorMsg")
    let city = document.getElementById("city")
    let errorCity = document.getElementById("cityErrorMsg")
    let email = document.getElementById("email")
    let errorEmail = document.getElementById("emailErrorMsg")
    let regexName = /^[a-zA-Z-\s]+$/
    let regexAddress = /^[a-zA-Z0-9-\s']+$/
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let mini = 3

    // Si sa valeur est vide, une erreur se déclenche sinon on teste la RegExp. Si elle est fausse une nouvelle erreur se déclenche // 
    // S'il y a trop peu de lettres on déclenche une nouvelle erreur // 
    if (firstName.value == "") {
        errorFirstName.innerHTML = "Le champ Prénom est requis"
        e.preventDefault()
    } else if (regexName.test(firstName.value) == false) {
        errorFirstName.innerHTML = "Le champ Prénom ne peut contenir que des lettres et des tirets"
        e.preventDefault()
    } else if (firstName.value.length < mini) {
        errorFirstName.innerHTML = "Le champ Prénom doit contenir 3 lettres minimums"
        e.preventDefault()
    }
    if (lastName.value == "") {
        errorLastName.innerHTML = "Le champ Nom est requis"
        e.preventDefault()
    } else if (regexName.test(lastName.value) == false) {
        errorLastName.innerHTML = "Le champ Nom ne peut contenir que des lettres et des tirets"
        e.preventDefault()
    } else if (lastName.value.length < mini) {
        errorLastName.innerHTML = "Le champ Nom doit contenir 3 lettres minimums"
        e.preventDefault()
    }
    if (address.value == "") {
        errorAddress.innerHTML = "Le champ Adresse est requis"
        e.preventDefault()
    } else if (regexAddress.test(address.value) == false) {
        errorAddress.innerHTML = "Le champ Adresse ne peut contenir que des lettres, des tirets et des chiffres"
        e.preventDefault()
    } else if (address.value.length < mini) {
        errorAddress.innerHTML = "Le champ Adresse doit contenir 3 lettres minimums"
        e.preventDefault()
    }
    if (city.value == "") {
        errorCity.innerHTML = "Le champ Ville est requis"
        e.preventDefault()
    } else if (regexName.test(city.value) == false) {
        errorCity.innerHTML = "Le champ Ville ne peut contenir que des lettres et des tirets"
        e.preventDefault()
    } else if (city.value.length < mini) {
        errorCity.innerHTML = "Le champ Ville doit contenir 3 lettres minimums"
        e.preventDefault()
    }
    if (email.value == "") {
        errorEmail.innerHTML = "Le champ Email est requis"
        e.preventDefault()
    } else if (regexEmail.test(email.value) == false) {
        errorEmail.innerHTML = "Le champ Email doit être écrit comme ceci: julienpark@gmail.com"
        e.preventDefault()
    }

})

// Creation of a function to send a Post request to the api //
// Création d'une fonction pour envoyer une requête Post à l'api //
async function createRequestPost() {
    // We use map() to return each product in the cart //
    // On utilise map() pour retourner chaque produit du panier //
    let idFromProducts = productSaveInLocalStorage.map(product => product._id)

    // Creation of the object containing the data to be sent to the back-end //
    // Création de l'objet contenant les données à envoyer au back-end //
    let userPlacesOrder = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        },
        products: idFromProducts
    }

    // Send object to back-end with fetch //
    // Envoi de l'objet au back-end avec fetch //
    let response = await fetch(`http://localhost:3000/api/products/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userPlacesOrder)
    })

    // To see the result of the server response and add it to the url of the confirmation page //
    // Pour voir le résultat de la réponse du serveur et l'ajouter à l'url de la page de confirmation //
    try {
        let content = await response.json()
        window.location.href = "./confirmation.html?orderId=" + content.orderId
    } catch (e) {
        console.log(e)
        alert(`La page a rencontré un problème! \nEssayez de recharger la page et si le problème persiste essayez de contacter le support. \nDésolé pour ce désagrément!\nErreur: ${response.status}`)
    }
}

//We get the Id of the command button //
// On récupére l'Id du bouton commander //
let buttonToOrder = document.getElementById("order")

// We add a click event that sends the request to the server and sends us to the confirmation page //
// On lui ajoute un événement au click qui envoie la requête au serveur et nous envoie sur la page de confirmation //
buttonToOrder.addEventListener("click", (e) => {
    e.preventDefault()
    createRequestPost()
})

