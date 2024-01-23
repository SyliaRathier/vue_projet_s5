<template>
    <div>
        <h2>Créer une nouvelle recette</h2>
        <form @submit.prevent="submitForm">
            <label for="titre">Titre:</label>
            <input v-model="recette.titre" type="text" required />

            <label for="description">Description:</label>
            <textarea v-model="recette.description" rows="4" required></textarea>

            <label for="conseil">Conseil:</label>
            <textarea v-model="recette.conseil" rows="4" required></textarea>

            <label for="ingredients">Ingrédients:</label>
            <select multiple v-model="recette.ingredients">
                <option value="https://127.0.0.1:8000/api/quantite_ingredients/3">Ingrédient 1</option>
                <option value="https://127.0.0.1:8000/api/quantite_ingredients/4">Ingrédient 2</option>
                <!-- Ajoutez d'autres options au besoin -->
            </select>

            <label for="duree">Durée:</label>
            <input v-model="recette.duree" type="text" required />

            <label for="prix">Prix:</label>
            <input v-model="recette.prix" type="text" required />

            <label for="imageFile">Image:</label>
            <input type="file" id="imageFile" ref="imageInput" accept="image/*" />

            <button type="submit">Créer la recette</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

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

const submitForm = async () => {
    const formData = new FormData();
    formData.append('titre', recette.value.titre);
    formData.append('description', recette.value.description);
    formData.append('conseil', recette.value.conseil);
    formData.append('ingredients', JSON.stringify(recette.value.ingredients));
    formData.append('duree', recette.value.duree);
    formData.append('prix', recette.value.prix);
    if (imageInput.value?.files) {
        formData.append('imageFile', imageInput.value.files[0] ?? new File([], ''));
    }

    try {
        const response = await fetch('https://127.0.0.1:8000/api/recettes', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDYwNDMzNDIsImV4cCI6MTcwNjA0Njk0Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoic3lsaWFhIiwiaWQiOjQsImFkcmVzc2VNYWlsIjoic3lsaWFhQGV4YW1wbGUuY29tIiwicHJlbWl1bSI6ZmFsc2V9.IsLTDhyvWvnAzI2KazaqcOaNQGmeEeoZUI8ZCkxsAmng8_Ql87xZnKrZH5WTvvmS76UQnAtp_jTkp0CdTXSZ0TCZxDsWO21rSNgt7a_mMmZdJCC-xpdXxoc65oCVOsC4cZ6xrSGXo1w0aHtyaZyADJ2-rlJ3LoEeJfjplzrtYge10Yu7bh_890JB7jcBcdXS6krRIV0fGAvcWMaz4IAF_wCcC-dKUts0q1ru8dVASqzNXy4yRwpFMTX5h8RQa_XxVrHja8JwhAh8Y9uF2uKnRqOOYeLhap2O9Qm1ZicAalZiCa8sY49rCJfX1NiktqSbdqXnfMV8A256pSEIK7k5eg"
            },
            body: formData,
        });

        if (response.ok) {
            console.log('Ingrédient créé avec succès !');
            // Vous pouvez mettre à jour l'URL de l'image après la création réussie si votre API retourne l'URL de l'image
            recette.value.imageUrl = 'URL_de_l_image_retournee_par_votre_API';
        } else {
            console.error('Erreur lors de la création de l\'ingrédient');
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
    }
};
</script>
  