import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import TeamsView from '../views/TeamsView.vue'

const routes = [
  {
    path: '/',
    name: 'Teams',
    component: TeamsView
  },
  {
    path: '/users',
    name: 'Users',
    component:UsersView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
