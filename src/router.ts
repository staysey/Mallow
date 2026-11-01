import { createRouter, createWebHistory } from 'vue-router'
import BreedView from './views/BreedView.vue'
import BreedsView from './views/BreedsView.vue'
import HomeView from './views/HomeView.vue'
import KitPreview from './components/KitPreview.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/breeds', name: 'breeds', component: BreedsView },
    { path: '/breeds/:id', name: 'breed', component: BreedView },
    { path: '/kit', name: 'kit', component: KitPreview },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
