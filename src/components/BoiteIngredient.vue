<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Ingredient } from '@/types';

const router = useRouter();
const props = defineProps<{ ingredient: Ingredient }>();


</script>

<template>
    <div class="recipe">
        <div class="recipe-header">
            <h2>{{ ingredient.nom }}</h2>
        </div>
        <div class="recipe-content">
            <p>{{ ingredient.description }}</p>

            <img :src="'https://localhost:8000/image/ingredient/'+ingredient.imageName" alt="Recipe Image" loading="lazy" />
        </div>
    </div>
</template>

<style scoped>
@import "@/assets/contentBox.css";
</style>
