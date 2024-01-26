<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Recette } from '@/types';

const router = useRouter();
const props = defineProps<{ recette: Recette }>();

const getImageUrl = (file: File) => {
    return file ? URL.createObjectURL(file) : '';
};

</script>

<template>
    <div class="recipe-details">
        <div class="header">
            <h2>{{ recette.titre }}</h2>
        </div>

        <div class="info">
            <p>Durée : {{ recette.duree }}</p>
            <p>Prix : {{ recette.prix }}</p>
        </div>

        <div class="section">
            <h3>Ingredients</h3>
            <ul>
                <li v-for="ingredient in recette.ingredients" :key="ingredient.id">
                    {{ ingredient.idIngredient.nom }} - {{ ingredient.quantite }} {{ ingredient.unite }}
                </li>
            </ul>
        </div>

        <div class="section">
            <h3>Matériel</h3>
            <ul>
                <li v-for="materiel in recette.materiels" :key="materiel.id">
                    {{ materiel.nom }}
                </li>
            </ul>
        </div>

        <div class="section">
            <h3>Description</h3>
            <p>{{ recette.description }}</p>
        </div>

        <div class="image">
            <img :src="'https://localhost:8000/image/recette/' + recette.imageName" alt="Recipe Image" loading="lazy" />
        </div>

        <div class="section">
            <h3>Conseil</h3>
            <p>{{ recette.conseil }}</p>
        </div>

        <div class="footer">
            <p>Créé par {{ recette.utilisateur.login }}</p>
        </div>
    </div>
</template>
  
<style scoped>
.recipe-details {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.section {
    margin-bottom: 30px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 8px;
}

.image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.footer {
    margin-top: 20px;
    text-align: right;
    font-style: italic;
    color: #666;
}
</style>
