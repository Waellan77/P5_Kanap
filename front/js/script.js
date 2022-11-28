// Retrieval of the <section> tag by id //
//Récupération de la balise <section> par son id //
let items = document.getElementById('items')

// Using fetch to retrieve products from the API //
// Utilisation de fetch pour récupérer les produits depuis l'API //
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(response2 => {
        response2.forEach(kanap => {
            // For each product of the table, we create the different HTML tags //
            // Pour chaque produit du tableau, on crée les différentes balises HTML //
            let a = document.createElement("a")
            let article = document.createElement("article")
            let image = document.createElement("img")
            let title = document.createElement("h3")
            let paragraphe = document.createElement("p")

            // Filling the links for each product with their id, image source and text // 
            // Remplissage des liens pour chaque produit avec leur id, de la source de l'image et des textes //
            a.href = "./product.html?id=" + kanap._id
            image.src = kanap.imageUrl
            image.alt = kanap.altTxt
            title.classList.add("productName")
            title.innerText = kanap.name
            paragraphe.classList.add("productDescription")
            paragraphe.innerText = kanap.description

            // Inserting elements in their parent tag //
            //Insertion des éléments dans leur balise parente //
            article.append(image)
            article.append(title)
            article.append(paragraphe)

            a.append(article)

            items.append(a)
        });
    }).catch(error => {
        // If there is a problem, an error message is displayed //
        // S'il y a un problème, on affiche un message d'erreur //
        alert(`La page a rencontré un problème! \nEssayez de recharger la page et si le problème persiste essayez de contacter le support. \nDésolé pour ce désagrément!`)
    })
