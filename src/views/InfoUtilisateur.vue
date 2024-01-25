<template>
    <div class="ingredient-form">
        <h2>Profil</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">login:</label>
            <input v-model="utilisateur.login" type="text" required class="input-field" />

            <label for="description">adresse E-mail:</label>
            <textarea v-model="utilisateur.adresseEmail" type="email" required class="input-field"></textarea>

            <label for="prix">nom</label>
            <input v-model="utilisateur.nom" type="text" required class="input-field" />

            <label for="prix">prénom</label>
            <input v-model="utilisateur.prenom" type="text" required class="input-field" />

            <button type="submit" class="submit-button">Modifier profil</button>
        </form>
    </div>
</template>
  


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { flashMessage } from '@smartweb/vue-flash-message';
import { storeAuthentification } from '@/storeAuthentification';

const router = useRouter();

let utilisateur = ref({
    login: '',
    adresseEmail: '',
    nom: '',
    prenom: '',
    mdp: '',
});
function fillProfil() {
    console.log(storeAuthentification.userId);

    fetch(encodeURI('https://localhost:8000/api/utilisateurs/' + storeAuthentification.userId))
        .then((reponsehttp) => reponsehttp.json())
        .then((reponseJSON) => {
            utilisateur.value = reponseJSON;
            console.log(reponseJSON);

        })
        .catch((error) => {
            console.error('Erreur lors du chargement du profil:', error);
        });
}

onMounted(() => {
    fillProfil();
});

function submitForm() {
    console.log(storeAuthentification.userId);
    fetch('https://localhost:8000/api/utilisateurs/' + storeAuthentification.userId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': 'Bearer ' + storeAuthentification.JWT
        },
        body: JSON.stringify({
            login: utilisateur.value.login,
            adresseEmail: utilisateur.value.adresseEmail,
            nom: utilisateur.value.nom,
            prenom: utilisateur.value.prenom,
            plainPassword: utilisateur.value.mdp,
        }),
    })
        .then((reponsehttp) => {
            if (reponsehttp.status !== 200) {
                console.log('Échec');
                return reponsehttp.json();
            } else {
                console.log('Succès');
                return null;
            }
        })
        .then((reponseJSON) => {
            if (reponseJSON) {
                const erreur = reponseJSON['hydra:description'];
                flashMessage.show({
                    type: 'error',
                    title: erreur,
                });
            } else {
                // router.push('/connexion');
                console.log('fguyguyg')
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la soumission du formulaire:', error);
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

