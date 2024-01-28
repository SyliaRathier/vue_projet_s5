<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient, Categorie } from '@/types';
import BoiteIngredient from '@/components/BoiteIngredient.vue';
import { useRoute } from 'vue-router'



// Toutes les recettes
const ingredients: Ref<Ingredient[]> = ref([]);
async function chargerFeed(idCategorie: string) {
    if (idCategorie == '0') {

        fetch(encodeURI(`https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/ingredients`))
            .then(reponsehttp => reponsehttp.json())
            .then(async reponseJSON => {
                ingredients.value = reponseJSON['hydra:member'];

            });


    } else {
        fetch(encodeURI(`https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/categorie_ingredients/${idCategorie}`))
            .then(reponsehttp => reponsehttp.json())
            .then(async reponseJSON => {
                ingredients.value = await reponseJSON["ingredients"];
            });
    }
}



// Liste des catégorie pour champs select

const categories: Ref<Categorie[]> = ref([]);
async function chargerCategorie() {
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/categorie_ingredients'))
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
