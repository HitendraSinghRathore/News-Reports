import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
import Source from './views/Sources.vue';



Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/source/:name',
            component: Source
        }

    ]
});