export interface Utilisateur{
    id: number;
    adresseEmail: string;
    login: string;
    premium: boolean;
}

export interface Recette{
    id: number;
    titre: string;
    description: string;
    datePublication: string;
    imageFile : File;
}

export interface Ingredient{
    id: number;
    nom: string;
    description: string;
    imageName : string;
}

export interface QuantiteIngredient{
    id : number;
    id_ingredient_id : number;
    recette_id : number;
    quantite : GLfloat;
    unite : string;
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
