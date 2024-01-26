<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import type { Ref } from 'vue';
import type { Recette } from '@/types';
import BoiteDetailRecette from '@/components/BoiteDetailRecette.vue';

const route = useRoute();
const id = route.params.id;
const fakeRecette : Ref<Recette> = ref({
    id: 0,
    titre: "Fake Recette",
    description: "Fake Description",
    imageName: "fake.jpg",
    ingredients: [
        {
            id: 0,
            nom: "Fake Ingredient",
            description: "Fake Description",
            imageName: "fake.jpg",
            link: "SingleIngredient"
        }
    ]
});

onMounted(()=>{
    fetch(encodeURI(`https://localhost:8000/api/recettes/`+encodeURI(id)))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
          ingredient.value = reponseJSON;
        });
})
</script>


<template>
  <BoiteDetailRecette :key="fakeRecette.id" :recette="fakeRecette"/>
</template>

<style scoped>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
