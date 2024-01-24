<!-- <script setup lang="ts">
import { ref } from 'vue';
import { storeAuthentification } from '../store/storeAuthentification';
import { useRouter } from 'vue-router';
import { flashMessage } from '@smartweb/vue-flash-message';
const router = useRouter();
let jwt = ref()
const connectingUser = ref({
    login: "",
    password: ""
});
// à completer
function connect(): void {
    storeAuthentification.connexion(
        connectingUser.value.login,
        connectingUser.value.password,
        () => {
            flashMessage.show({
                type: 'success',
                title: 'Vous êtes connecté'
            });
            router.push('/feed');
            console.log(storeAuthentification.JWT)
        },
        () => {
            flashMessage.show({
                type: 'error',
                title: 'La connection a échoué'
            });
            connectingUser.value.login = "";
            connectingUser.value.password = "";
        });

}

</script>


<template>
    <!-- <p>{{ storeAuthentification.JWT }}</p> -->
<div class="wrapper">
        <div class="top">
            <h3>Création du profil</h3>
        </div>
<form @submit.prevent="connect" class="content">
            <div class="group">
                <label>Login</label>
                <input v-model="connectingUser.login">
            </div>
            <div class="group">
                <label>Mot de passe</label>
                <input type="password" v-model="connectingUser.password">
            </div>
            <button type="submit">
                Connexion
            </button>
        </form>
    </div>
</template>

<style scoped>
@import "@/assets/contentBox.css";
</style>


<!-- {
    "login": "string",
    "password": "SEYRBfujygvnuiy3456U7779"
  } --> -->
