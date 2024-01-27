<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Ingredient } from '@/types';
import {onMounted, ref} from "vue";

const router = useRouter();
const props = defineProps<{ ingredient: Ingredient }>();

let url = ref('');
async function loadImage() {
    const response = await fetch('https://localhost:8000/image/ingredient/' + props.ingredient.imageName);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}

onMounted(async () => {
    url.value = await loadImage();
});

</script>

<template>
    <router-link :to="{ name: 'ingredient', params: { id: ingredient.id } }" class="clickable">

        <div class="recipe">
            <div class="recipe-header">
                <h2>{{ ingredient.nom }}</h2>
            </div>
            <div class="recipe-content">
                <p>{{ ingredient.description }}</p>

                <img :src="url" alt="Ingredient Image"
                    loading="lazy"  sizes="(max-width: 800px) 100vw, 50vw"/>
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
