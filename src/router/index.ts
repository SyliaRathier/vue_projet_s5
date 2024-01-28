import { createRouter, createWebHistory } from 'vue-router'
import ListeRecette from '@/views/ListeRecette.vue'
import ListeIngredient from '@/views/ListeIngredient.vue'
import FormulaireIngredient from '@/views/FormulaireIngredient.vue'
import FormulaireRecette from '@/views/FormulaireRecette.vue'
import Test from '@/views/Test.vue'
import FormulaireMateriel from '@/views/FormulaireMateriel.vue'
import SingleIngredient from '@/views/SingleIngredient.vue'
import Connexion from '@/views/Connexion.vue'
import Inscription from '@/views/Inscription.vue'
import InfoUtilisateur from '@/views/InfoUtilisateur.vue'
import SingleMateriel from '@/views/SingleMateriel.vue'
import SingleRecette from '@/views/SingleRecette.vue'
import MesRecettes from '@/views/MesRecettes.vue'
import MesIngredients from '@/views/MesIngredients.vue'
import MesMateriels from '@/views/MesMateriels.vue'
import { storeAuthentification } from '@/storeAuthentification'
import ListeMateriel from '@/views/ListeMateriel.vue'
import ModifierIngredient from '@/views/ModifierIngredient.vue'
import Premium from "@/views/Premium.vue";
import ModifierMateriel from '@/views/ModifierMateriel.vue'
import ModifierRecette from '@/views/ModifierRecette.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/recettes',
      name: 'recettes',
      component: ListeRecette
    },
    {
      path: '/premium',
      name: 'premium',
      component: Premium
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: ListeIngredient
    },
    {
      path: '/materiels',
      name: 'materiels',
      component: ListeMateriel
    },
    {
      path: '/creerRecette',
      name: 'creerRecette',
      component: FormulaireRecette,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
    {
      path: '/creerIngredient',
      name: 'creerIngredient',
      component: FormulaireIngredient,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/creerMateriel',
      name: 'creerMateriel',
      component: FormulaireMateriel,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription
    },
    {
      path: '/utilisateur',
      name: 'utilisateur',
      component: InfoUtilisateur,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
    {
      path: '/materiel/:id',
      name: 'materiel',
      component: SingleMateriel
    },
    {
      path: '/recette/:id',
      name: 'recette',
      component: SingleRecette
    },
    {
      path: '/ingredient/:id',
      name: 'ingredient',
      component: SingleIngredient
    },
    {
      path: '/mesRecettes',
      name: 'mesRecettes',
      component: MesRecettes,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
    {
      path: '/mesIngredients',
      name: 'mesIngredients',
      component: MesIngredients,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
    {
      path: '/mesMateriels',
      name: 'mesMateriels',
      component: MesMateriels,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
    {
      path: '/modifierIngredient/:id',
      name: 'modifierIngredient',
      component: ModifierIngredient,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
    {
      path: '/modifierMateriel/:id',
      name: 'modifierMateriel',
      component: ModifierMateriel,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
    {
      path: '/modifierRecette/:id',
      name: 'modifierRecette',
      component: ModifierRecette,
      beforeEnter: (to, from, next) => {
        if (storeAuthentification.estConnecte) {
          // L'utilisateur est connecté, autoriser l'accès
          next();
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          next('/connexion');
        }
      },
    },
  ]
})

export default router
