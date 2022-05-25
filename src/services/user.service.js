import service from '../plugins/request';

class UserService {
    /**
     * @param login
     * @param password
     * @return {Promise<AxiosResponse<any>>}
     */
    login({login, password}) {
        return service.post('/api/User/login', {login, password});
    }

    /**
     * @param login
     * @param password
     * @param email
     * @returns {Promise<AxiosResponse<T>>}
     */
    registerPartner({login, password, email}) {
        return service.post('/api/User/partner', {login, password, email});
    }

    /**
     * @param login
     * @param password
     * @returns {Promise<AxiosResponse<T>>}
     */
    registerAdmin({login, password}) {
        return service.post('/api/User/createAdmin', {login, password});
    }

    /**
     * @param login
     * @return {Promise<AxiosResponse<any>>}
     */
    checkLogin(login) {
        return service.get('/api/User/checkLogin?login=' + login)
    }

    /**
     * @return {Promise<AxiosResponse<any>>}
     */
    getProfile() {
        return service.get('/api/User/profile')
    }

    /**
     * @param id
     * @param status
     * @returns {Promise<AxiosResponse<T>>}
     */
    updateStatus({id, status}) {
        return service.post( '/api/User/updateStatus', {id, status} )
    }

    /**
     * @param oldPassword
     * @param newPassword
     * @return {Promise<AxiosResponse<any>>}
     */
    changePassword({oldPassword, newPassword}) {
        return service.patch('/api/User/password', {oldPassword, newPassword})
    }

    /**
     * @param id
     * @param password
     * @returns {Promise<AxiosResponse<T>>}
     */
    resetPassword({id, password}) {
        return service.post('/api/User/resetPassword', {id, password})
    }

    /**
     * @param email
     * @param telegramm
     * @param avatar
     * @param address
     * @return {Promise<AxiosResponse<any>>}
     */
    editProfile({email, telegramm, address, avatar}) {
    return service.patch('/api/User/editProfile', {email, telegramm, address, avatar})
    }
}

export default new UserService();
