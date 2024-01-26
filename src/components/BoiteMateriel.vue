<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Materiel } from '@/types';

const router = useRouter();
const props = defineProps<{ materiel: Materiel }>();


</script>

<template>
    <router-link :to="{ name: 'materiel', params: { id: materiel.id } }" class="clicable">

        <div class="recipe">
            <div class="recipe-header">
                <h2>{{ materiel.nom }}</h2>
            </div>
            <div class="recipe-content">
                <p>{{ materiel.description }}</p>

                <img :src="'https://localhost:8000/image/materiel/' + materiel.imageName" alt="Recipe Image"
                    loading="lazy" />
            </div>
        </div>
    </router-link>
</template>

<style scoped>
@import "@/assets/contentBox.css";
</style>
