<script setup lang="ts">
import { storeAuthentification } from '@/store/storeAuthentification';
import type { Utilisateur } from '@/types';
const props = defineProps<{ utilisateur: Utilisateur }>();
let login = props.utilisateur.login
let adresseEmail = props.utilisateur.adresseEmail

function modifier() {
  fetch(`https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/utilisateurs/${props.utilisateur.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/merge-patch+json',
      'Authorization': 'Bearer ' + storeAuthentification.JWT
    },
    body: JSON.stringify({
      login: login,
      adresseEmail: adresseEmail
    }),
  }).then(reponsehttp => {
    console.log(reponsehttp.json())
  });
}

var elbtn = document.getElementsByClassName("btn-modifier")
if (props.utilisateur.id == storeAuthentification.user.id) {
}

</script>


<template>
  <div class="wrapper">
    <div class="top">
      <router-link :to="{ name: 'singleUser', params: { id: utilisateur.id } }" class="clicable">Profil de {{
          utilisateur.login
        }}</router-link>
    </div>
    <div class="content">
      <div class="group">
        <label>Login</label>
        <input v-model="login">
      </div>
      <div class="group">
        <label>Adresse e-mail</label>
        <input v-model="adresseEmail">
      </div>
      <button v-if="storeAuthentification.user.id === utilisateur.id" class="btn-modifier"
              @click="modifier()">Modifier</button>

    </div>
  </div>
</template>


<style scoped>
@import "@/components/ContentBox.css";
</style>
