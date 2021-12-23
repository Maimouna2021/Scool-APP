//RECUPERATION DES ELEMENTS DU FORMULAIRE
const nom = document.getElementById("id_nom");
const prenom = document.getElementById("id_prenom");
const niveau = document.getElementById("id_niveau");
const biographie = document.getElementById("id_biographie");
const ajouter = document.getElementById("btn_ajouter");

//CREATION DE CARTES
propositionElement = document.getElementById("idCartes")

ajouter.addEventListener("click", (event)=>{
    event.preventDefault()
    //RECUPERATION DES VALEURS DES ELEMENTS DU FORMULAIRE
    const recupNom = nom.value; 
    const recupPrenom = prenom.value; 
    const recupNiveau = niveau.value; 
    const recupBiographie = biographie.value; 

    //CREATION DE VARIABLE POUR STOCKER DES ELEMENTS
    const elements ={
        nom : recupNom,
        prenom : recupPrenom,
        niveau : recupNiveau,
        biographie : recupBiographie,
    }
    console.log(nom)


    //RAPPELER LA CARTE
    carte(elements);

})
    //L'AFFICHAGE DES VALEURS DES ELEMENTS DU FORMULAIRE
const carte = (infos)=>{
    propositionElement.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"Special title treatment>${infos.nom}   ${infos.prenom}</h5>
            <p class="card-text">${infos.biographie}</p>
            <span>${infos.niveau}</span>
          </div>
        </div>
      </div>
      `)
}

