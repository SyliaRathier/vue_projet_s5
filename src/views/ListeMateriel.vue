<template>
    <div>
        <div class="recipe-list">
            <BoiteMateriel class="recipe-item" v-for="materiel in materiels" :key="materiel.id" :materiel="materiel" />
        </div>
        <button v-if="materiels.length >= 25" @click="chargerSuite" :disabled="loading">Charger la suite</button>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type { Materiel } from '@/types';
import BoiteMateriel from '@/components/BoiteMateriel.vue';

const materiels: Ref<Materiel[]> = ref([]);
const page = ref(1);
const hasNextPage = ref(true);
const loading = ref(false);

async function chargerFeed() {
    if (!hasNextPage.value || loading.value) return;

    loading.value = true;

    const url = `https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels?page=${page.value}`;
    const response = await fetch(encodeURI(url));

    if (response.ok) {
        const data = await response.json();
        materiels.value = [...materiels.value, ...data['hydra:member']];
        hasNextPage.value = data['hydra:member'].length < data['hydra:totalItems'];
        page.value += 1;
    } else {
        console.error('Error loading data:', response);
    }

    loading.value = false;
}

function chargerSuite() {
    chargerFeed();
}

onMounted(() => {
    chargerFeed();
});
</script>
  
<style scoped>

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
  margin-top: 20px;
  width: calc(30% - 20px);
  margin-left: 45px;
  aspect-ratio: 1/1;
}
</style>
  