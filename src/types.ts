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
}

export interface Ingredient{
    id: number;
    nom: string;
    description: string;
}

export interface Categorie{
    id: number;
    nom: string;
}
