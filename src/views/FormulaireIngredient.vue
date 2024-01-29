<template>
    <div class="formulaire">
        <h2>Créer un nouvel ingrédient</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">Nom</label>
            <input v-model="ingredient.name" type="text" required class="input-field" />

            <label for="description">Description</label>
            <textarea v-model="ingredient.description" rows="4" required class="input-field"></textarea>

            <label for="prix">Prix</label>
            <input v-model="ingredient.prix" type="text" required class="input-field" />

            <label for="imageFile">Image</label>
            <input type="file" id="imageFile" ref="imageInput" accept="image/*" class="input-field" />

            <div>


                <!--<label for="searchCategorie">Rechercher</label>
              <!nput v-model="searchCategorie" type="text" @input="chargerFeedCategorie"
                  placeholder="Rechercher une catégorie" class="input-field"/>-->
                <label for="categorie">Catégorie</label>
                <select v-model="selectedCategorie" @change="chargerFeedCategorie" class="input-field">
                    <option disabled value="">Sélectionner</option>
                    <option v-for="categorie in filterCategories()" :key="categorie.id" :value="categorie.id">
                        {{ categorie.nom }}
                    </option>
                </select>

                <button class="submit-button" @click.prevent="addCategorieToList"
                    :disabled="selectedCategorie === ''">Ajouter</button>

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

            <label v-if="storeAuthentification.premium" for="lien">Lien vers le produit</label>
            <input v-if="storeAuthentification.premium" v-model="ingredient.lien" type="text" class="input-field" />

            <button type="submit" class="submit-button">Créer l'ingrédient</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { flashMessage } from '@smartweb/vue-flash-message';
import { storeAuthentification } from '@/storeAuthentification'


const imageInput = ref<HTMLInputElement | null>(null);


const ingredient = ref({
    name: '',
    description: '',
    prix: '',
    imageUrl: '',
    lien: '',
});

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
const submitting = ref(false);

const submitForm = async () => {

    if (submitting.value) {
        return;
    }
    submitting.value = true;
    try {
        let tabC = fillCategories(selectedCategories);

        let utilisateur = 'https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/utilisateurs/' + storeAuthentification.userId;

        const formData = new FormData();
        formData.append('nom', ingredient.value.name);
        formData.append('description', ingredient.value.description);
        formData.append('prix', ingredient.value.prix);
        formData.append('utilisateur', utilisateur);
        formData.append('lien', ingredient.value.lien);
        formData.append('categorieIngredients', JSON.stringify(tabC));



        if (imageInput.value?.files) {
            formData.append('imageFile', imageInput.value.files[0] ?? new File([], ''));
        }
        try {
            const response = await fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/ingredients', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + storeAuthentification.JWT
                },
                body: formData,
            });

            response.json().then(reponseJSON => {
                if (response.ok) {
                    console.log('Ingrédient créé avec succès !');
                    // Vous pouvez mettre à jour l'URL de l'image après la création réussie si votre API retourne l'URL de l'image
                    flashMessage.show({
                        type: 'success',
                        title: "L'ingrédient a bien été créé"
                    });
                } else {
                    let erreur = reponseJSON["detail"];
                    console.log(reponseJSON)
                    ingredient.value.imageUrl = 'URL_de_l_image_retournee_par_votre_API';
                    flashMessage.show({
                        type: 'error',
                        title: erreur
                    });
                    console.error('Erreur lors de la création de l\'ingrédient');
                }
            })
        }
        catch (error) {
            flashMessage.show({
                type: 'error',
                title: "L'ingrédient n'a pas pu être créé"
            });
            console.error('Erreur lors de la requête :', error);
        }
    } catch (error) {
        // Handle errors as needed
    } finally {
        // Reset submitting to false after the form submission is complete
        submitting.value = false;
    }

};

const selectedCategories: Ref<{ id: number, nom: string }[]> = ref([]);
const categories: Ref<{ id: number, nom: string }[]> = ref([]);

function chargerFeedCategorie() {
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/categorie_ingredients'))
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
    chargerFeedCategorie();

});


</script>


<style scoped>
@import "@/assets/form.css";
</style>
