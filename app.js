const API_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTY0NzA1MSwiZXhwIjoxOTU1MjIzMDUxfQ.pgqswSXOvAmmn3T_hcMtI6lNpGNTwf9AynqQmKWXXQg"

const API_URL = "https://wamnvqxjmbqdpfqoyypu.supabase.co/rest/v1/infos"

//RECUPERATION DES ELEMENTS DU FORMULAIRE
const nom = document.getElementById("id_nom");
const prenom = document.getElementById("id_prenom");
const niveau = document.getElementById("id_niveau");
const biographie = document.getElementById("id_biographie");
const inputNom = document.querySelector("input#id_nom");
const ajouter = document.getElementById("btn_ajouter");
const btnSauvegarder = document.getElementById("idBtnSauvegarder");
let tableauElements =  []
const principal = document.getElementById("princ")

//OCTROYAGE DE NOMBRE MAXIMAL DE SAISIE
let max = 50
biographie.maxLength=max

biographie.addEventListener("input", ()=>{
  let caratere = biographie.value.length
if (caratere == max) {
  biographie.style.color="green"
  
}else{
  biographie.style.color="black"

}
  //Remplacement du text saisie par le nombre de caractere
  document.getElementById("nbre").innerHTML=caratere

})

//CREATION DE CARTES
propositionElement = document.getElementById("idCartes")

    //L'AFFICHAGE DES VALEURS DES ELEMENTS DU FORMULAIRE
    const carte = (datas, propositionElement)=>{
    const idBouttonModifier = "btnModifier" + Math.random()
    const idBouttonSupprimer = "btnSupprimer" + Math.random()
    const idBouttonDetails = "btnDetails" + Math.random()
    const idCard = "btnCard" + datas.id 
      propositionElement.insertAdjacentHTML(
          "afterbegin",
          `
          <div class="col col-sm-6 p-2 text-dark" id=${idCard}>
          <div class="card">
            <div class="card-body">
            <img src="images/maimouna.png" class="imageapp" alt="">
              <h5 class="card-title"Special title treatment>${datas.nom}  ${datas.prenom}</h5>
              <p class="card-text">${datas.biographie}</p>
              <span>${datas.niveau}</span>
              <a href="#" class="card-link" id = ${idBouttonModifier}>Modifier</a>
              <a href="#" class="card-link" id = ${idBouttonSupprimer}>Supprimer</a>
              <a href="#" class="card-link" id = ${idBouttonDetails}>Detali</a>
            </div>
          </div>
        </div>
        `
        )
        document.getElementById(idBouttonDetails).addEventListener("click", ()=>{
        

          localStorage.setItem("Apprenant", JSON.stringify(datas))
          location.href = 'Detail.html'
          
        })

      //RECUPERATION DES BOUTTONS MODIFIER ET SUPPRIMER
      const btnModifier  = document.getElementById(idBouttonModifier)
      const btnSupprimer  = document.getElementById(idBouttonSupprimer)
      const btnCard = document.getElementById(idCard)



      btnModifier.addEventListener("click", (event)=>{
        event.preventDefault()

        tableauElements.forEach(elements=>{
          nom.value = elements.nom
          prenom.value = elements.prenom
          niveau.value = elements.niveau
          biographie.value = elements.biographie
          btnCard.replaceChildren(btnCard)
          btnCard.removeChild(btnCard)
        })
      })
      btnSupprimer.addEventListener("click", (event)=>{
        event.preventDefault()
        btnCard.remove(btnCard)
        btnCard.removeChild(btnCard)

        return false;
      })
      
    }

  ajouter.addEventListener("click", (event)=>{
    event.preventDefault()
    //RECUPERATION DES VALEURS DES ELEMENTS DU FORMULAIRE
    const recupNom = nom.value; 
    const recupPrenom = prenom.value; 
    const recupNiveau = niveau.options[niveau.selectedIndex].value
    const recupBiographie = biographie.value; 

    //VERIFICALTION DES CHAMPS S'ILS SONT VIDES APLLIQUE LA COULEUR COUGE
    if(recupNom == ""){
      nom.style.border= "1px solid red"
      nom.focus()
      document.getElementById('require_nom').style.display="block"
    }else if (recupPrenom == "") {
      prenom.style.border= "1px solid red"
      document.getElementById("require_prenom").style.display="block"
      prenom.focus()
    }
    else if (recupNiveau == "") {
      niveau.style.border= "1px solid red"
      document.getElementById("require_niveau").style.display="block"
      prenom.focus()
    }
    else if (recupBiographie == "") {
      niveau.style.border= "1px solid red"
      document.getElementById("require_biographie").style.display="block"
      prenom.focus()
    }
    else{
      //CREATION DE VARIABLE POUR STOCKER DES ELEMENTS
      const elements ={
          nom : recupNom,
          prenom : recupPrenom,
          niveau : recupNiveau,
          biographie : recupBiographie,
      }
      console.log(elements)

  
        //RAPPELER LA CARTE
        carte(elements, propositionElement);
        tableauElements.push(elements);

    }


      //VIDER LES INFOS SAISIES DANS LE FORMULAIRE
     document.getElementById("form").reset()

   })
   
      //ECOUTER L'EVENEMENT DU BOUTTON SAUVEGARDER
  btnSauvegarder.addEventListener("click", (event)=>{
    event.preventDefault()

     //
    principal.innerHTML = ""

   //ENVOYER LES DONNEES VERS SUPABASE
   tableauElements.forEach((parcourt)=>{
    fetch(API_URL, {
      method: "POST",
      headers: {
        apikey: API_KEY,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(parcourt),
    })
      .then((response) => response.json())
      .then((data) => {
        ideeCreeAuNiveauAPI = data[0]
        carte(ideeCreeAuNiveauAPI, principal)
      })
   })

   // AFFICHAGE DE LA DES IDEES
   // window.addEventListener("DOMContentLoaded", (event) => {
    //  event.preventDefault()
      //RECUPERATION DES DONNEES VIA API
      fetch(API_URL, {
        headers: {
          apikey: API_KEY,
        },
      })
        .then((response) => response.json())
        .then((infos) => {
          infos.forEach((idee) => {
            carte(idee, principal)
          })
        })
    //})
    })

