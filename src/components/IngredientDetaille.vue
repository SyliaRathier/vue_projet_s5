<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Ingredient, Utilisateur } from '@/types';
import { onMounted, ref, type Ref } from 'vue';
import { storeAuthentification } from '@/storeAuthentification'
import { flashMessage } from '@smartweb/vue-flash-message';

const router = useRouter();
const props = defineProps<{ ingredient: Ingredient }>();

let utilisateurId: number;
let utilisateurLogin = '';

if (props.ingredient.utilisateur) {
    utilisateurId = props.ingredient.utilisateur.id;
    utilisateurLogin = props.ingredient.utilisateur.login;
    // console.log(props.ingredient.utilisateur.roles)
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


const deleteIngredient = async (ingredientId: number) => {
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/ingredients/' + Number(ingredientId) + '/quantite_ingredients'))
        .then(reponsehttp => reponsehttp.json())
        .then(async reponseJSON => {
            if (reponseJSON['hydra:member'].length === 0) {
                const response = await fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/ingredients/' + Number(ingredientId), {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + storeAuthentification.JWT
                    },
                });

                if (response.ok) {
                    console.log('Ingrédient supprimé avec succès !');
                    flashMessage.show({
                        type: 'success',
                        title: "L'ingrédient a bien été supprimé"
                    });
                    router.push('/mesIngredients')

                } else {
                    flashMessage.show({
                        type: 'error',
                        title: "L'ingrédient n'a pas pu être supprimé"
                    });
                    console.error('Erreur lors de la suppression de l\'ingrédient');
                }
            }
            else {

                reponseJSON['hydra:member'].forEach(async (ingre: { recette: any; }) => {
                    console.log('ok')
                    if (ingre.recette) {
                        console.log('hello')
                        const response = await fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/ingredients/' + Number(ingredientId), {
                            method: 'DELETE',
                            headers: {
                                'Authorization': 'Bearer ' + storeAuthentification.JWT
                            },
                        });

                        console.log(response)
                        if (response.ok) {
                            console.log('Ingrédient supprimé avec succès !');
                            flashMessage.show({
                                type: 'success',
                                title: "L'ingrédient a bien été supprimé"
                            });
                            router.push('/mesIngredients')

                        } else {
                            flashMessage.show({
                                type: 'error',
                                title: "L'ingrédient n'a pas pu être supprimé"
                            });
                            console.error('Erreur lors de la suppression de l\'ingrédient');
                        }
                    }
                    else {
                        console.log('by')
                        flashMessage.show({
                            type: 'error',
                            title: "L'ingredient ne peut pas être supprimé car des recettes l'utilise"
                        });
                        return;
                    }
                })
            }
        });
};

</script>

<template>
  <div class="ingredient-details">
    <div class="header">
      <h2 class="title">{{ ingredient.nom }}</h2>
    </div>

    <div class="content">
      <div class="text-container">
        <p>{{ ingredient.description }}</p>
        <div class="footer">
          <p>Prix : {{ ingredient.prix }} €</p>
        </div>
      </div>
      <div class="image-container">
        <img :src="'https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/image/ingredient/' + ingredient.imageName" alt="Ingredient Image"
             loading="lazy" class="ingredient-image" />
      </div>
    </div>
    <div class="bouton">
    <router-link :to="{ name: 'modifierIngredient', params: { id: ingredient.id } }" class="clicable">
      <button class="submit-button" v-if="utilisateurId === storeAuthentification.userId">Modifier</button>
    </router-link>
    <button class="submit-button" v-if="utilisateurId === storeAuthentification.userId || isAdmin == true" @click.prevent="deleteIngredient(ingredient.id)">Supprimer</button>
    </div>
    </div>
</template>

<style scoped>
.ingredient-details {
  max-width: 500px;
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

.ingredient-image {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.footer {
  margin-top: 20px;
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