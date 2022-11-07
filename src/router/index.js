import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import TeamsView from '../views/TeamsView.vue'
import PageTeamDetails from '../views/PageTeamDetails.vue'


const routes = [
  {
    path: '/teams',
    name: 'Teams',
    component: TeamsView
  },
  {
    path: '/users',
    name: 'Users',
    component:UsersView
  },
  {
    path: "/teams/:teamId",
    name: "TeamDetail",
    component: PageTeamDetails,
    props: true,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
