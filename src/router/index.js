import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import MovieDetail from '@/views/MovieDetail.vue';
import ActorDetail from '@/components/ActorDetail.vue';
import movies from '../../data/movie.json';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies/:id',  
    name: 'movie-detail',
    component: MovieDetail,
    props: true,  
  },
  {
    path: '/actor/:slug',  
    name: 'actorDetail',
    component: ActorDetail,
    props: true, 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
