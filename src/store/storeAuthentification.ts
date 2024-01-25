import { reactive } from 'vue'
import VueJwtDecode from 'vue-jwt-decode'
import type { Utilisateur } from '@/types';
import { type ref } from 'vue';

export const storeAuthentification = reactive({
  JWT: "",
  estConnecte: false,
  user: Object as PropType<Utilisateur>,
  connexion(login: string, motDePasse: string, succes:()=>void, echec:()=>void): void{
    //fait le fetch et change le JWT si succès
    //execute succes ou echec en fonction du succès de l'authentification
    fetch("https://localhost:8000/api/auth", {
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
                console.log(VueJwtDecode.decode(this.JWT))
                this.user.login = VueJwtDecode.decode(this.JWT).username
                this.user.id = VueJwtDecode.decode(this.JWT).id
                this.user.adresseEmail= VueJwtDecode.decode(this.JWT).adresseMail
                this.user.premium = VueJwtDecode.decode(this.JWT).premium
                console.log(this.user.id)
                succes();
                console.log(this.JWT);
                }
            );
            
        }})
        
    }, 
    deconnection() : void{
        this.JWT = "";
        this.estConnecte = false
    }      
}
);

