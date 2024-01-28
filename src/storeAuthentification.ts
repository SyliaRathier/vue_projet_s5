import { reactive } from 'vue'
import VueJwtDecode from 'vue-jwt-decode'


export const storeAuthentification = reactive({
  JWT: "",
  estConnecte: false,
  userId: 0,
  adresseEmail: "",
  username: "",
  premium: "",

  connexion(login: string, motDePasse: string, succes:()=>void, echec:()=>void): void{
    //fait le fetch et change le JWT si succès
    //execute succes ou echec en fonction du succès de l'authentification
    fetch("https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/auth", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "login": login,
            "password": motDePasse
          }),
    }).then(reponsehttp => {
        if(reponsehttp.status!== 200){
            this.estConnecte = false;
            echec();
        }else{
            reponsehttp.json()
            .then(reponseJSON => {
                this.JWT = reponseJSON.token;
                this.estConnecte = true;
                console.log(VueJwtDecode.decode(this.JWT).id)
                this.username = VueJwtDecode.decode(this.JWT).username
                this.userId = VueJwtDecode.decode(this.JWT).id
                this.adresseEmail= VueJwtDecode.decode(this.JWT).adresseMail
                this.premium = VueJwtDecode.decode(this.JWT).premium
                succes();
                // console.log(this.JWT);
                }
            );
            
        }})
        
    }, 
    deconnexion() : void{
        this.JWT = "";
        this.estConnecte = false
    }      
}
);

