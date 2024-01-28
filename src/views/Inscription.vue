<template>
    <div class="ingredient-form">
        <h2>Créer un nouveau compte</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">Login</label>
            <input v-model="utilisateur.login" type="text" required class="input-field" />

            <label for="prix">Nom</label>
            <input v-model="utilisateur.nom" type="text" required class="input-field" />

            <label for="prix">Prénom</label>
            <input v-model="utilisateur.prenom" type="text" required class="input-field" />

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
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fafafa;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.ingredient-form h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.ingredient-form form {
  display: grid;
  gap: 20px;
}

.ingredient-form label {
  font-weight: bold;
  font-size: 16px;
  color: #444;
}

.ingredient-form input,
.ingredient-form textarea {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s, background-color 0.3s;
}

.ingredient-form input:focus,
.ingredient-form textarea:focus {
  border-color: #4caf50;
  background-color: #fff;
}

.ingredient-form button {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.ingredient-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.ingredient-form button:hover {
  background-color: #45a049;
}
</style>

