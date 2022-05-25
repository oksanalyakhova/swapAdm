import {createWebHistory, createRouter} from "vue-router";
import Login from '../pages/auth/Login.vue'
import Dashboard from '../pages/dashboard/Dashboard'
import UsersList from "../pages/users/UsersList";
import CoinsList from "../pages/coins/CoinsList";
import ProgramsList from "../pages/partner-programs/ProgramsList"
import PaymentsList from "../pages/payments/PaymentsList";
import ExchangesList from "../pages/exchanges/ExchangesList";
import PartnerStat from "../pages/partner-stat/PartnerStat";
import Settings from "../pages/settings/Settings";

const routes = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Login',
            icon: '',
            isMenu: false
        },
        component: Login
    },
    {
        path: '/',
        name: 'Dashboard',
        meta: {
            title: 'Dashboard',
            icon: require('@/assets/img/icons/dashboard.svg'),
            isMenu: true
        },
        component: Dashboard
    },
    {
        path: '/exchanges',
        name: 'Exchanges',
        meta: {
            title: 'Exchanges',
            icon: require('@/assets/img/icons/exchanges.svg'),
            isMenu: true
        },
        component: ExchangesList
    },
    {
        path: '/exchanges/:id',
        name: 'Exchange modal',
        meta: {
            title: 'Exchange modal',
            icon: '',
            isMenu: false
        },
        component: ExchangesList,
        pathToRegexpOptions: {strict: true},
    },
    {
        path: '/coins',
        name: 'Coins',
        meta: {
            title: 'Coins List',
            icon: require('@/assets/img/icons/coins.svg'),
            isMenu: true
        },
        component: CoinsList
    },
    {
        path: '/users',
        name: 'Users',
        meta: {
            title: 'Users',
            icon: require('@/assets/img/icons/users.svg'),
            isMenu: true
        },
        component: UsersList
    },
    {
        path: '/partners-pay',
        name: 'Partners pay',
        meta: {
            title: 'Partners pay',
            icon: require('@/assets/img/icons/partners-pay.svg'),
            isMenu: true
        },
        component: PaymentsList
    },
    {
        path: '/stats',
        name: 'Partners stats',
        meta: {
            title: 'Partners Stats',
            icon: require('@/assets/img/icons/partnerstats.svg'),
            isMenu: true
        },
        component: PartnerStat
    },
    {
        path: '/programs',
        name: 'Partners plan',
        meta: {
            title: 'Partners plan',
            icon: require('@/assets/img/icons/partnerprogram.svg'),
            isMenu: true
        },
        component: ProgramsList
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: {
            title: 'Settings',
            icon: require('@/assets/img/icons/settings.svg'),
            isMenu: true
        },
        component: Settings
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const DEFAULT_TITLE = ' | Swapuz admin';
router.beforeEach((to) => {
    document.title = to.meta.title + DEFAULT_TITLE;
});

export default router;
