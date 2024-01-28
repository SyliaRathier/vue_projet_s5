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
    <div class="recipe-list">
        <BoiteMateriel v-for="materiel in materiels" :key="materiel.id" :materiel="materiel" />
    </div>
</template>

<style scoped>
.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
