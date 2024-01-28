<script setup lang="ts">
import { ref } from 'vue';
// import { storeAuthentification } from '@/store/storeAuthentification'
import { useRouter } from 'vue-router';
import { flashMessage } from '@smartweb/vue-flash-message';
import { storeAuthentification } from '@/storeAuthentification'

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
            router.push('/recettes');
            console.log(storeAuthentification)
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
    <div class="login-form">
        <div class="top">
            <h2>Connexion</h2>
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
.login-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fafafa;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.login-form h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.login-form form {
  display: grid;
  gap: 20px;
}

.login-form label {
  font-weight: bold;
  font-size: 16px;
  color: #444;
}

.login-form input {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s, background-color 0.3s;
}

.login-form input:focus {
  border-color: #4caf50;
  background-color: #fff;
}

.login-form button {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.login-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.login-form button:hover {
  background-color: #45a049;
}
</style>


<!-- {
  "login": "syliaa",
  "password": "erY33XVn0UC3uEmEbAaak"
  } -->
