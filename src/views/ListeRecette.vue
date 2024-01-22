<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Recette } from '@/types';
import BoiteRecette from '@/components/BoiteRecette.vue';

const recettes: Ref<Recette[]> = ref([]);
function chargerFeed() {
    fetch(encodeURI('https://localhost:8000/api/recettes'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            recettes.value = reponseJSON["hydra:member"];
        });
}
onMounted(() => {
    chargerFeed()
})
</script>

<template >
    <BoiteRecette v-for="recette in recettes" :key="recette.id" :recette="recette" @updated="chargerFeed()" />
</template>
