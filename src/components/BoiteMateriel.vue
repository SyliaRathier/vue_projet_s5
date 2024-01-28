<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Materiel } from '@/types';

const router = useRouter();
const props = defineProps<{ materiel: Materiel }>();


</script>

<template>
    <router-link :to="{ name: 'materiel', params: { id: materiel.id } }" class="clickable">

        <div class="recipe">
            <div class="recipe-header">
                <h2>{{ materiel.nom }}</h2>
            </div>
            <div class="recipe-content">
                <p>{{ materiel.description }}</p>

              <img :src="'https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/image/materiel/' + materiel.imageName" alt="Stuff Image"
                   loading="lazy" />
            </div>
            <div class="recipe-footer">
                <p>Créé par {{ materiel.utilisateur.login }}</p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
@import "@/assets/contentBox.css";
</style>
