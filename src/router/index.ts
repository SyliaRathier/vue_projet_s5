import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
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
    }
  ]
})

export default router
