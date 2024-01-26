<template>
    <div class="ingredient-form">
        <h2>Créer un nouvel ingrédient</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">Nom:</label>
            <input v-model="ingredient.name" type="text" required class="input-field" />

            <label for="description">Description:</label>
            <textarea v-model="ingredient.description" rows="4" required class="input-field"></textarea>

            <label for="prix">Prix:</label>
            <input v-model="ingredient.prix" type="number" required class="input-field" />

            <label for="imageFile" class="file-label">Image:</label>
            <input type="file" id="imageFile" ref="imageInput" accept="image/*" class="input-field" />

            <label v-if="storeAuthentification.premium" for="lien">Lien vers le produit:</label>
            <input v-if="storeAuthentification.premium" v-model="ingredient.lien" type="text" class="input-field" />

            <button type="submit" class="submit-button">Créer l'ingrédient</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
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

const submitForm = async () => {

    let utilisateur = 'https://127.0.0.1:8000/api/utilisateurs/' + storeAuthentification.userId;

    const formData = new FormData();
    formData.append('nom', ingredient.value.name);
    formData.append('description', ingredient.value.description);
    formData.append('prix', ingredient.value.prix);
    formData.append('utilisateur', utilisateur);
    formData.append('lien', ingredient.value.lien);


    if (imageInput.value?.files) {
        formData.append('imageFile', imageInput.value.files[0] ?? new File([], ''));
    }
    try {
        const response = await fetch('https://127.0.0.1:8000/api/ingredients', {
            method: 'POST',
            headers: {
                // Assurez-vous d'ajouter d'autres en-têtes requis par votre API si nécessaire
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
