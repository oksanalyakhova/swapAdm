import {createStore} from "vuex";
import router from '../router/index';
import UserService from '../services/user.service'
import AdminService from '../services/admin.service'
import OrderService from '../services/order.service'
import CoinsService from '../services/coins.service'
import PartnerService from '../services/partner.service'
import PaymentService from '../services/payment.service'
import SettingsService from '../services/settings.service'

export const store = createStore({
    state: {
        token: '',
        user: {
            id: '',
            login: '',
            role: '',
            isActive: '',
            partnerProgramName: '',
            createUser: '',
            partnerProfile: {
                email: '',
                telegramm: ''
            }
        },
        users: [],
        userItem: null,
        profile: null,
        coinData: null,
        exchangeData: null,
        addCoinData: null,
        editTariffData: null,
        partnerStatPayData: null,
        settingsData: null,
        programsList: [],
        isAddTariffModal: false,
        isAdminModal: false,
        isPartnerModal: false,
        isEditCoinModal: false,
        isAddCoinModal: false,
        isExchangeModal: false,
        isEditSettingsModal: false,
        isPayModal: false,
        successModal: {},
        errorModal: {},
        coins: [],
        coinNetworkData: [],
        paymentsList: [],
        exchangesList:[],
        statsTotalList: [],
        partnersStats: [],
        settingsList: [],
        notification: {},
    },
    actions: {
        logout() {
            localStorage.token = '';
            router.push({name: 'Login'});
        },
        login({commit}, credential) {
            return UserService.login(credential).then((result) => {

                if (result.status === 200) {
                    const token = result.data.result.token;
                    localStorage.token = token;
                    commit('setToken', token);
                }
            })
        },
        registration({commit}, credential) {
            return UserService.registerPartner(credential).then((result) => {

                if (result.status === 200) {
                    const token = result.data.result.token;
                    localStorage.token = token;
                    commit('setter', {token: token});
                }
            }).catch((error) => {
                throw new Error('User registration failed ' + error)
            })
        },
        registrationAdmin({commit}, credential) {
            return UserService.registerAdmin(credential).then((result) => {

                if (result.status === 200) {
                    const token = result.data.result.token;
                    localStorage.token = token;
                    commit('setter', {token: token});
                }
            }).catch((error) => {
                throw new Error('User registration failed ' + error)
            })
        },
        getProfile({commit}) {
            return UserService.getProfile().then((result) => {

                if (result.status === 200) {
                    commit('setUser', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get profile failed ' + error)
            })
        },
        getUsersList({commit}) {
            return AdminService.getUsersList().then((result) => {

                if (result.status === 200) {
                    commit('setUsers', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get users list failed ' + error)
            })
        },
        getPartnersProgram({commit}) {
            return AdminService.getProgramAll().then((result) => {

                if (result.status === 200) {
                    commit('setProgramAll', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get partners program failed ' + error)
            })
        },
        getCoinsList({commit}) {
            return CoinsService.getCoinsList().then((result) => {

                if (result.status === 200) {
                    commit('setCoins', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get coins list failed ' + error)
            })
        },
        getCoinNetworkList({commit}, payload) {
            return CoinsService.getCoinNetwork(payload).then((result) => {

                if (result.status === 200) {
                    commit('setCoinNetwork', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get coin networks list failed ' + error)
            })
        },
        getAllPayments({commit}) {
            return PaymentService.getAllPayment().then((result) => {

                if (result.status === 200) {
                    commit('setPaymentsAll', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get payments list failed ' + error)
            })
        },
        getOrderList({commit}, payload) {
            return OrderService.getOrderList(payload).then((result) => {

                if (result.status === 200) {
                    commit('setExchangesAll', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get order list failed ' + error)
            })
        },
        getPartnersStats({commit}) {
            return PartnerService.getPartnersStats().then((result) => {

                if (result.status === 200) {
                    commit('setPartnersStats', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get partner stat list failed ' + error)
            })
        },
        getSettings({commit}) {
            return SettingsService.getSettings().then((result) => {

                if (result.status === 200) {
                    commit('setSettings', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get settings list failed ' + error)
            })
        },
        getStatTotal({commit}) {
            return OrderService.orderStatTotal().then((result) => {

                if (result.status === 200) {
                    commit('setStatTotal', result.data.result);
                }
            }).catch((error) => {
                throw new Error('Get stats total failed ' + error)
            })
        },
    },
    getters: {
        getUser: (state) => state.user,
        getUsers: (state) => state.users,
        getUserItem: (state) => state.userItem,
        getProfile: (state) => state.profile,
        getPrograms: (state) => state.programsList,
        getCoins: (state) => state.coins,
        getCoinData: (state) => state.coinData,
        getExchangeData: (state) => state.exchangeData,
        getSettingsData: (state) => state.settingsData,
        getAddCoinData: (state) => state.addCoinData,
        getIsAddTariffModal: (state) => state.isAddTariffModal,
        getEditTariffData: (state) => state.editTariffData,
        getCoinNetwork: (state) => state.coinNetworkData,
        getPaymentsAll: (state) => state.paymentsList,
        getExchangesAll: (state) => state.exchangesList,
        getPartnersStats: (state) => state.partnersStats,
        getPartnersStatsData: (state) => state.partnerStatPayData,
        getIsAdminModal: (state) => state.isAdminModal,
        getIsPartnerModal: (state) => state.isPartnerModal,
        getIsExchangeModal: (state) => state.isExchangeModal,
        getIsPayModal: (state) => state.isPayModal,
        getIsEditSettingsModal: (state) => state.isEditSettingsModal,
        getSuccess: (state) => state.successModal,
        getError: (state) => state.errorModal,
        getNotification: (state) => state.notification,
        getStatsAll: (state) => state.statsTotalList,

    },
    mutations: {
        setAdminModal(state, credential) {
            state.isAddAdminModal = credential;
        },
        setPartnerModal(state, credential) {
            state.isAddPartnerModal = credential;
        },
        setEditCoinModal(state, credential) {
            state.isEditCoinModal = credential;
        },
        setToken(state, credential) {
            state.token = credential;
        },
        setUser(state, credential) {
            state.user = credential;
        },
        setUsers(state, credential) {
            state.users = credential;
        },
        setUserItem(state, credential) {
            state.userItem = credential;
        },
        setProfile(state, credential) {
            state.profile = credential;
        },
        setCoinData(state, credential) {
            state.coinData = credential;
        },
        setExchangeData(state, credential) {
            state.exchangeData = credential;
        },
        setAddCoinData(state, credential) {
            state.addCoinData = credential;
        },
        setIsAddTariffModal(state, credential) {
            state.isAddTariffModal = credential;
        },
        setEditTariffData(state, credential) {
            state.editTariffData = credential;
        },
        setProgramAll(state, credential) {
            state.programsList = credential;
        },
        setCoins(state, credential) {
            state.coins = credential;
        },
        setCoinNetwork(state, credential) {
            state.coinNetworkData = credential;
        },
        setPaymentsAll(state, credential) {
            state.paymentsList = credential;
        },
        setExchangesAll(state, credential) {
            state.exchangesList = credential;
        },
        setPartnersStats(state, credential) {
            state.partnersStats = credential;
        },
        setSettings(state, credential) {
            state.settingsList = credential;
        },
        setIsAdminModal(state, credential) {
            state.isAdminModal = credential;
        },
        setIsPartnerModal(state, credential) {
            state.isPartnerModal = credential;
        },
        setPartnerStatPayData(state, credential) {
            state.partnerStatPayData = credential;
        },
        setSettingsData(state, credential) {
            state.settingsData = credential;
        },
        setIsExchangeModal(state, credential) {
            state.isExchangeModal = credential;
        },
        setSuccess(state, credential) {
            state.successModal = credential;
        },
        setError(state, credential) {
            state.errorModal = credential;
        },
        setNotification(state, credential) {
            state.notification = credential;
        },
        setStatTotal(state, credential) {
            state.statsTotalList = credential;
        },
    },
    modules: {}
});

export default store;
