<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient, QuantiteIngredient } from '@/types';
import { flashMessage } from '@smartweb/vue-flash-message';


const selectedIngredients: Ref<{ id_ingredient_id: Ingredient, quantite: number, unite: string, idQuantite: number | null }[]> = ref([]);
// Toutes les recettes
const ingredients: Ref<Ingredient[]> = ref([]);
function chargerFeed() {
    fetch(encodeURI('https://localhost:8000/api/ingredients'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            ingredients.value = reponseJSON["hydra:member"];
        });
}


const selected: Ref<string> = ref(''); // Ensure that selected is a ref

const search: Ref<string> = ref('');
// const selectedIngredients: Ref<{ id_ingredient_id: Ingredient, quantite: number, unite: string, idQuantite: number | null }[]> = ref([]);

const unite = ref('');
const quantite = ref();

const filterIngredients = () => {
    if (search.value === '') {
        return ingredients.value;
    } else {
        return ingredients.value.filter(ingredient =>
            ingredient.nom.toLowerCase().startsWith(search.value.toLowerCase())
        );
    }
};

const addIngredientToList = () => {
    const selectedIngredient = ingredients.value.find(ingredient => ingredient.id === parseInt(selected.value));
    if (selectedIngredient) {
        selectedIngredients.value.push({
            id_ingredient_id: selectedIngredient,
            quantite: quantite.value, // Extract the plain value from Ref
            unite: unite.value, // Extract the plain value from Ref,
            idQuantite: null
        });
    }
};

const removeIngredientFromList = (id: number, index: number) => {
    const response = fetch('https://127.0.0.1:8000/api/quantite_ingredients/' + id, {
        method: 'DELETE',
    });
    selectedIngredients.value.splice(index, 1);
};

const reponseQuantite = ref();
const createIngredientFromList = (id: number, quantite: number, unite: string, index: number) => {
    const url = "https://127.0.0.1:8000/api/ingredients/" + id;
    fetch('https://127.0.0.1:8000/api/quantite_ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({
            quantite: Number(quantite),
            unite: unite,
            idIngredient: url,
        }),
    })
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            reponseQuantite.value = reponseJSON;
            if (reponseQuantite.value.id) {
                // Si l'ingrédient a bien été enregistré
                flashMessage.show({
                    type: 'success',
                    title: 'Ingrédient enregistré',
                });
                const existingItemIndex = selectedIngredients.value.findIndex(item => item.idQuantite === reponseQuantite.value.id);
                console.log(existingItemIndex)

                selectedIngredients.value.splice(index, 1);;
                // If the item doesn't exist, add a new one
                selectedIngredients.value.splice(index, 0, {
                    id_ingredient_id: {
                        id: reponseQuantite.value.idIngredient.id,
                        nom: reponseQuantite.value.idIngredient.nom,
                        description: reponseQuantite.value.idIngredient.description,
                    },
                    quantite: reponseQuantite.value.quantite,
                    unite: reponseQuantite.value.unite,
                    idQuantite: reponseQuantite.value.id,
                });
            } else {
                // Si l'ingrédient n'a pas pu être enregistré
                flashMessage.show({
                    type: 'error',
                    title: "L'ingrédient n'a pas pu être enregistré",
                });
            }


        }).catch(error => {
            // En cas d'erreur inattendue
            flashMessage.show({
                type: 'error',
                title: 'Une erreur s\'est produite lors de l\'enregistrement de l\'ingrédient',
            });
            console.error(error);
        });

};

const showInfo = (selectedIngredients: any) => {
    console.log(selectedIngredients[1])
}

onMounted(() => {
    chargerFeed();
    provide('selectedIngredients', selectedIngredients.value);

});



</script>

<template>
    <div>
        <div>Selected: {{ selected }}</div>

        <label for="search">Search:</label>
        <input v-model="search" type="text" @input="chargerFeed" placeholder="Rechercher un ingrédient" />

        <select v-model="selected" @change="chargerFeed">
            <option disabled value="">Please select one</option>
            <option value="0">All Ingredients</option>
            <option v-for="ingredient in filterIngredients()" :key="ingredient.id" :value="ingredient.id">
                {{ ingredient.nom }}
            </option>
        </select>

        <button @click="addIngredientToList" :disabled="selected === ''">Ajouter</button>

        <div v-if="selectedIngredients.length > 0">
            <h3>Ingrédients sélectionnés :</h3>
            <ul>
                <li v-for="(item, index) in selectedIngredients" :key="item.id_ingredient_id.id">
                    {{ item.id_ingredient_id.nom }}

                    <!-- <label>Quantité: <input></label> {{ item.quantity }} -<label>Unité:
                        <input></label> {{ item.unit }} -->
                    <label>Quantité: <input v-model="item.quantite"></label>
                    <label>Unité: <input v-model="item.unite"></label>
                    <button
                        @click="createIngredientFromList(item.id_ingredient_id.id, item.quantite, item.unite, index)">Enregistrer</button>
                    <button @click="removeIngredientFromList(item.id_ingredient_id.id, index)">Supprimer</button>
                    <button @click="showInfo(selectedIngredients)">info(dans console)</button>


                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
