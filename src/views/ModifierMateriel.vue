<template>
    <div class="materiel-form">
        <h2>Modifier le matériel</h2>
        <form @submit.prevent="submitForm" class="form-container">
            <label for="name">Nom:</label>
            <input v-model="materiel.nom" type="text" required class="input-field" />

            <label for="description">Description:</label>
            <textarea v-model="materiel.description" rows="4" class="input-field"></textarea>

            <label for="prix">Prix:</label>
            <input v-model="materiel.prix" type="text" class="input-field" />

            <label for="caracteristique">Caractéristique:</label>
            <input v-model="materiel.caracteristique" type="text" rows="4" class="input-field" />

            <label for="caracteristique">Utilisation:</label>
            <input v-model="materiel.utilisation" type="text" rows="4" class="input-field" />

            <label v-if="storeAuthentification.premium" for="lien">Lien vers le produit:</label>
            <input v-if="storeAuthentification.premium" v-model="materiel.lien" type="text" class="input-field" />

            <button type="submit" class="submit-button">Modifier</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { flashMessage } from '@smartweb/vue-flash-message';
import { storeAuthentification } from '@/storeAuthentification'
import { useRoute } from 'vue-router'


const materiel = ref({
    nom: '',
    description: '',
    utilisation: '',
    prix: '',
    caracteristique: '',
    lien: null
});

const route = useRoute()
const id = route.params.id

function fillIngredient() {
    console.log(id);

    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels/' + id))
        .then((reponsehttp) => reponsehttp.json())
        .then((reponseJSON) => {
            materiel.value = reponseJSON;
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

    let bodyM;
    if (storeAuthentification.premium) {
        bodyM = JSON.stringify({
            nom: materiel.value.nom,
            description: materiel.value.description,
            prix: String(materiel.value.prix),
            caracteristique: materiel.value.caracteristique,
            utilisation: materiel.value.utilisation,
            lien: null,
        })
        console.log(bodyM)

    }
    else {
        bodyM = JSON.stringify({
            nom: materiel.value.nom,
            description: materiel.value.description,
            prix: String(materiel.value.prix),
            caracteristique: materiel.value.caracteristique,
            utilisation: materiel.value.utilisation,
        })
        console.log(bodyM)


    }

    try {
        const response = await fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': 'Bearer ' + storeAuthentification.JWT
            },
            body: bodyM
            // body: JSON.stringify({
            //     nom: materiel.value.nom,
            //     description: materiel.value.description,
            //     prix: String(materiel.value.prix),
            //     caracteristique: materiel.value.caracteristique,
            //     utilisation: materiel.value.utilisation,
            //     lien: materiel.value.lien,

        });
        response.json().then(reponseJSON => {

            if (response.ok) {
                console.log('Matériel modifié avec succès !');
                // Vous pouvez mettre à jour l'URL de l'image après la création réussie si votre API retourne l'URL de l'image
                flashMessage.show({
                    type: 'success',
                    title: 'Le matériel a bien été modifié'
                });
            } else {
                let erreur = reponseJSON["detail"];
                console.log(reponseJSON)
                // Vous pouvez mettre à jour l'URL de l'image après la création réussie si votre API retourne l'URL de l'image
                flashMessage.show({
                    type: 'error',
                    title: erreur
                });
            }
        })

    } catch (error) {
        console.error('Erreur lors de la requête :', error);
        flashMessage.show({
            type: 'error',
            title: "Le matériel n'a pas pu être modifié"
        });
    }
};


</script>
  





<style scoped>
.materiel-form {
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
