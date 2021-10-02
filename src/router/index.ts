import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ShowsList from '@/components/shows-list-component/ShowsList.vue'
import ShowDetails from '@/components/show-details-component/ShowDetails.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: ShowsList
  },
  {
    path: '/:id',
    name: 'ShowDetails',
    component: ShowDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
