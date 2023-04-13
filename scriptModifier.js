// propriété et constructeur de la classe chanson
class Chanson{
    constructor(nom="", artiste="", image="") {
        this.nom = nom;
        this.artiste = artiste;
        this.image = image;
    }
}

// Affiche le message informatif quand on entre une lettre dans le nom
$("#name").keyup(function(){
    $(".text-danger-emphasis").removeClass("invisible");
});


// affiche les chansons comme je veux
function afficheChanson(chanson) {
    $.getJSON('https://64248bbe9e0a30d92b1e6948.mockapi.io/Chanson')
        .done(function (chansons) {
            for (chanson of chansons) {
                $('#ajoutDeChanson').append(`
                    <div class="carousel-item q">
                    <img class="d-block w-100" src="${chanson.image}" alt="">
                    <p class="mt-3" id="id">ID : ${chanson.id}</p>
                    <p>Titre : ${chanson.nom}</p>
                    <p class="mb-2">Artiste : ${chanson.artiste}</p>
                    </div>`)
            }
        });
}

// bouton ajouter fais aussi envoie du formulaire
function ajouter(){
    let numID = $("#numID").val();
    // créer un objet chanson
    const chanson = new Chanson(
        $('#name').val(),
        $('#artiste').val(),
        $('#img').val()
    );
    $.ajax('https://64248bbe9e0a30d92b1e6948.mockapi.io/Chanson', {
        data: JSON.stringify(chanson),
        contentType: 'application/json',
        type: 'POST',
         })
    // enregistre l'id dans le local storage, en concatènant le nom du local storage
    localStorage.setItem(`musique${numID}`, numID.toString());
}

// bouton modifier
function modifier(){
    let numID = $("#numID").val();
    // créer un nouveau objet qui va remplacer l'autre
    const chanson = new Chanson(
        $('#name').val(),
        $('#artiste').val(),
        $('#img').val()
    );
    // va chercher id dans local storage pour voir si l'utilisateur à ajouter la chanson
    const chansonStorage = JSON.parse(localStorage.getItem(`musique${numID}`));
    // compare id trouver avec celui du local storage
    if (chansonStorage.toString() === numID){
    fetch('https://64248bbe9e0a30d92b1e6948.mockapi.io/Chanson/'+numID,{
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body : JSON.stringify(chanson)
    }).then(function (){
        $("#chanson"+$("#id").val()).text($("#id").val() + ", " + $("#name").val() + ", " + $("#artiste").val() + ", " + $("#img").val());
    })
    // si l'id est pas trouvé l'utilisateur ne peut pas modifier la chanson
    } else{
        alert("Vous ne pouvez pas modifier cette chanson");
    }
}

// bouton supprimer
function supprimer(){
    let numID = $("#numID").val();
    // enlève le champ required des inputs quand on supprime parce qu'on a seulement besoin l'id
    $("#name").removeAttr("required");
    $("#artiste").removeAttr("required");
    $("#img").removeAttr("required");
    // va chercher id dans local storage pour voir si l'utilisateur à ajouter la chanson
    const chansonStorage = JSON.parse(localStorage.getItem(`musique${numID}`));
    // compare id trouver avec celui du local storage
    if (chansonStorage.toString() === numID) {
                fetch('https://64248bbe9e0a30d92b1e6948.mockapi.io/Chanson/' + numID, {
                    method: 'DELETE',
                }).then(function () {
                    $("#chanson" + $("#id").val()).remove()
                        .catch(error => console.error(error));
                });
    // si l'id est pas trouvé l'utilisateur ne peut pas supprimer la chanson
    } else {
        alert("Vous ne pouvez pas supprimer cette chanson");
    }
}

afficheChanson();



//$("#btnSupprimer").on("click", function() {
   // if (confirm("Êtes-vous sûr de vouloir supprimer cette chanson ?")) {
   // }







