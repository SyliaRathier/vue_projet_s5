<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Ingredient } from '@/types';
import { onMounted } from 'vue';
import { storeAuthentification } from '@/storeAuthentification'
import { flashMessage } from '@smartweb/vue-flash-message';

const router = useRouter();
const props = defineProps<{ ingredient: Ingredient }>();

let utilisateurId: number;
let utilisateurLogin = '';

if (props.ingredient.utilisateur) {
    utilisateurId = props.ingredient.utilisateur.id;
    utilisateurLogin = props.ingredient.utilisateur.login;
    console.log(utilisateurId + " " + utilisateurLogin);
}

</script>

<template>
    <div class="ingredient-details">
        <div class="header">
            <h2>{{ ingredient.nom }}</h2>
        </div>

        <div class="content">
            <p>{{ ingredient.description }}</p>
            <img :src="'https://localhost:8000/img/ingredient/' + ingredient.imageName" alt="Ingredient Image"
                loading="lazy" />
        </div>

        <div class="footer">
            <p>Prix : {{ ingredient.prix }}</p>
        </div>
        {{ ingredient.id }}
        <!-- <button v-if="utilisateurId === storeAuthentification.userId"
            @click.prevent="deleteIngredient(ingredient.id)">Supprimer</button> -->

    </div>
</template>
  
<style scoped>
.ingredient-details {
    max-width: 600px;
    margin: 0 auto;
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

.content {
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
  
