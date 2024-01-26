<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Recette } from '@/types';

const router = useRouter();
const props = defineProps<{ recette: Recette }>();

</script>

<template>
    <div class="recipe">
        <div class="recipe-header">
            <h2>{{ recette.titre }}</h2>
        </div>
        <div class="recipe-content">
            <p>{{ recette.description }}</p>
          <img :src="'https://localhost:8000/image/recette/' + recette.imageName" alt="Recipe Image"
               loading="lazy" />
        </div>
        <div class="recipe-footer">
            <p>Créé par</p>
        </div>
    </div>
</template>

<style scoped>
@import "@/assets/contentBox.css";
</style>
