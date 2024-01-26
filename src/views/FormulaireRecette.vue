<template>
    <div>
        <h2>Créer une nouvelle recette</h2>
        <form v-if="!submitting" @submit.prevent="submitForm(selectedIngredients, selectedMateriels, selectedCategories)">
            <label for="titre">Titre:</label>
            <input v-model="recette.titre" type="text" required />

            <label for="description">Description:</label>
            <textarea v-model="recette.description" rows="4" required></textarea>

            <label for="conseil">Conseil:</label>
            <textarea v-model="recette.conseil" rows="4"></textarea>

            <label for="ingredients">Ingrédients:</label>

            <!-- Création QuantiteIngredient  -->


            <div>
                <div>Selected: {{ selected }}</div>

                <label for="search">Search:</label>
                <input v-model="search" type="text" @input="chargerFeed" placeholder="Rechercher un ingrédient" />

                <select v-model="selected" @change="chargerFeed">
                    <option disabled value="">Please select one</option>
                    <option v-for="ingredient in filterIngredients()" :key="ingredient.id" :value="ingredient.id">
                        {{ ingredient.nom }}
                    </option>
                </select>

                <button @click.prevent="addIngredientToList" :disabled="selected === ''">Ajouter</button>

                <div v-if="selectedIngredients.length > 0">
                    <h3>Ingrédients sélectionnés :</h3>
                    <ul>
                        <li v-for="(item, index) in selectedIngredients" :key="item.id_ingredient_id.id">
                            {{ item.id_ingredient_id.nom }}


                            <label>Quantité: <input v-model="item.quantite"></label>
                            <label>Unité: <input v-model="item.unite"></label>
                            <button
                                @click.prevent="createIngredientFromList(item.id_ingredient_id.id, item.quantite, item.unite, index)">Enregistrer</button>
                            <button
                                @click.prevent="removeIngredientFromList(item.id_ingredient_id.id, index)">Supprimer</button>


                        </li>
                    </ul>
                </div>
            </div>



            <!--Fin création QuantiteIngredient -->


            <!-- Ajouter mtériels -->

            <div>
                <div>Selected: {{ selectedM }}</div>

                <label for="searchM">Search:</label>
                <input v-model="searchM" type="text" @input="chargerFeedMateriel" placeholder="Rechercher du matériel" />

                <select v-model="selectedM" @change="chargerFeedMateriel">
                    <option disabled value="">Please select one</option>
                    <option v-for="materiel in filterMateriels()" :key="materiel.id" :value="materiel.id">
                        {{ materiel.nom }}
                    </option>
                </select>

                <button @click.prevent="addMaterielToList" :disabled="selectedM === ''">Ajouter</button>

                <div v-if="selectedMateriels.length > 0">
                    <h3>Ingrédients sélectionnés :</h3>
                    <ul>
                        <li v-for="(item, index) in selectedMateriels" :key="item.id">
                            {{ item.nom }}
                            <button @click="removeMaterielFromList(item.id, index)">Supprimer</button>

                        </li>
                    </ul>
                </div>
            </div>

            <!-- Fin de Ajouter mtériels -->


            <label for="duree">Durée:</label>
            <input v-model="recette.duree" type="text" required />

            <label for="prix">Prix:</label>
            <input v-model="recette.prix" type="text" required />

            <label for="imageFile">Image:</label>
            <input type="file" id="imageFile" ref="imageInput" accept="image/*" />



            <div>
                <div>Selected: {{ selectedCategorie }}</div>

                <label for="searchCategorie">Search:</label>
                <input v-model="searchCategorie" type="text" @input="chargerFeedCategorie"
                    placeholder="Rechercher une catégorie" />

                <select v-model="selectedCategorie" @change="chargerFeedCategorie">
                    <option disabled value="">Veuillez en sélectionner une</option>
                    <option v-for="categorie in filterCategories()" :key="categorie.id" :value="categorie.id">
                        {{ categorie.nom }}
                    </option>
                </select>

                <button @click.prevent="addCategorieToList" :disabled="selectedCategorie === ''">Ajouter</button>

                <div v-if="selectedCategories.length > 0">
                    <h3> Catégories sélectionnées :</h3>
                    <ul>
                        <li v-for="(item, index) in selectedCategories" :key="item.id">
                            {{ item.nom }}
                            <button @click="removeCategorieFromList(item.id, index)">Supprimer</button>
                        </li>
                    </ul>
                </div>
            </div>






            <button type="submit">Créer la recette</button>

        </form>
    </div>
