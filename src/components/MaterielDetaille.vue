<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Materiel } from '@/types';
import { onMounted, ref } from 'vue';
import { storeAuthentification } from '@/storeAuthentification'
import { flashMessage } from '@smartweb/vue-flash-message';


const router = useRouter();
const props = defineProps<{ materiel: Materiel }>();
let utilisateur = '';

let utilisateurId: number;
let utilisateurLogin = '';

if (props.materiel.utilisateur) {
    utilisateurId = props.materiel.utilisateur.id;
    utilisateurLogin = props.materiel.utilisateur.login;
    console.log(utilisateurId + " " + utilisateurLogin);
}

const isAdmin = ref(false);

function getUtilisateur() {
    console.log(storeAuthentification.userId);
    try {
        fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/utilisateurs/' + storeAuthentification.userId)
        ).then(
            reponsehttp => reponsehttp.json()
        ).then(
            reponseJSON => {
                console.log(reponseJSON['roles'].includes('ROLE_ADMIN'))
                isAdmin.value = reponseJSON['roles'].includes('ROLE_ADMIN')
            }
        )
    } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
    }
}

onMounted(() => {
    getUtilisateur()
});


const deleteMateriel = async (materielId: number) => {
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels/' + Number(materielId)))
        .then(reponsehttp => reponsehttp.json())
        .then(async reponseJSON => {
            console.log(reponseJSON.recettes.length);
            if (reponseJSON.recettes.length != 0) {
                flashMessage.show({
                    type: 'error',
                    title: "Le materiel ne peut pas être supprimé car des recettes l'utilise"
                });
                return;
            }
            else {
                const response = await fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels/' + Number(materielId), {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + storeAuthentification.JWT
                    },
                });

                console.log(response)
                if (response.ok) {
                    console.log('Matériel supprimé avec succès !');
                    flashMessage.show({
                        type: 'success',
                        title: "Le matériel a bien été supprimé"
                    });
                    router.push('/mesMateriels')

                } else {
                    flashMessage.show({
                        type: 'error',
                        title: "Le matériel n'a pas pu être supprimé"
                    });
                    console.error('Erreur lors de la suppression du matériel');
                }
            }

        });
};


</script>

<template>
    <div class="materiel-details">
        <div class="header">
            <h2 class="title">{{ materiel.nom }}</h2>
        </div>

        <div class="content">
          <div class="text-container">
            <p class="utilisation">{{ materiel.utilisation }}</p>
            <p class="description">{{ materiel.description }}</p>
          </div>
          <div class="image-container">
            <img :src="'https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/image/materiel/' + materiel.imageName" alt="Materiel Image" loading="lazy" />
          </div>
        </div>

        <div class="footer">
            <p>Prix : {{ materiel.prix }} €</p>
        </div>
        <div class="recipe-footer">
            <p>Créé par {{ utilisateurLogin }}</p>
        </div>
        <router-link :to="{ name: 'modifierMateriel', params: { id: materiel.id } }" class="clicable">
            <button v-if="utilisateurId === storeAuthentification.userId">Modifier</button>
        </router-link>
        <button v-if="utilisateurId === storeAuthentification.userId || isAdmin == true"
            @click.prevent="deleteMateriel(materiel.id)">Supprimer</button>

    </div>
</template>
  
<style scoped>
.materiel-details {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'FreeMono', sans-serif;
}

.title {
  font-size: 24px;
  color: #333;
}

.content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.text-container {
  flex: 1;
  text-align: justify;
}

.image-container {
  flex: 1;
  margin-left: 20px;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.utilisation {
    font-weight: bold;
    margin-bottom: 10px;
}

.description {
    margin-bottom: 20px;
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.footer {
  margin-top: 20px;
}
.footer p {
  font-size: 18px;
  color: #555;
}

</style>
  
  
