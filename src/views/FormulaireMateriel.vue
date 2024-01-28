<template>
    <div class="materiel-form">
        <h2>Créer du matériel</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">Nom:</label>
            <input v-model="materiel.name" type="text" required class="input-field" />

            <label for="description">Description:</label>
            <textarea v-model="materiel.description" rows="4" class="input-field"></textarea>

            <label for="prix">Prix:</label>
            <input v-model="materiel.prix" type="number" class="input-field" />

            <label for="caracteristique">Caractéristique:</label>
            <input v-model="materiel.caracteristique" type="text" rows="4" class="input-field" />

            <label for="caracteristique">Utilisation:</label>
            <input v-model="materiel.utilisation" type="text" rows="4" class="input-field" />

            <label for="imageFile" class="file-label">Image:</label>
            <input type="file" id="imageFile" ref="imageInput" accept="image/*" class="input-field" />

            <label v-if="storeAuthentification.premium" for="lien">Lien vers le produit:</label>
            <input v-if="storeAuthentification.premium" v-model="materiel.lien" type="text" class="input-field" />

            <button type="submit" class="submit-button">Créer</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { flashMessage } from '@smartweb/vue-flash-message';
import { storeAuthentification } from '@/storeAuthentification'

const imageInput = ref<HTMLInputElement | null>(null);

const materiel = ref({
    name: '',
    description: '',
    utilisation: '',
    prix: '',
    imageUrl: '',
    caracteristique: '',
    lien: '',
});

const submitForm = async () => {

    let utilisateur = 'https://127.0.0.1:8000/api/utilisateurs/' + storeAuthentification.userId;


    const formData = new FormData();
    formData.append('nom', materiel.value.name);
    formData.append('description', materiel.value.description);
    formData.append('prix', materiel.value.prix);
    formData.append('caracteristique', materiel.value.caracteristique);
    formData.append('utilisation', materiel.value.utilisation);
    formData.append('utilisateur', utilisateur);
    formData.append('lien', materiel.value.lien);



    if (imageInput.value?.files) {
        formData.append('imageFile', imageInput.value.files[0] ?? new File([], ''));
    }
    try {
        const response = await fetch('https://127.0.0.1:8000/api/materiels', {
            method: 'POST',
            headers: {
                // Assurez-vous d'ajouter d'autres en-têtes requis par votre API si nécessaire
            },
            body: formData,
        });

        if (response.ok) {
            console.log('Ingrédient créé avec succès !');
            // Vous pouvez mettre à jour l'URL de l'image après la création réussie si votre API retourne l'URL de l'image
            flashMessage.show({
                type: 'success',
                title: 'Le matériel a bien été créé'
            });
        } else {
            // Vous pouvez mettre à jour l'URL de l'image après la création réussie si votre API retourne l'URL de l'image
            materiel.value.imageUrl = 'URL_de_l_image_retournee_par_votre_API';
            flashMessage.show({
                type: 'error',
                title: "Le matériel n'a pas pu être créé"
            });
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
        flashMessage.show({
            type: 'error',
            title: "Le matériel n'a pas pu être créé"
        });
    }
};


</script>

<style scoped>
.materiel-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fafafa;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-family: 'FreeMono', sans-serif;
}

.materiel-form h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.form-container {
  display: grid;
  gap: 20px;
}

label {
  font-size: 16px;
  color: #444;
}

.input-field,
.file-label {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s, background-color 0.3s;
}

.input-field:focus,
.file-label:focus {
  border-color: #BBB6AF;
  background-color: #fff;
}

.submit-button {
  background-color: #BBB6AF;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}


.submit-button:hover {
  background-color: #A6A29A;
}
</style>
