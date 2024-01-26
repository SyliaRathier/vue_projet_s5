import { createRouter, createWebHistory } from 'vue-router'
import ListeRecette from '@/views/ListeRecette.vue'
import ListeIngredient from '@/views/ListeIngredient.vue'
import FormulaireIngredient from '@/views/FormulaireIngredient.vue'
import FormulaireRecette from '@/views/FormulaireRecette.vue'
import Test from '@/views/Test.vue'
import SingleRecette from "@/views/SingleRecette.vue";
import FormulaireMateriel from '@/views/FormulaireMateriel.vue'
import SingleIngredient from '@/views/SingleIngredient.vue'
import Connexion from '@/views/Connexion.vue'
import Inscription from '@/views/Inscription.vue'
import InfoUtilisateur from '@/views/InfoUtilisateur.vue'
import SingleMateriel from '@/views/SingleMateriel.vue'
import SingleRecette from '@/views/SingleRecette.vue'


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
      path: '/recette/:id',
      name: 'SingleRecettes',
      component: SingleRecette
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: ListeIngredient
    },
    {
      path: '/creerRecette',
      name: 'creerRecette',
      component: FormulaireRecette
    },
    {
      path: '/creerIngredient',
      name: 'creerIngredient',
      component: FormulaireIngredient
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/creerMateriel',
      name: 'creerMateriel',
      component: FormulaireMateriel
    },
    {
      path: '/ingredient/:id',
      name: 'ingredient',
      component: SingleIngredient
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
      component: InfoUtilisateur
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
    }
  ]
})

export default router
