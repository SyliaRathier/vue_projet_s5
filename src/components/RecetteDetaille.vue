<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useRouter, RouterLink } from 'vue-router';
import type { Recette } from '@/types';
import { storeAuthentification } from '@/storeAuthentification'
import { flashMessage } from '@smartweb/vue-flash-message';
import { onMounted, ref } from 'vue';


const router = useRouter();
const props = defineProps<{ recette: Recette }>();

const getImageUrl = (file: File) => {
    return file ? URL.createObjectURL(file) : '';
};

let utilisateurId: number;
let utilisateurLogin = '';

if (props.recette.utilisateur) {
    utilisateurId = props.recette.utilisateur.id;
    utilisateurLogin = props.recette.utilisateur.login;
    console.log(props.recette);
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

const deleteRecette = async (recetteId: number) => {
    props.recette.ingredients.forEach(ingredient => {
        fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/quantite_ingredients/' + ingredient.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + storeAuthentification.JWT
            },
        }).then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                console.log(reponseJSON["hydra:member"]);
            });
    });


    const response = await fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/recettes/' + recetteId, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + storeAuthentification.JWT
        },
    });

    console.log(response)
    if (response.ok) {
        console.log('Recette supprimée avec succès !');
        flashMessage.show({
            type: 'success',
            title: "La recette a bien été supprimée"
        });
        router.push('/mesRecettes')

    } else {
        flashMessage.show({
            type: 'error',
            title: "La recette n'a pas pu être supprimée"
        });
        console.error('Erreur lors de la suppression de la recette');
    }

};



</script>
<template>
  <div class="recipe-details">
    <div class="header">
      <h2 class="title">{{ recette.titre }}</h2>
    </div>

    <div class="content">
      <div class="text-container">
        <div class="info">
          <p>Durée : {{ recette.duree }}</p>
          <p>Prix : {{ recette.prix }} €</p>
        </div>

        <div class="section">
          <h3>Ingrédients</h3>
          <ul>
            <li v-for="ingredient in recette.ingredients" :key="ingredient.id">
              {{ ingredient.idIngredient.nom }} - {{ ingredient.quantite }} {{ ingredient.unite }}
            </li>
          </ul>
        </div>

        <div class="section">
          <h3>Matériels</h3>
          <ul>
            <li v-for="materiel in recette.materiels" :key="materiel.id">
              {{ materiel.nom }}
            </li>
          </ul>
        </div>

        <div class="section">
          <h3>Description</h3>
          <p>{{ recette.description }}</p>
        </div>

        <div class="section">
          <h3>Conseils</h3>
          <p>{{ recette.conseil }}</p>
        </div>

        <div class="footer">
          <p>Créé par {{ utilisateurLogin }}</p>
        </div>
      </div>

      <div class="image-container">
        <img :src="'https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/image/recette/' + recette.imageName" alt="Recipe Image" loading="lazy" class="recipe-image" />
      </div>
    </div>
  <div class="bouton">
    <router-link :to="{ name: 'modifierRecette', params: { id: recette.id } }" class="clicable">
      <button class="submit-button" v-if="utilisateurId === storeAuthentification.userId">Modifier</button>
    </router-link>
    <button class="submit-button" v-if="utilisateurId === storeAuthentification.userId || isAdmin == true" @click.prevent="deleteRecette(recette.id)">Supprimer</button>
  </div>
  </div>

</template>

<style scoped>
.recipe-details {
  max-width: 800px;
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
  justify-content: space-between; /* Add space between text and image */
  margin-top: 20px;
}

.text-container {
  flex: 1;
  text-align: justify;
}

.info {
  margin-bottom: 10px;
}

.section {
  margin-bottom: 20px;
}

.image-container {
  flex: 1;
  margin-left: 20px;
}

.recipe-image {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.footer {
  margin-top: 20px;
  align-self: flex-end;
}

.footer p {
  font-size: 18px;
  color: #555;
}

.clicable {
  display: inline-block;
  margin-top: 20px;
}
.bouton{
  flex-direction: row;
  gap: 30px;
  margin-left: 20px;

}

.submit-button {
  background-color: #BBB6AF;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

}

.submit-button:hover {
  background-color: #A6A29A;
}
</style>