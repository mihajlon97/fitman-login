import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from './components/welcome/welcome.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import ResetPasswordPage from './components/auth/resetPassword.vue'
import ResetForm from './components/auth/resetForm.vue'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: WelcomePage },
        /*{ path: '/signup',
            component: SignupPage,
            beforeEnter(to, from, next) {
                if (store.getters.getToken) {
                    next('/')
                } else {
                    next()
                }
            }
        },*/
        /*{ path: '/signin',
            component: SigninPage
        },*/
        {
            path: '/dashboard',
            component: DashboardPage
        },
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
    //const loggedIn = !!window.$cookies.get('token');
    /*if(loggedIn && !authRequired && !to.query.logout) {
        return next('/dashboard');
    }*/

    if (authRequired/* && !loggedIn*/) {
        return next('/');
    }

    next();
})