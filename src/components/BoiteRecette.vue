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
            <!-- <img :src="recipe.image" alt="Recipe Image" /> -->
        </div>
        <div class="recipe-footer">
            <!-- <p>Créé par {{ recipe.user }} le {{ formatDate(recipe.date) }}</p> -->
            <p>Créer pas User</p>
        </div>
        <div class="recipe-footer">
            <!-- <p>Créé par {{ recipe.user }} le {{ formatDate(recipe.date) }}</p> -->
            {{ recette.imageFile }}
        </div>
    </div>
</template>

<style scoped>
@import "@/components/ContentBox.css";
</style>
