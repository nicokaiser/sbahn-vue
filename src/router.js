import { createRouter, createWebHashHistory } from 'vue-router';
import PageList from './views/PageList.vue';
import PageMap from './views/PageMap.vue';
import PageNewsticker from './views/PageNewsticker.vue';
import PageDebug from './views/PageDebug.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'PageList',
            path: '/',
            component: PageList,
        },
        {
            name: 'PageMap',
            path: '/map',
            component: PageMap,
        },
        {
            name: 'PageNewsticker',
            path: '/newsticker',
            component: PageNewsticker,
        },
        {
            name: 'PageDebug',
            path: '/debug',
            component: PageDebug,
        },
        {
            name: 'NotFound',
            path: '/:pathMatch(.*)*',
            redirect: () => ({ name: 'PageList' }),
        },
    ],
});
