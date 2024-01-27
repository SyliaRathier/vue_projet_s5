<template>
    <div>
        <div class="recipe-list">
            <BoiteMateriel v-for="materiel in materiels" :key="materiel.id" :materiel="materiel" />
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

    const url = `https://localhost:8000/api/materiels?page=${page.value}`;
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
    justify-content: space-around;
    min-height: 100vh;
    /* For the scroll to work */
    box-sizing: border-box;
    padding: 10px;
    /* Add padding for better visual */
    box-sizing: border-box;
    overflow-y: auto;
}
</style>
  