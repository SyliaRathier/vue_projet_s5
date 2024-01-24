<template>
    <div>
        <h2>Créer une nouvelle recette</h2>
        <form @submit.prevent="submitForm(selectedIngredients)">
            <label for="titre">Titre:</label>
            <input v-model="recette.titre" type="text" required />

            <label for="description">Description:</label>
            <textarea v-model="recette.description" rows="4" required></textarea>

            <label for="conseil">Conseil:</label>
            <textarea v-model="recette.conseil" rows="4" required></textarea>

            <label for="ingredients">Ingrédients:</label>

            <!-- Création QuantiteIngredient  -->


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
                            <!-- <button @click="showInfo(selectedIngredients)">info(dans console)</button> -->


                        </li>
                    </ul>
                </div>
            </div>



            <!--Fin création QuantiteIngredient -->


            <label for="duree">Durée:</label>
            <input v-model="recette.duree" type="text" required />

            <label for="prix">Prix:</label>
            <input v-model="recette.prix" type="text" required />

            <label for="imageFile">Image:</label>
            <input type="file" id="imageFile" ref="imageInput" accept="image/*" />

            <button type="submit">Créer la recette</button>
            <button @click="showInfo(selectedIngredients)">info(dans console)</button>

        </form>
    </div>
</template>




  
<script setup lang="ts">

// Création RECETTE
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient, QuantiteIngredient } from '@/types';
import { flashMessage } from '@smartweb/vue-flash-message';

const selectedIngredients: Ref<{ id_ingredient_id: Ingredient, quantite: number, unite: string, idQuantite: number | null }[]> = ref([]);
const imageInput = ref<HTMLInputElement | null>(null);

const recette = ref({
    titre: '',
    description: '',
    conseil: '',
    ingredients: [],
    duree: '',
    prix: '',
    imageUrl: '',
});

const showInfo = (selectedIngredients: any) => {
    console.log(selectedIngredients);
    const tabIngredient = [];
    let urlIngredient = '';
    let i: number = 0
    for (i = 0; i < selectedIngredients.length; i++) {
        if (selectedIngredients[i].idQuantite !== null) {
            urlIngredient = "https://127.0.0.1:8000/api/quantite_ingredients/" + selectedIngredients[i].idQuantite;
            tabIngredient.push(urlIngredient);
        }
    }
    console.log(tabIngredient)
    return tabIngredient
}

const submitForm = async (selectedIngredients: any) => {

    let tab = showInfo(selectedIngredients)

    console.log(JSON.stringify(tab))

    const formData = new FormData();
    formData.append('titre', recette.value.titre);
    formData.append('description', recette.value.description);
    formData.append('conseil', recette.value.conseil);
    formData.append('ingredients', JSON.stringify(tab));
    formData.append('duree', recette.value.duree);
    formData.append('prix', recette.value.prix);

    const valeur: Ref<[]> = ref([]);


    if (imageInput.value?.files) {
        formData.append('imageFile', imageInput.value.files[0] ?? new File([], ''));
    }

    try {
        const response = await fetch('https://127.0.0.1:8000/api/recettes', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDYxMjA4NDYsImV4cCI6MTcwNjEyNDQ0Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoic3lsaWFhIiwiaWQiOjQsImFkcmVzc2VNYWlsIjoic3lsaWFhQGV4YW1wbGUuY29tIiwicHJlbWl1bSI6ZmFsc2V9.sr64hxoOJakzHdVO2chs-67pQp0u1_LpaOwGJD6xOexZd1nvJs6RjblAE39__Ucg7CjutdXNUSMYPSrJQs7Eo0XdepSv5gBdlufEYjPVB_rxo82sBsMMGqEU4Irv_-oQ_jyRH5Oj6emQBnErX5XwVcNprnWSF4M4LRTgxrms-66UdYeEOcEltWXrK_IwV389GeI4oaQGZjygbi9WB5aiO8CnqQljanmD7sBxCu2UbLHbR4p6kWeINMp8fx8w3hGdqP9Pv7AuCKyLtz4ikwB_c_kuMoXYHGVm_bkdtakWBl4kT34-VcSfSU28CSQGO6KfHmdkjJGjRKjQ7Gv15J87NA"
            },
            body: formData,
        });
        // .then(reponsehttp => reponsehttp.json())
        //     .then(reponseJSON => {
        //         valeur.value = reponseJSON["hydra:member"];
        //         console.log(reponseJSON)

        //     });
        if (response.ok) {
            const reponseJSON = await response.json();
            console.log(reponseJSON);

            // Show success flash message
            flashMessage.show({
                type: 'success',
                title: 'Recette créée avec succès!',
            });

            // You can do additional actions or redirects if needed
        } else {
            // Show error flash message
            flashMessage.show({
                type: 'error',
                title: 'Erreur lors de la création de la recette',
            });
            console.error('Erreur lors de la création de la recette');
        }


    } catch (error) {
        console.error('Erreur lors de la requête :', error);
    }
};



//Création QUAANTITE_INGREDIENTS
// const selectedIngredients: Ref<{ id_ingredient_id: Ingredient, quantite: number, unite: string, idQuantite: number | null }[]> = ref([]);
const ingredients: Ref<Ingredient[]> = ref([]);
function chargerFeed() {
    fetch(encodeURI('https://localhost:8000/api/ingredients'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            ingredients.value = reponseJSON["hydra:member"];
        });
}


const selected: Ref<string> = ref('');

const search: Ref<string> = ref('');

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


onMounted(() => {
    chargerFeed();

});

console.log(selectedIngredients.value)



</script>
  