<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Materiel } from '@/types';
import MaterielDetaille from '@/components/MaterielDetaille.vue';

const route = useRoute()
const id = route.params.id
const materiel: Ref<Materiel> = ref({
    id: 0,
    nom: '',
    description: '',
    prix: 0,
    imageName: '',
    caracteristique: '',
    utilisation: '',
    utilisateur: ref()
});


onMounted(() => {
    fetch(encodeURI('https://localhost:8000/api/materiels/' + Number(id)))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            materiel.value = reponseJSON;
        });
})

</script>

<template>
    <MaterielDetaille :key="materiel.id" :materiel="materiel" />
</template>
