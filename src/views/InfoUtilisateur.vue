<template>
    <div class="ingredient-form">
        <h2>Profil</h2>
        <form @submit.prevent="submitForm" class="form-container">

            <img :src="'data:image/jpeg;base64,' + state.url" alt="Profil Image" loading="lazy" />

            <label for="name">Login</label>
            <input v-model="utilisateur.login" type="text" required class="input-field" />

            <label for="description">Adresse mail</label>
            <textarea v-model="utilisateur.adresseEmail" type="email" required class="input-field"></textarea>

            <label for="prix">Nom</label>
            <input v-model="utilisateur.nom" type="text" required class="input-field" />

            <label for="prix">Prénom</label>
            <input v-model="utilisateur.prenom" type="text" required class="input-field" />

            <button type="submit" class="submit-button">Modifier profil</button>
        </form>
        <div class="redirect-container">
            <div class="button-redirect" @click="redirectTo('/mesRecettes')">
                Mes Recettes
            </div>
            <div class="button-redirect" @click="redirectTo('/mesIngredients')">
                Mes Ingrédients
            </div>
            <div class="button-redirect" @click="redirectTo('/mesMateriels')">
                Mes Matériels
            </div>
        </div>


        <div class="button-logout" @click="logout">
            Déconnexion
        </div>
    </div>
</template>
  


<script setup lang="ts">

import md5 from 'crypto-js/md5';
import { onMounted, reactive, type Ref, ref, type UnwrapRef } from 'vue';
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

let state = reactive({
    url: '',
});
async function fillProfil() {
    console.log(storeAuthentification.userId);
    try {
        const response = await fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/utilisateurs/' + storeAuthentification.userId));
        return await response.json();
    } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
    }
}

onMounted(async () => {
    utilisateur.value = await fillProfil();
    await loadImage();
});

function submitForm() {
    console.log(storeAuthentification.userId);
    fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/utilisateurs/' + storeAuthentification.userId, {
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

function logout() {
    storeAuthentification.deconnexion();
    router.push('/recettes');
}

function redirectTo(url: string) {
    router.push(url);
}

async function loadImage() {
    try {
        const response = await fetch('https://webinfo.iutmontp.univ-montp2.fr/~henchiria/MyAvatar/public/my/avatar/' + md5(utilisateur.value.adresseEmail));
        state.url = await response.text();
    } catch (error) {
        console.error('Erreur lors du chargement de l\'image:', error);
    }
}


</script>




<style scoped>
@import "@/assets/userProfil.css";
</style>
