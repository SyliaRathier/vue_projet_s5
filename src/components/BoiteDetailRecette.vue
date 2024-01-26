<script setup lang="ts">

import { useRouter, RouterLink } from 'vue-router';
import type { Recette } from '@/types';

const router = useRouter();
const props = defineProps<{ recette: Recette }>();

</script>

<template>


    <div class="recipe-header">
      <h2>{{ recette.titre }}</h2>
    </div>

    <div class="recipe-content">
      <img :src="'https://localhost:8000/image/recette/' + recette.imageName" alt="Recipe Image" loading="lazy" />
      <div class="recipe-ingredient">
        <h3>Les ingredients</h3>
        <ul>
<!--          <li v-for="ingredient in recette.ingredients" :key="ingredient.id">-->
<!--            <router-link :to="{ name: ingredient.link }">{{ ingredient.nom }}</router-link>-->

<!--          </li>-->
        </ul>
      </div>
    </div>

    <div class="recipe-footer">
      <p>Créé par</p>
    </div>


</template>

