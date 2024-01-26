<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { storeAuthentification } from '@/storeAuthentification'

</script>

<template>
  <header>
    <div>
      <nav class="navbar">
        <div class="logo">Logo</div>
        <router-link to="/about">About</router-link>
        <router-link to="/recettes">Recettes</router-link>
        <router-link to="/ingredients">Ingredients</router-link>
        <template v-if="storeAuthentification.estConnecte">
        <router-link to="/creerRecette">Créer une recette</router-link>
        <router-link to="/creerIngredient">Créer un ingredient</router-link>
        <router-link to="/creerMateriel">Créer un Matériel</router-link>
        <router-link to="/utilisateur">Profil</router-link>
        </template>
        <template v-else>
        <!-- <router-link v-if="storeAuthentification.estConnecte" to="/mesRecettes">Mes Recettes</router-link>
        <router-link v-if="storeAuthentification.estConnecte" to="/mesIngredients">Mes Ingredients</router-link> -->
        <router-link to="/connexion">Connexion</router-link>
        <router-link to="/inscription">Inscription</router-link>
        </template>
      </nav>
      <FlashMessage position="top" />

      <router-view></router-view>

    </div>
  </header>
  <main>
    <!-- <FlashMessage position="top" /> -->


  </main>
</template>



<style scoped>
@import "@/assets/main.css";
</style>
