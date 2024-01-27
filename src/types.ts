export interface Utilisateur{
    id: number;
    adresseEmail: string;
    login: string;
    premium: boolean;
    nom: string,
    prenom: string
}

export interface Recette{
    id: number;
    titre: string;
    description: string;
    conseil: string;
    datePublication: string;
    prix: GLfloat;
    duree: string;
    imageName : string,
    utilisateur: Utilisateur,
    ingredients: QuantiteIngredient[],
    materiels: Materiel[]
}

export interface Ingredient{
    id: number;
    nom: string;
    prix: GLfloat,
    description: string;
    imageName : string;
    utilisateur: Utilisateur
}

export interface Materiel{
    id: number;
    nom: string;
    description: string;
    prix: GLfloat;
    imageName : string;
    caracteristique: string;
    utilisation: string;
    utilisateur: Utilisateur


}
export interface QuantiteIngredient{
    id : number;
    id_ingredient_id : number;
    recette_id : number;
    quantite : GLfloat;
    unite : string;
    idIngredient: Ingredient
}

export interface Categorie{
    id: number;
    nom: string;
}

export interface Utilisateur{
    id: number;
    adresseEmail: string;
    login: string;
    nom : string;
    prenom : string;
    premium: boolean;
}
