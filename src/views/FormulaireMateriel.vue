<template>
    <div class="formulaire">
        <h2>Créer du matériel</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">Nom</label>
            <input v-model="materiel.name" type="text" required class="input-field" />

            <label for="description">Description</label>
            <textarea v-model="materiel.description" rows="4" class="input-field"></textarea>

            <label for="prix">Prix</label>
            <input v-model="materiel.prix" type="text" class="input-field" />

            <label for="caracteristique">Caractéristiques</label>
            <input v-model="materiel.caracteristique" type="text" rows="4" class="input-field" />

            <label for="caracteristique">Utilisation</label>
            <input v-model="materiel.utilisation" type="text" rows="4" class="input-field" />

            <label for="imageFile" class="file-label">Image</label>
            <input type="file" id="imageFile" ref="imageInput" accept="image/*" class="input-field" />

            <label v-if="storeAuthentification.premium" for="lien">Lien vers le produit:</label>
            <input v-if="storeAuthentification.premium" v-model="materiel.lien" type="text" class="input-field" />

            <button type="submit" class="submit-button">Créer le matériel</button>
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

    let utilisateur = 'https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/utilisateurs/' + storeAuthentification.userId;


    const formData = new FormData();
    formData.append('nom', materiel.value.name);
    formData.append('description', materiel.value.description);
    formData.append('prix', materiel.value.prix);
    formData.append('caracteristique', materiel.value.caracteristique);
    formData.append('utilisation', materiel.value.utilisation);
    formData.append('utilisateur', utilisateur);
    if (storeAuthentification.premium) {
        formData.append('lien', materiel.value.lien);

    }



    if (imageInput.value?.files) {
        formData.append('imageFile', imageInput.value.files[0] ?? new File([], ''));
    }
    try {
        const response = await fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels', {
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
                    title: 'Le matériel a bien été créé'
                });
            } else {
                // Vous pouvez mettre à jour l'URL de l'image après la création réussie si votre API retourne l'URL de l'image
                materiel.value.imageUrl = 'URL_de_l_image_retournee_par_votre_API';
                console.log(reponseJSON["detail"]);

                flashMessage.show({
                    type: 'error',
                    title: "Le matériel n'a pas pu être créé"
                });
            }
        });
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
@import "@/assets/form.css";
</style>
