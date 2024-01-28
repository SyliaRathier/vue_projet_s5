<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient, Categorie } from '@/types';
import BoiteIngredient from '@/components/BoiteIngredient.vue';
import { useRoute } from 'vue-router'



// Toutes les recettes
const ingredients: Ref<Ingredient[]> = ref([]);
const images = ref([]);
async function chargerFeed(idCategorie: string) {
    if (idCategorie == '0') {

        fetch(encodeURI(`https://localhost:8000/api/ingredients`))
            .then(reponsehttp => reponsehttp.json())
            .then(async reponseJSON => {
                ingredients.value = reponseJSON['hydra:member'];

            });


    } else {
        fetch(encodeURI(`https://localhost:8000/api/categorie_ingredients/${idCategorie}`))
            .then(reponsehttp => reponsehttp.json())
            .then(async reponseJSON => {
                ingredients.value = await reponseJSON["ingredients"];
            });
    }
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


onMounted(() => {
    chargerCategorie()
    chargerFeed('0')
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
    </div>
</template>

<style scoped>
.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
