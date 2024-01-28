<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import type { Ref } from 'vue';
const selectedMateriels: Ref<{ id: number, nom: string }[]> = ref([]);
// Toutes les recettes
const materiels: Ref<{ id: number, nom: string }[]> = ref([]);
function chargerFeedMateriel() {
    fetch(encodeURI('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels'))
        .then(reponsehttp => reponsehttp.json())
        .then(reponseJSON => {
            materiels.value = reponseJSON["hydra:member"];
        });
}
const selectedM: Ref<string> = ref(''); // Ensure that selected is a ref
const searchM: Ref<string> = ref('');
const filterMateriels = () => {
    if (searchM.value === '') {
        return materiels.value;
    } else {
        return materiels.value.filter(materiel =>
            materiel.nom.toLowerCase().startsWith(searchM.value.toLowerCase())
        );
    }
};
const addMaterielToList = () => {
    const selectedMateriel = materiels.value.find(materiel => materiel.id === parseInt(selectedM.value));
    if (selectedMateriel) {
        selectedMateriels.value.push({
            id: selectedMateriel.id,
            nom: selectedMateriel.nom,

        });
    }
};
const removeMaterielFromList = (id: number, index: number) => {
    const response = fetch('https://webinfo.iutmontp.univ-montp2.fr/~rathiers/projet_web/public/api/materiels/' + id, {
        method: 'DELETE',
    });
    selectedMateriels.value.splice(index, 1);
};


onMounted(() => {
    chargerFeedMateriel();
});
</script>

<template>
    <div>
        <div>Selected: {{ selectedM }}</div>

        <label for="searchM">Search:</label>
        <input v-model="searchM" type="text" @input="chargerFeedMateriel" placeholder="Rechercher un ingrédient" />

        <select v-model="selectedM" @change="chargerFeedMateriel">
            <option disabled value="">Please select one</option>
            <option value="0">All Materiels</option>
            <option v-for="materiel in filterMateriels()" :key="materiel.id" :value="materiel.id">
                {{ materiel.nom }}
            </option>
        </select>

        <button @click="addMaterielToList" :disabled="selectedM === ''">Ajouter</button>

        <div v-if="selectedMateriels.length > 0">
            <h3>Ingrédients sélectionnés :</h3>
            <ul>
                <li v-for="(item, index) in selectedMateriels" :key="item.id">
                    {{ item.nom }}
                    <button @click="removeMaterielFromList(item.id, index)">Supprimer</button>

                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
