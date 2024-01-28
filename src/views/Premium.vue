<script setup lang="ts">

import {storeAuthentification} from "@/storeAuthentification";
import router from "@/router";
import * as https from "https";

let url = 'https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/premium/checkout/user/' + storeAuthentification.userId;

</script>

<template>
  <div class="premium_page" >
      <div class="button-premium"><a :href="url">Devenez premium pour seulement 5€ par mois</a></div>
      <h3>Vous pourrez alors partager les liens vers les boutiques de vos ingrédients et de vos materiels dans les recettes que vous et la communauté conféctionne</h3>
  </div>
</template>

<style scoped>
@import "@/assets/premium.css";
</style>