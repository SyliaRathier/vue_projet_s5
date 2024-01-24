<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Recette } from '@/types';

const router = useRouter();
const props = defineProps<{ recette: Recette }>();

const getImageUrl = (file: File) => {
    return file ? URL.createObjectURL(file) : '';
};

// const staticUrl = "c:/Users/rathi/Desktop/Dossier/Dossier IUT/Annee3/projet_web/projet_s5/api_s5/public/img/ingredient/"
// const staticUrl = "../../../../projet_web/projet_s5/api_s5/public/img/ingredient/"
const staticUrl = "c:\Users\rathi\Desktop\Dossier\Dossier IUT\Annee3\projet_web\projet_s5\api_s5\public\img\ingredient\ordi-eval-and-go-65b025dbbc633555419159.png"
</script>

<template>
    <div class="recipe">
        <div class="recipe-header">
            <h2>{{ recette.titre }}</h2>
        </div>
        <div class="recipe-content">
            <p>{{ recette.description }}</p>
        </div>
        <div class="recipe-content">
            <img
                :src="'../../../projet_web/projet_s5/api_s5/public/img/ingredient/ordi-eval-and-go-65b025dbbc633555419159.png'" />

            <!-- c:/Users/rathi/Desktop/Dossier/Dossier IUT/Annee3/projet_web/projet_s5/api_s5/public/img/ingredient/anonyme-65b021bea09fd147537619.jpg -->
        </div>
        <div class="recipe-footer">
            <p>Créé par</p>
        </div>
    </div>
</template>

<style scoped>
@import "@/components/ContentBox.css";
</style>
