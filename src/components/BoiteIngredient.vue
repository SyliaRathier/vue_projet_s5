<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Ingredient } from '@/types';

const router = useRouter();
const props = defineProps<{ ingredient: Ingredient }>();


</script>

<template>
    <router-link :to="{ name: 'ingredient', params: { id: ingredient.id } }" class="clicable">

        <div class="recipe">
            <div class="recipe-header">
                <h2>{{ ingredient.nom }}</h2>
            </div>
            <div class="recipe-content">
                <p>{{ ingredient.description }}</p>

                <img :src="'https://localhost:8000/image/ingredient/' + ingredient.imageName" alt="Recipe Image"
                    loading="lazy" />
            </div>
            <div class="recipe-footer">
                <p>Créé par {{ ingredient.utilisateur.login }}</p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
@import "@/assets/contentBox.css";
</style>
