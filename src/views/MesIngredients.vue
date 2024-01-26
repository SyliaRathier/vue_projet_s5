<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient, Categorie } from '@/types';
import BoiteIngredient from '@/components/BoiteIngredient.vue';
import { useRoute } from 'vue-router'
import { storeAuthentification } from '@/storeAuthentification';


// Toutes les recettes
const ingredients: Ref<Ingredient[]> = ref([]);
function chargerFeed() {
    let url = 'https://localhost:8000/api/utilisateurs/' + storeAuthentification.userId + '/ingredients';
    console.log(url)
    fetch(encodeURI(url))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            ingredients.value = reponseJSON["hydra:member"];
        });
}


onMounted(() => {
    chargerFeed()
})


</script>


<template>
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
