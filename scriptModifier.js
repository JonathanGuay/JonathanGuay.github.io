function Chanson(nom="", artiste="", image=""){
    this.nom = nom;
    this.artiste = artiste;
    this.image = image;
}

function afficheChanson(chanson) {
    $.getJSON('https://64248bbe9e0a30d92b1e6948.mockapi.io/Chanson')
        .done(function (chansons) {
            for (chanson of chansons) {
                $('#ajoutDeChanson').append(`
                    <div class="carousel-item q">
                    <img class="d-block w-100" src="${chanson.image}" alt="">
                    <p class="mt-3" id='chanson${chanson.id}'>ID : ${chanson.id}</p>
                    <p>Titre : ${chanson.nom}</p>
                    <p class="mb-2">Artiste : ${chanson.artiste}</p>
                    <button class="btn btn-primary" value="Supprimer" onclick="supprimer()">Supprimer</button>
                    </div>`)
        }
    });
}
// Bouton ajouter
$("form").submit(function (){
    $.ajax('https://64248bbe9e0a30d92b1e6948.mockapi.io/Chanson', {
        data : JSON.stringify({"nom": $("#name").val(), "artiste": $("#artiste").val(), "image": $("#img").val() }),
        contentType : 'application/json',
        type : 'POST'
    });
});

function modifier(){
    fetch('https://64248bbe9e0a30d92b1e6948.mockapi.io/Chanson/'+$("#id").val(),{
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body : JSON.stringify({"nom": $("#name").val(), "artiste" : $("#artiste").val(), "image": $("#img").val()})
    }).then(function (){
        $("id"+$("#id").val()).text($("#id").val() + ", " + $("#name").val() + ", " + $("#artiste").val() + ", " + $("#img").val());
    })
}

// pour le lien URL mettre le lien / mettre le nom de la resource
function supprimer(){
    fetch('https://64248bbe9e0a30d92b1e6948.mockapi.io/Chanson/' +$("#id").val(), {
        method: 'DELETE',
    }).then(function (){
        $("id"+$("#id").val()).remove();
    });
}
afficheChanson();








// pour enregistrement en local
/*

function stockage2(){
    // Créer un objet
    const name = $('#name').val();
    const artiste = $('#artiste').val();
    const image = $('#image').val();

    const chanson = new Chanson(name, artiste, image);

    // Stocker l'objet dans le stockage local
    localStorage.setItem('LesChansons', JSON.stringify(chanson))
    return true;
}

const affiche = JSON.parse(localStorage.getItem('LesChansons'));

let liste = JSON.parse(localStorage.getItem('ListeDeChansons'));

if(liste === null){
    liste = [] // si c'est la première fois la liste est null donc il faut l'
}

liste.push(affiche);
localStorage.setItem('ListeDeChansons', JSON.stringify(liste));

for(i = 0; i < liste.length; i++){
    afficheChanson(liste[i]);
}

*/


// pour enregistrement sur serveur mockapi
/*



*/






// Lien serveur Mockapi :
// https://64248bbe9e0a30d92b1e6948.mockapi.io/Chanson










