<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import type { Ingredient } from '@/types';
import { onMounted } from 'vue';
import { storeAuthentification } from '@/storeAuthentification'
import { flashMessage } from '@smartweb/vue-flash-message';

const router = useRouter();
const props = defineProps<{ ingredient: Ingredient }>();

let utilisateurId: number;
let utilisateurLogin = '';

if (props.ingredient.utilisateur) {
    utilisateurId = props.ingredient.utilisateur.id;
    utilisateurLogin = props.ingredient.utilisateur.login;
    console.log(utilisateurId + " " + utilisateurLogin);
}


const deleteIngredient = async (ingredientId: number) => {
    fetch(encodeURI('https://localhost:8000/api/ingredients/' + Number(ingredientId) + '/quantite_ingredients'))
        .then(reponsehttp => reponsehttp.json())
        .then(async reponseJSON => {
            // console.log(reponseJSON['hydra:member']);
            if (reponseJSON['hydra:member'].length === 0) {
                console.log('hello')
                const response = await fetch('https://127.0.0.1:8000/api/ingredients/' + Number(ingredientId), {
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

                reponseJSON['hydra:member'].forEach(async (ingre: { recette: any; }) => {
                    console.log('ok')
                    if (ingre.recette) {
                        console.log('hello')
                        const response = await fetch('https://127.0.0.1:8000/api/ingredients/' + Number(ingredientId), {
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
            <h2>{{ ingredient.nom }}</h2>
        </div>

        <div class="content">
            <p>{{ ingredient.description }}</p>
            <img :src="'https://localhost:8000/img/ingredient/' + ingredient.imageName" alt="Ingredient Image"
                loading="lazy" />
        </div>

        <div class="footer">
            <p>Prix : {{ ingredient.prix }} €</p>
        </div>
        {{ ingredient.id }}
        <router-link :to="{ name: 'modifierIngredient', params: { id: ingredient.id } }" class="clicable">
            <button v-if="utilisateurId === storeAuthentification.userId">Mofifier</button>
        </router-link>
        <button v-if="utilisateurId === storeAuthentification.userId"
            @click.prevent="deleteIngredient(ingredient.id)">Supprimer</button>
    </div>
</template>
  
<style scoped>
.ingredient-details {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.content {
    margin-bottom: 20px;
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.footer {
    text-align: center;
    font-size: 18px;
    color: #333;
}
</style>
  
