<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Recette, Categorie } from '@/types';
import BoiteRecette from '@/components/BoiteRecette.vue';
import { useRoute } from 'vue-router'
import { storeAuthentification } from '@/storeAuthentification';


// Toutes les recettes
const recettes: Ref<Recette[]> = ref([]);
function chargerFeed() {
    console.log(storeAuthentification.userId)
    let url = 'https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/utilisateurs/' + storeAuthentification.userId + '/recettes';
    console.log(url)
    fetch(encodeURI(url))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            recettes.value = reponseJSON["hydra:member"];
            console.log(reponseJSON["hydra:member"])

        });
}


onMounted(() => {
    chargerFeed()
})


</script>


<template>
  <h2> Mes recettes </h2>
    <div class="recipe-list">
        <BoiteRecette v-for="recette in recettes" :key="recette.id" :recette="recette" class="recipe-item" />
    </div>
</template>

<style scoped>
h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 34px;
  text-align: center;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 40px;
  margin-top: 10px;
  font-family: 'FreeMono', sans-serif;
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
  width: 30%;
  aspect-ratio: 1/1;
}
</style>
