<template>
    <div class="ingredient-form">
        <h2>Modifier l'ingrédient</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">Nom:</label>
            <input v-model="ingredient.nom" type="text" required class="input-field" />

            <label for="description">Description:</label>
            <textarea v-model="ingredient.description" rows="4" required class="input-field"></textarea>

            <label for="prix">Prix:</label>
            <input v-model="ingredient.prix" type="number" required class="input-field" />

            <label v-if="storeAuthentification.premium" for="lien">Lien vers le produit:</label>
            <input v-if="storeAuthentification.premium" v-model="ingredient.lien" type="text" class="input-field" />

            <button type="submit" class="submit-button">Modifier l'ingrédient</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { flashMessage } from '@smartweb/vue-flash-message';
import { storeAuthentification } from '@/storeAuthentification'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id


const ingredient = ref({
    nom: '',
    description: '',
    prix: '',
    lien: '',
});

function fillIngredient() {
    console.log(id);

    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/ingredients/' + id))
        .then((reponsehttp) => reponsehttp.json())
        .then((reponseJSON) => {
            ingredient.value = reponseJSON;
            console.log(reponseJSON);

        })
        .catch((error) => {
            console.error('Erreur lors du chargement du profil:', error);
        });

}

onMounted(() => {
    fillIngredient();
});



const submitForm = async () => {

    try {
        const response = await fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/ingredients/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': 'Bearer ' + storeAuthentification.JWT
            },
            body: JSON.stringify({
                nom: ingredient.value.nom,
                description: ingredient.value.description,
                prix: String(ingredient.value.prix),
                lien: ingredient.value.lien,
            })
        });

        response.json().then(reponseJSON => {
            if (response.ok) {
                console.log('Ingrédient modifié avec succès !');
                // Vous pouvez mettre à jour l'URL de l'image après la création réussie si votre API retourne l'URL de l'image
                flashMessage.show({
                    type: 'success',
                    title: "L'ingrédient a bien été modifié"
                });
            } else {
                let erreur = reponseJSON["detail"];
                console.log(reponseJSON)
                flashMessage.show({
                    type: 'error',
                    title: erreur
                });
                console.error('Erreur lors de la modification de l\'ingrédient');
            }
        })
    }
    catch (error) {
        flashMessage.show({
            type: 'error',
            title: "L'ingrédient n'a pas pu être modifié"
        });
        console.error('Erreur lors de la requête :', error);
    }

};


</script>
  




<style scoped>
.ingredient-form {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.form-container {
    display: flex;
    flex-direction: column;
}

.label {
    margin-bottom: 8px;
}

.input-field {
    margin-bottom: 16px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.file-label {
    margin-bottom: 8px;
    display: block;
}

.submit-button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.submit-button:hover {
    background-color: #45a049;
}
</style>
