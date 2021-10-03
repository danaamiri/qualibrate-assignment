import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ShowsList from '@/components/shows-list-component/ShowsList.vue'
import ShowDetails from '@/components/show-details-component/ShowDetails.vue'
import NotFound from '@/utils/components/NotFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/shows'
  },
  {
    path: '/shows',
    component: ShowsList
  },
  {
    path: '/shows/:id',
    name: 'ShowDetails',
    component: ShowDetails
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
