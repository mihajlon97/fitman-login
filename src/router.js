import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from './components/welcome/welcome.vue'
import ResetPasswordPage from './components/auth/resetPassword.vue'
import ResetForm from './components/auth/resetForm.vue'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: WelcomePage },
        {
            path: '/reset-form',
            component: ResetPasswordPage
        },
        {
            path: '/reset',
            component: ResetForm
        }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/', '/reset-form', '/reset'];

    const authRequired = !publicPages.includes(to.path);

    if(!window.$cookies.get('logout') && window.$cookies.get('token')) {
        alert('Cookie for success login exists! Now deleted for testing!')
        window.$cookies.remove('token', '/');
        // window.location.href = 'http://localhost:3333/';
        window.location.reload();
        return;
    }

    window.$cookies.remove('logout', '/'); // , domain

    if (authRequired/* && !loggedIn*/) {
        return next('/');
    }

    next();
})