<template>
    <div class="formulaire">
        <h2>Créer un nouveau compte</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">Login</label>
            <input v-model="utilisateur.login" type="text" required class="input-field" />

          <label for="prix">Prénom</label>
          <input v-model="utilisateur.prenom" type="text" required class="input-field" />

          <label for="prix">Nom</label>
          <input v-model="utilisateur.nom" type="text" required class="input-field" />

            <label for="description">Adresse mail</label>
            <textarea v-model="utilisateur.email" type="email" required class="input-field"></textarea>


            <label for="prix">Mot de passe</label>
            <input v-model="utilisateur.mdp" type="password" required class="input-field" />

            <button type="submit" class="submit-button">S'inscrire</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { flashMessage } from '@smartweb/vue-flash-message';
const router = useRouter();


const utilisateur = ref({
    login: '',
    email: '',
    nom: '',
    prenom: '',
    mdp: ''
});

function submitForm() {
    fetch("https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/utilisateurs", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: utilisateur.value.login,
            adresseEmail: utilisateur.value.email,
            nom: utilisateur.value.nom,
            prenom: utilisateur.value.prenom,
            plainPassword: utilisateur.value.mdp
        }),
    }).then(reponsehttp => {
        console.log(reponsehttp)
        let val = reponsehttp.json()
        console.log(val);
        let erreur;
        val.then(reponseJSON => {
            // ingredients.value = reponseJSON["ingredients"];
            console.log(reponseJSON["hydra:description"])
            erreur = reponseJSON["hydra:description"];

            if (reponsehttp.status !== 201) {
                console.log("Echec")
                flashMessage.show({
                    type: 'error',
                    title: erreur,
                });
            } else {
                console.log("Succes")
                router.push('/connexion')
            }
        })

    });
}
</script>

<style scoped>
@import "@/assets/form.css";
</style>

