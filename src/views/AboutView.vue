<template>
  <div class="about">
    <div class="section">
      <h1>À Propos</h1>
      <p>
        Bienvenue sur <span class="brand">COSMETIPS</span>, l'endroit où la beauté devient personnelle et accessible à tous ! Notre mission est de mettre entre vos mains le pouvoir de créer vos propres recettes de cosmétiques en toute simplicité. Que vous soyez un passionné de soins de la peau, un amateur de produits naturels ou simplement curieux de découvrir l'univers de la beauté fait-maison, notre plateforme est conçue pour vous.
      </p>
    </div>

    <div class="section">
      <h1>Pourquoi <span class="brand">COSMETIPS</span> ?</h1>
      <p>
        Nous croyons fermement que la beauté devrait être une expression personnelle et unique. Notre plateforme vous permet de créer vos propres recettes de cosmétiques en y ajoutant des ingrédients et en utilisant le matériel qui vous convient. Que vous préfériez des produits 100% naturels, ou que vous souhaitiez simplement personnaliser votre routine de beauté, <span class="brand">COSMETIPS</span> vous offre une palette infinie d'options.
      </p>
    </div>

    <div class="section">
      <h1>Accessible à Tous</h1>
      <p>
        Nous avons conçu <span class="brand">COSMETIPS</span> pour être une ressource accessible à tous. Aucune expérience préalable n'est nécessaire – que vous soyez novice en matière de cosmétiques maison ou un expert en herbe, notre interface conviviale vous guide tout au long du processus de création de vos propres formules uniques.
      </p>
    </div>

    <div class="section">
      <h1>Opportunités pour les Professionnels</h1>
      <p>
        Si vous êtes un professionnel de l'industrie des cosmétiques, <span class="brand">COSMETIPS</span> offre une opportunité unique de mettre en avant vos produits. Si vous vendez des ingrédients de qualité sur votre propre site, vous pouvez être présent en tant que partenaire de confiance sur notre plateforme. Ajoutez des liens vers vos produits et permettez aux utilisateurs de découvrir une gamme encore plus étendue d'ingrédients pour enrichir leurs créations.
      </p>
      <p>
        Explorez un monde de créativité, d'expression personnelle et de beauté accessible à tous. Ensemble, redéfinissons la manière dont nous considérons la beauté.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: 20px auto;
  padding: 40px;
  background-color: #fafafa;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-family: 'FreeMono', sans-serif;

}

.brand {
  color: #e89b9b;
}

.section {
  margin: 0 10px;
  margin-bottom: 20px;
  text-align: justify;
}

.section h1 {
  color: #333;
  font-size: 25px;
  margin-bottom: 5px;
}

.section p {
  color: #444;
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 10px;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

