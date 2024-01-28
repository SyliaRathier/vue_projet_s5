<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient, Recette, Utilisateur, Materiel, QuantiteIngredient } from '@/types';
import RecetteDetaille from '@/components/RecetteDetaille.vue';

const route = useRoute()
const id = route.params.id
const utilisateur: Ref<Utilisateur> = ref({
    id: 0,
    adresseEmail: '',
    login: '',
    premium: false,
    nom: '',
    prenom: '',
});

const ingredients: Ref<QuantiteIngredient[]> = ref([]);
const materiels: Ref<Materiel[]> = ref([]);


const recette: Ref<Recette> = ref({
    id: 0,
    titre: '',
    description: '',
    datePublication: '',
    conseil: '',
    prix: 0,
    duree: '',
    imageName: '',
    utilisateur: utilisateur,
    ingredients: ingredients,
    materiels: materiels

});


onMounted(() => {
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/recettes/' + Number(id)))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            recette.value = reponseJSON;
            console.log(reponseJSON);
        });
})

</script>

<template>
    <RecetteDetaille :key="recette.id" :recette="recette" />
</template>
