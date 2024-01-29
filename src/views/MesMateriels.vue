<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Materiel } from '@/types';
import BoiteMateriel from '@/components/BoiteMateriel.vue';
import { storeAuthentification } from '@/storeAuthentification';


// Toutes les recettes
const materiels: Ref<Materiel[]> = ref([]);
function chargerFeed() {
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/utilisateurs/' + storeAuthentification.userId + '/materiels'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            materiels.value = reponseJSON["hydra:member"];
        });
}

onMounted(() => {
    chargerFeed()
})


</script>


<template>
  <h2> Mes matériels </h2>
    <div class="recipe-list">
        <BoiteMateriel v-for="materiel in materiels" :key="materiel.id" :materiel="materiel" class="recipe-item"/>
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
