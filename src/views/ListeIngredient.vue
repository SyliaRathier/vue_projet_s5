<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient, Categorie } from '@/types';
import BoiteIngredient from '@/components/BoiteIngredient.vue';
import { useRoute } from 'vue-router'


// Toutes les ingredients
const ingredients: Ref<Ingredient[]> = ref([]);
function chargerFeed() {
    fetch(encodeURI('https://localhost:8000/api/ingredients'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            ingredients.value = reponseJSON["hydra:member"];
        });
}
onMounted(() => {
    chargerFeed()
})

// Liste des catégorie pour champs select

const categories: Ref<Categorie[]> = ref([]);
function chargerCategorie() {
    fetch(encodeURI('https://localhost:8000/api/categorie_ingredients'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            categories.value = reponseJSON["hydra:member"];
            console.log(categories.value)
        });
}


onMounted(() => {
    chargerCategorie()
})


const selected = ref('')
const id = ref('')

</script>


<template>
    <div>Selected: {{ selected }}</div>

    <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option v-for="categorie in categories" :key="categorie.id" :categorie="categorie" :value="categorie.id"
            @updated="chargerCategorie()">{{
                categorie.nom }}</option>
    </select>
    <div class="recipe-list">
        <BoiteIngredient v-for="ingredient in ingredients" :key="ingredient.id" :ingredient="ingredient"
            @updated="chargerFeed()" />
    </div>
</template>

<style scoped>
.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
