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
        <router-link v-if="storeAuthentification.estConnecte" to="/creerRecette">Créer une recette</router-link>
        <router-link v-if="storeAuthentification.estConnecte" to="/creerIngredient">Créer un ingredient</router-link>
        <router-link v-if="storeAuthentification.estConnecte" to="/creerMateriel">Créer un Matériel</router-link>
        <router-link v-if="storeAuthentification.estConnecte" to="/utilisateur">Profil</router-link>
        <!-- <router-link v-if="storeAuthentification.estConnecte" to="/mesRecettes">Mes Recettes</router-link>
        <router-link v-if="storeAuthentification.estConnecte" to="/mesIngredients">Mes Ingredients</router-link> -->
        <router-link to="/connexion">Connexion</router-link>
        <router-link to="/inscription">Inscription</router-link>

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
.navbar {
  background-color: #3498db;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
}

.router-link {
  text-decoration: none;
  color: #fff;
  margin: 0 10px;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
