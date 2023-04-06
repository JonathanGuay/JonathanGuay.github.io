/*
//1er partie de la méthode get
// Créer un objet à partir de l'URL
const params = new URLSearchParams(document.location.search);
const nom = params.get("nom"); // obtenir les valeurs envoyes par le formulaire
const don = params.get("don");  // les clés doivent être les attributs name
if (nom || don){
    affichePersonne(nom, don);
}
function affichePersonne(nom, don){
    $('#reception').append(
        `<p>Nom : ${nom}</p>
        <p>Don : ${don}</p>`    // guillement différent pour que ça marche
    );
}

// 2ème partie pour que la méthode post fonctionne
// Avec cette facon là, les données ne s'affiche pas dans l'URL
const personne = JSON.parse(localStorage.getItem('personne'));
affichePersonne(personne.nom, personne.don);


 */