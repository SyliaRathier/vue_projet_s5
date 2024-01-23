<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Ingredient } from '@/types';

const router = useRouter();
const props = defineProps<{ ingredient: Ingredient }>();
</script>

<template>
    <div class="recipe">
        <div class="recipe-header">
            <h2>{{ ingredient.titre }}</h2>
        </div>
        <div class="recipe-content">
            <p>{{ ingredient.description }}</p>
            <!-- <img :src="recipe.image" alt="Recipe Image" /> -->
        </div>
    </div>
</template>

<style scoped>
@import "@/components/ContentBox.css";
</style>
