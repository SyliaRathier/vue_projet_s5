<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { storeAuthentification } from '@/storeAuthentification'
import logo from './assets/logo.png'

</script>

<template>
  <header>
    <div>
      <nav class="navbar">

        <template v-if="storeAuthentification.estConnecte">
          <router-link to="/">About</router-link>
          <router-link to="/recettes">Recettes</router-link>
          <router-link to="/ingredients">Ingrédients</router-link>
          <router-link to="/materiels">Matériels</router-link>
          <router-link v-if="!storeAuthentification.premium" to="/premium">Premium</router-link>
          <img :src="logo" class="logo" />
          <router-link to="/creerRecette">Créer une recette</router-link>
          <router-link to="/creerIngredient">Créer un ingrédient</router-link>
          <router-link to="/creerMateriel">Créer un Matériel</router-link>
          <router-link to="/utilisateur">Profil</router-link>
        </template>
        <template v-else>
          <router-link to="/about">About</router-link>
          <router-link to="/recettes">Recettes</router-link>
          <router-link to="/ingredients">Ingrédients</router-link>
          <img :src="logo" class="logo" />
          <router-link to="/materiels">Matériels</router-link>
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
