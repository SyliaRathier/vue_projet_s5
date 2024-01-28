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
    <router-link :to="{ name: 'recette', params: { id: recette.id } }" class="clickable">

        <div class="recipe">
            <div class="recipe-header">
                <h2>{{ recette.titre }}</h2>
            </div>
            <div class="recipe-content">
                <p>{{ recette.description }}</p>
              <img :src="'https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/image/recette/' + recette.imageName" alt="Recipe Image"
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
