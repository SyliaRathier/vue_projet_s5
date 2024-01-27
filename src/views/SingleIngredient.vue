<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient } from '@/types';
import IngredientDetaille from '@/components/IngredientDetaille.vue';


const route = useRoute()
const id = route.params.id
const ingredient: Ref<Ingredient> = ref({
    id: 0,
    nom: '',
    prix: 0,
    description: '',
    imageName: '',
    utilisateur: ref()
});


onMounted(() => {
    fetch(encodeURI('https://localhost:8000/api/ingredients/' + Number(id)))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            ingredient.value = reponseJSON;
            console.log(reponseJSON)
        });
})

</script>

<template>
    <IngredientDetaille :key="ingredient.id" :ingredient="ingredient" />
</template>
