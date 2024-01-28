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
