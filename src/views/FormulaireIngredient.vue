<template>
    <div>
        <h2>Créer un nouvel ingrédient</h2>
        <form @submit.prevent="submitForm">
            <label for="name">Nom:</label>
            <input v-model="ingredient.name" type="text" required />

            <label for="description">Description:</label>
            <textarea v-model="ingredient.description" rows="4" required></textarea>

            <label for="prix">Prix:</label>
            <input v-model="ingredient.prix" type="text" required />

            <label for="imageFile">Image:</label>
            <input type="file" id="imageFile" ref="imageInput" accept="image/*" />

            <button type="submit">Créer l'ingrédient</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { flashMessage } from '@smartweb/vue-flash-message';


const imageInput = ref<HTMLInputElement | null>(null);

const ingredient = ref({
    name: '',
    description: '',
    prix: '',
    imageUrl: '',
});

const submitForm = async () => {
    const formData = new FormData();
    formData.append('nom', ingredient.value.name);
    formData.append('description', ingredient.value.description);
    formData.append('prix', ingredient.value.prix);
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

        if (response.ok) {
            console.log('Ingrédient créé avec succès !');
            // Vous pouvez mettre à jour l'URL de l'image après la création réussie si votre API retourne l'URL de l'image
            ingredient.value.imageUrl = 'URL_de_l_image_retournee_par_votre_API';
            flashMessage.show({
                type: 'error',
                title: 'La connection a échoué'
            });
        } else {
            flashMessage.show({
                type: 'success',
                title: 'Vous êtes connecté'
            });
            console.error('Erreur lors de la création de l\'ingrédient');
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
    }
};


</script>
  