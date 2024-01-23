<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Recette, Categorie } from '@/types';
import BoiteRecette from '@/components/BoiteRecette.vue';
import { useRoute } from 'vue-router'


// Toutes les recettes
const recettes: Ref<Recette[]> = ref([]);
function chargerFeed(idCategorie: string) {
    if (idCategorie == '0') {
        fetch(encodeURI('https://localhost:8000/api/recettes'))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["hydra:member"];
            });
    } else {
        fetch(encodeURI(`https://localhost:8000/api/categorie_recettes/${idCategorie}`))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["recettes"];
            });
    }
}


// Liste des catégorie pour champs select

const categories: Ref<Categorie[]> = ref([]);
function chargerCategorie() {
    fetch(encodeURI('https://localhost:8000/api/categorie_recettes'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            categories.value = reponseJSON["hydra:member"];
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
        <BoiteRecette v-for="recette in recettes" :key="recette.id" :recette="recette" />
    </div>
</template>

<style scoped>
.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