</template>




  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Ingredient, QuantiteIngredient, Categorie } from '@/types';
import { flashMessage } from '@smartweb/vue-flash-message';
import { storeAuthentification } from '@/storeAuthentification'


// Création RECETTE

const submitting = ref(false);


const selectedIngredients: Ref<{ id_ingredient_id: Ingredient, quantite: number, unite: string, idQuantite: number | null }[]> = ref([]);
const imageInput = ref<HTMLInputElement | null>(null);

const recette = ref({
    titre: '',
    description: '',
    conseil: '',
    ingredients: [],
    materiels: [],
    duree: '',
    prix: '',
    imageUrl: '',
});

const fillIngredients = (selectedIngredients: any) => {
    const tabIngredient = [];
    let urlIngredient = '';
    let i: number = 0
    for (i = 0; i < selectedIngredients.length; i++) {
        if (selectedIngredients[i].idQuantite !== null) {
            urlIngredient = "https://127.0.0.1:8000/api/quantite_ingredients/" + selectedIngredients[i].idQuantite;
            tabIngredient.push(urlIngredient);
        }
    }
    return tabIngredient
}

const fillMateriels = (selectedMateriel: any) => {
    console.log(selectedMateriel);
    const tabMateriel = [];
    let urlIngredient = '';
    let i: number = 0
    for (i = 0; i < selectedMateriel.length; i++) {
        if (selectedMateriel[i].id !== null) {
            urlIngredient = "https://127.0.0.1:8000/api/materiels/" + selectedMateriel[i].id;
            tabMateriel.push(urlIngredient);
        }
    }
    console.log(tabMateriel)
    return tabMateriel
}

const fillCategories = (selectedCategories: any) => {
    console.log(selectedCategories);
    const tabCategorie = [];
    let urlCategorie = '';
    let i: number = 0
    for (i = 0; i < selectedCategories.length; i++) {
        if (selectedCategories[i].id !== null) {
            urlCategorie = "https://127.0.0.1:8000/api/categorie_recettes/" + selectedCategories[i].id;
            tabCategorie.push(urlCategorie);
        }
    }
    console.log(tabCategorie)
    return tabCategorie
}


