<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient, Categorie } from '@/types';
import BoiteIngredient from '@/components/BoiteIngredient.vue';
import { useRoute } from 'vue-router'

const page = ref(1);
const hasNextPage = ref(true);
const loading = ref(false);

// Toutes les recettes
const ingredients: Ref<Ingredient[]> = ref([]);
const images = ref([]);
async function chargerFeed(idCategorie: string) {
    if (idCategorie == '0') {
        if (!hasNextPage.value || loading.value) return;

        loading.value = true;

        fetch(encodeURI(`https://localhost:8000/api/ingredients?page=${page.value}`))
            .then(reponsehttp => reponsehttp.json())
            .then(async reponseJSON => {
                ingredients.value = [...ingredients.value, ...reponseJSON['hydra:member']];
                hasNextPage.value = reponseJSON['hydra:member'].length < reponseJSON['hydra:totalItems'];
                page.value += 1;
            });

        loading.value = false;

    } else {
        fetch(encodeURI(`https://localhost:8000/api/categorie_ingredients/${idCategorie}`))
            .then(reponsehttp => reponsehttp.json())
            .then(async reponseJSON => {
                ingredients.value = await reponseJSON["ingredients"];
            });
    }
}


function chargerSuite(idCategorie: string) {
    chargerFeed(idCategorie);
}

// Liste des catégorie pour champs select

const categories: Ref<Categorie[]> = ref([]);
async function chargerCategorie() {
    fetch(encodeURI('https://localhost:8000/api/categorie_ingredients'))
        .then(reponsehttp => reponsehttp.json())
        .then(async reponseJSON => {
            categories.value = await reponseJSON["hydra:member"];
        });
}


onMounted(async () => {
    await chargerCategorie()
    await chargerFeed('0')
})

const selected = ref('')

</script>


<template>
    <div>Selected: {{ selected }}</div>

    <select v-model="selected" @change="chargerFeed(selected)">
        <option disabled value="">Please select one</option>
        <option value="0">All Categories</option>
        <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
            {{ categorie.nom }}
        </option>
    </select>
    <div class="recipe-list">
        <BoiteIngredient v-for="ingredient in ingredients" :key="ingredient.id" :ingredient="ingredient" />
        <button v-if="ingredients.length >= 25" @click="chargerSuite(selected)" :disabled="loading">Charger la
            suite</button>

    </div>
</template>

<style scoped>
.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
