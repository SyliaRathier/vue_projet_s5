<template>
    <div class="ingredient-form">
        <h2>Créer un nouvel ingrédient</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">login:</label>
            <input v-model="utilisateur.login" type="text" required class="input-field" />

            <label for="description">adresse E-mail:</label>
            <textarea v-model="utilisateur.email" type="email" required class="input-field"></textarea>

            <label for="prix">nom</label>
            <input v-model="utilisateur.nom" type="text" required class="input-field" />

            <label for="prix">prénom</label>
            <input v-model="utilisateur.prenom" type="text" required class="input-field" />

            <label for="prix">mot de passe</label>
            <input v-model="utilisateur.mdp" type="password" required class="input-field" />

            <button type="submit" class="submit-button">Créer l'ingrédient</button>
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
    fetch("https://localhost:8000/api/utilisateurs", {
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
.ingredient-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

h2 {
    text-align: center;
    color: #333;
}

.form-container {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
    font-weight: bold;
    color: #555;
}

.input-field {
    width: 100%;
    padding: 8px;
    margin: 6px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

textarea {
    resize: vertical;
}

.submit-button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #45a049;
}
</style>

