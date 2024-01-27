<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { Recette, Categorie, Ingredient } from '@/types';
import BoiteRecette from '@/components/BoiteRecette.vue';
import { useRoute } from 'vue-router'

// Pour catégorie
let recettes: Ref<Recette[]> = ref([]);
function chargerFeed(idCategorie: string) {
    if (idCategorie == '0') {
        fetch(encodeURI('https://localhost:8000/api/recettes'))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["hydra:member"];

            });
    } else {
        fetch(encodeURI(`https://localhost:8000/api/categorie_recettes/${idCategorie}`))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["recettes"];

            });
    }
}

// Pour ingrédient
function chargerFeed2(idIngredient: string) {
    if (idIngredient == '0') {
        fetch(encodeURI('https://localhost:8000/api/recettes'))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["hydra:member"];

            });
    } else {
        fetch(encodeURI(`https://localhost:8000/api/ingredients/${idIngredient}`))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = [];
                reponseJSON["quantiteIngredients"].forEach((element: any) => {
                    console.log(element.recette.id)
                    fetch(encodeURI('https://localhost:8000/api/recettes/' + element.recette.id))
                        .then(reponsehttp => reponsehttp.json())
                        .then(reponseJSON => {
                            // console.log(reponseJSON);
                            recettes.value.push(reponseJSON);

                        });
                });

            });
    }
}


// Pour Matériel
function chargerFeed3(idMateriel: string) {
    if (idMateriel == '0') {
        fetch(encodeURI('https://localhost:8000/api/recettes'))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["hydra:member"];
                console.log(recettes.value)

            });
    } else {
        fetch(encodeURI(`https://localhost:8000/api/materiels/${idMateriel}`))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                console.log(reponseJSON["recettes"])
                recettes.value = [];
                reponseJSON["recettes"].forEach((element: any) => {
                    console.log(element.id)
                    fetch(encodeURI('https://localhost:8000/api/recettes/' + element.id))
                        .then(reponsehttp => reponsehttp.json())
                        .then(reponseJSON => {
                            // console.log(reponseJSON);
                            recettes.value.push(reponseJSON);

                        });
                });
                console.log(recettes.value)

            });
    }
}

// Liste des catégorie pour champs select

const categories: Ref<Categorie[]> = ref([]);
function chargerCategorie() {
    fetch(encodeURI('https://localhost:8000/api/categorie_recettes'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            categories.value = reponseJSON["hydra:member"];
        });
}

// Liste des ingrédients pour champs select

const ingredients: Ref<Ingredient[]> = ref([]);
function chargerIngredient() {
    fetch(encodeURI('https://localhost:8000/api/ingredients'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            ingredients.value = reponseJSON["hydra:member"];
        });
}

// Liste du matériels pour champs select

const materiels: Ref<Ingredient[]> = ref([]);
function chargerMateriel() {
    fetch(encodeURI('https://localhost:8000/api/materiels'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            materiels.value = reponseJSON["hydra:member"];
        });
}

onMounted(() => {
    chargerCategorie()
    chargerFeed('0')
    chargerFeed2('0')
    chargerFeed3('0')
    chargerIngredient()
    chargerMateriel()

})

const selected = ref('')
const selectedIngredient = ref('')
const selectedMateriel = ref('')


</script>


<template>
    <p>Séectionner par catégories</p>
    <div>Selected: {{ selected }}</div>

    <select v-model="selected" @change="chargerFeed(selected)">
        <option disabled value="">Sélectionner une catégorie</option>
        <option value="0">Toutes Categories</option>
        <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
            {{ categorie.nom }}
        </option>
    </select>

    <p>Ou par ingrédients</p>

    <div>Selected: {{ selectedIngredient }}</div>

    <select v-model="selectedIngredient" @change="chargerFeed2(selectedIngredient)">
        <option disabled value="">Sélectionner un ingrédient</option>
        <option value="0"></option>
        <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
            {{ ingredient.nom }}
        </option>
    </select>

    <p>Ou par matériels</p>

    <div>Selected: {{ selectedMateriel }}</div>

    <select v-model="selectedMateriel" @change="chargerFeed3(selectedMateriel)">
        <option disabled value="">Sélectionner un matériel</option>
        <option value="0"></option>
        <option v-for="materiel in materiels" :key="materiel.id" :value="materiel.id">
            {{ materiel.nom }}
        </option>
    </select>


    <div class="recipe-list">
        <BoiteRecette v-for="recette in recettes" :key="recette.id" :recette="recette" />
    </div>
</template>

<style scoped>
.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
