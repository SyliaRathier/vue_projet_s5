<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Materiel } from '@/types';
import { onMounted } from 'vue';
import { storeAuthentification } from '@/storeAuthentification'


const router = useRouter();
const props = defineProps<{ materiel: Materiel }>();
let utilisateur = '';

let utilisateurId: number;
let utilisateurLogin = '';

if (props.materiel.utilisateur) {
    utilisateurId = props.materiel.utilisateur.id;
    utilisateurLogin = props.materiel.utilisateur.login;
    console.log(utilisateurId + " " + utilisateurLogin);
}
</script>

<template>
    <div class="materiel-details">
        <div class="header">
            <h2>{{ materiel.nom }}</h2>
        </div>

        <div class="content">
            <p class="utilisation">{{ materiel.utilisation }}</p>
            <p class="description">{{ materiel.description }}</p>
            <img :src="'https://localhost:8000/image/materiel/' + materiel.imageName" alt="Materiel Image" loading="lazy" />
        </div>

        <div class="footer">
            <p>Prix : {{ materiel.prix }} €</p>
        </div>
        <div class="recipe-footer">
            <p>Créé par {{ utilisateur }}</p>
        </div>
        <button v-if="utilisateurId === storeAuthentification.userId">Mofifier</button>

    </div>
</template>
  
<style scoped>
.materiel-details {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.utilisation {
    font-weight: bold;
    margin-bottom: 10px;
}

.description {
    margin-bottom: 20px;
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.footer {
    text-align: center;
    font-size: 18px;
    color: #333;
}
</style>
  
  
