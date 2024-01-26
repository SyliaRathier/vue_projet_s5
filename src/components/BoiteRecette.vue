<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Recette } from '@/types';

const router = useRouter();
const props = defineProps<{ recette: Recette }>();

const getImageUrl = (file: File) => {
    return file ? URL.createObjectURL(file) : '';
};

</script>

<template>
    <router-link :to="{ name: 'recette', params: { id: recette.id } }" class="clicable">

        <div class="recipe">
            <div class="recipe-header">
                <h2>{{ recette.titre }}</h2>
            </div>
            <div class="recipe-content">
                <p>{{ recette.description }}</p>
            </div>
            <div class="recipe-content">
                <img :src="'https://localhost:8000/image/ingredient/' + recette.imageName" alt="Recipe Image"
                    loading="lazy" />

            </div>
            <div class="recipe-footer">
                <p>Créé par {{ recette.utilisateur.login }}</p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
@import "@/assets/contentBox.css";
</style>
