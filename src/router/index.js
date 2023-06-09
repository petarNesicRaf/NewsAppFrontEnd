import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    /*
  {
    path: '/',
    name: 'Home',
    component: Home
  },

     */
  {
    path: '/news',
    name: 'News',

    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
  },

  {
    path: '/news/:id',
    name: 'single-news',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/SingleNews.vue')
  },
  {
    path: '/categories',
    name: 'Categories',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/Categories.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
   path:'/add_category',
   name: 'AddCategory',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/AddCategory.vue')

  },
  {
    path:'/edit_category',
    name: 'EditCategory',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/EditCategory.vue')

  },
  {
    path:'/get_news_by_category',
    name: 'NewsByCategory',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/NewsByCategory.vue')

  },
  {
    path:'/get_news_by_category',
    name: 'NewsByCategory',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/NewsByCategory.vue')

  },
  {
    path:'/home_page',
    name: 'HomePage',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/HomePage.vue')

  },
  {
    path:'/most_read',
    name: 'MostRead',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/MostRead.vue')

  },
  {
    path:'/category_news',
    name: 'CategoryNews',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/CategoryNews.vue')

  },
  {
    path:'/news_signle',
    name: 'NewsSingle',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/NewsSingle.vue')

  },
  {
    path:'/tag_news',
    name: 'TagNews',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/TagNews.vue')

  },
  {
    path:'/users',
    name: 'Users',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')

  },
  {
    path:'/edit_user',
    name: 'EditUser',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/EditUser.vue')

  },
  {
    path:'/create_user',
    name: 'CreateUser',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/CreateUser.vue')

  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //ruta na koju hocemo da idemo ako postoji nasa authrequired promenljiva
  //ova metoda se zove svaki put kad menjamo rutu zato iz mete uzimamo auth required
  //ukoliko je rekuired iz local storage uzimamo jwt
  //izvlacimo iz meta iz to
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt');

    //ukoliko ne postoji next stavi da se pojavi login
    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    //dekodovanje jwta
    //uzimamo payload iz jwt-a tj username i password
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);
    //ukoliko je expired next stavi da se pojavi login
    if (expDate < new Date()) {
      next({name: 'Login'});
      return;
    }
  }
  //ako ne nastavi dalje
  next();
});

export default router
