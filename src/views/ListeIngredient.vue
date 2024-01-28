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
  <div class="wrapper">
    <div class="section">
      <h2>Catégories</h2>


    <select v-model="selected" @change="chargerFeed(selected)" class="select">
        <option disabled value="">Sélectionner une catégorie</option>
        <option value="0">Toutes Categories</option>
        <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
            {{ categorie.nom }}
        </option>
    </select>
    </div>

    <div class="recipe-list">
        <BoiteIngredient v-for="ingredient in ingredients" :key="ingredient.id" :ingredient="ingredient" />
        <button v-if="ingredients.length >= 25" @click="chargerSuite(selected)" :disabled="loading">Charger la
            suite</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 40px;
  margin-top: 60px;
  font-family: 'FreeMono', sans-serif;
}

.section {
  width: 20%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.section:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 8px;
}

.select {
  width: 90%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s, background-color 0.3s;
}

.select:focus {
  border-color: #4caf50;
  background-color: #fff;
}

.recipe-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