const submitForm = async (selectedIngredients: any, selectedMateriels: any, selectedCategories: any) => {

    if (submitting.value) {
        return;
    }
    submitting.value = true;
    try {
        let tab = fillIngredients(selectedIngredients)
        let tabM = fillMateriels(selectedMateriels)
        let tabC = fillCategories(selectedCategories);

        console.log(JSON.stringify(tab))
        console.log(JSON.stringify(tabM))
        console.log(JSON.stringify(tabC))

        let utilisateur = 'https://127.0.0.1:8000/api/utilisateurs/' + storeAuthentification.userId;

        const formData = new FormData();
        formData.append('titre', recette.value.titre);
        formData.append('description', recette.value.description);
        formData.append('conseil', recette.value.conseil);
        formData.append('ingredients', JSON.stringify(tab));
        formData.append('materiels', JSON.stringify(tabM));
        formData.append('duree', recette.value.duree);
        formData.append('prix', recette.value.prix);
        formData.append('utilisateur', utilisateur);
        formData.append('categorieRecettes', JSON.stringify(tabC));


        const valeur: Ref<[]> = ref([]);


        if (imageInput.value?.files) {
            formData.append('imageFile', imageInput.value.files[0] ?? new File([], ''));
        }

        try {
            console.log()
            const response = await fetch('https://127.0.0.1:8000/api/recettes', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + storeAuthentification.JWT
                },
                body: formData,
            });

            response.json().then(reponseJSON => {

                if (response.ok) {
                    console.log(reponseJSON);

                    // Show success flash message
                    flashMessage.show({
                        type: 'success',
                        title: 'Recette créée avec succès!',
                    });

                    // You can do additional actions or redirects if needed
                } else {
                    // Show error flash message
                    let erreur = reponseJSON["detail"];

                    flashMessage.show({
                        type: 'error',
                        title: erreur,
                    });
                    console.error('Erreur lors de la création de la recette');
                }


            })

        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    } catch (error) {
        // Handle errors as needed
    } finally {
        // Reset submitting to false after the form submission is complete
        submitting.value = false;
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
                        prix: reponseQuantite.value.idIngredient.prix,
                        description: reponseQuantite.value.idIngredient.description,
                        imageName: ''
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



console.log(selectedIngredients.value)


// Créer MATERIELS

const selectedMateriels: Ref<{ id: number, nom: string }[]> = ref([]);
const materiels: Ref<{ id: number, nom: string }[]> = ref([]);
function chargerFeedMateriel() {
    fetch(encodeURI('https://localhost:8000/api/materiels'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            materiels.value = reponseJSON["hydra:member"];
        });
}
const selectedM: Ref<string> = ref(''); // Ensure that selected is a ref
const searchM: Ref<string> = ref('');
const filterMateriels = () => {
    if (searchM.value === '') {
        return materiels.value;
    } else {
        return materiels.value.filter(materiel =>
            materiel.nom.toLowerCase().startsWith(searchM.value.toLowerCase())
        );
    }
};
const addMaterielToList = () => {
    const selectedMateriel = materiels.value.find(materiel => materiel.id === parseInt(selectedM.value));
    if (selectedMateriel) {
        selectedMateriels.value.push({
            id: selectedMateriel.id,
            nom: selectedMateriel.nom,

        });
    }
};
const removeMaterielFromList = (id: number, index: number) => {
    selectedMateriels.value.splice(index, 1);
};


// Pour CATEGORIE

const selectedCategories: Ref<{ id: number, nom: string }[]> = ref([]);
const categories: Ref<{ id: number, nom: string }[]> = ref([]);

function chargerFeedCategorie() {
    fetch(encodeURI('https://localhost:8000/api/categorie_recettes'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            categories.value = reponseJSON["hydra:member"];
        });
}

const selectedCategorie: Ref<string> = ref('');
const searchCategorie: Ref<string> = ref('');

const filterCategories = () => {
    if (searchCategorie.value === '') {
        return categories.value;
    } else {
        return categories.value.filter(categorie =>
            categorie.nom.toLowerCase().startsWith(searchCategorie.value.toLowerCase())
        );
    }
};

const addCategorieToList = () => {
    const selectedCat = categories.value.find(categorie => categorie.id === parseInt(selectedCategorie.value));
    if (selectedCat) {
        selectedCategories.value.push({
            id: selectedCat.id,
            nom: selectedCat.nom,
        });
    }
};

const removeCategorieFromList = (id: number, index: number) => {
    selectedCategories.value.splice(index, 1);
};



onMounted(() => {
    chargerFeedMateriel();
    chargerFeed();
    chargerFeedCategorie();

});

</script>
  

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f8f8;
}

div {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

h2 {
    color: #333;
    text-align: center;
}

form {
    display: grid;
    gap: 20px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

input,
textarea,
select {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 16px;
}

button {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
}

li button {
    background-color: #ff5b5b;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

li button:hover {
    background-color: #d73838;
}
</style>
@/storeAuthentification
