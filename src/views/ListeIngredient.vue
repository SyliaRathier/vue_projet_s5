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
      <div class="item">
      <h2>Catégories</h2>


    <select v-model="selected" @change="chargerFeed(selected)" class="select">
        <option disabled value="">Sélectionner une catégorie</option>
        <option value="0">Toutes Categories</option>
        <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
            {{ categorie.nom }}
        </option>
    </select>
    </div>
    </div>

    <div class="recipe-list">
        <BoiteIngredient class="recipe-item" v-for="ingredient in ingredients" :key="ingredient.id" :ingredient="ingredient" />

    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-left: 40px;
  margin-top: 60px;
  font-family: 'FreeMono', sans-serif;

}

.section{
  min-width: 20%;
  flex-direction: column;
  padding: 12px;
  border-radius: 8px;
}

.item {
  width: calc(100% - 32px);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}


.item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item h2 {
  font-size: 15px;
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

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.recipe-item {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #fafafa;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  width: calc(33.33% - 20px);
  aspect-ratio: 1/1;
}
</style>
