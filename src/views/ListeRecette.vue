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
        fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/recettes'))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["hydra:member"];

            });
    } else {
        fetch(encodeURI(`https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/categorie_recettes/${idCategorie}`))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["recettes"];

            });
    }
}

// Pour ingrédient
function chargerFeed2(idIngredient: string) {
    if (idIngredient == '0') {
        fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/recettes'))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["hydra:member"];

            });
    } else {
        fetch(encodeURI(`https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/ingredients/${idIngredient}`))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = [];
                reponseJSON["quantiteIngredients"].forEach((element: any) => {
                    console.log(element.recette.id)
                    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/recettes/' + element.recette.id))
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
        fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/recettes'))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                recettes.value = reponseJSON["hydra:member"];
                console.log(recettes.value)

            });
    } else {
        fetch(encodeURI(`https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels/${idMateriel}`))
            .then(reponsehttp => reponsehttp.json())
            .then(reponseJSON => {
                console.log(reponseJSON["recettes"])
                recettes.value = [];
                reponseJSON["recettes"].forEach((element: any) => {
                    console.log(element.id)
                    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/recettes/' + element.id))
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
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/categorie_recettes'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            categories.value = reponseJSON["hydra:member"];
        });
}

// Liste des ingrédients pour champs select

const ingredients: Ref<Ingredient[]> = ref([]);
function chargerIngredient() {
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/ingredients'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            ingredients.value = reponseJSON["hydra:member"];
        });
}

// Liste du matériels pour champs select

const materiels: Ref<Ingredient[]> = ref([]);
function chargerMateriel() {
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels'))
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
  <div class="wrapper">
    <div class="section">
      <h2>Catégories</h2>
      <!-- <div class="selected-label">Selected: {{ selected }}</div> -->

    <select v-model="selected" @change="chargerFeed(selected)" class="select">
        <option disabled value="">Sélectionner une catégorie</option>
        <option value="0">Toutes Categories</option>
        <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
            {{ categorie.nom }}
        </option>
    </select>
    </div>

    <div class="section">
      <h2>Ingrédients</h2>


    <select v-model="selectedIngredient" @change="chargerFeed2(selectedIngredient)" class="select">
        <option disabled value="">Sélectionner un ingrédient</option>
        <option value="0"></option>
        <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
            {{ ingredient.nom }}
        </option>
    </select>
    </div>

    <div class="section">
      <h2>Matériels</h2>



    <select v-model="selectedMateriel" @change="chargerFeed3(selectedMateriel)" class="select">
        <option disabled value="">Sélectionner un matériel</option>
        <option value="0"></option>
        <option v-for="materiel in materiels" :key="materiel.id" :value="materiel.id">
            {{ materiel.nom }}
        </option>
    </select>
    </div>


    <div class="recipe-list">
        <BoiteRecette v-for="recette in recettes" :key="recette.id" :recette="recette" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 40px;
  margin-top: 60px;
  font-family: 'FreeMono', sans-serif;
}

.section {
  width: 20%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.section:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 8px;
}

.select {
  width: 90%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s, background-color 0.3s;
}

.select:focus {
  border-color: #4caf50;
  background-color: #fff;
}

.recipe-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
