import service from '../plugins/request';

class AdminService {
    /**
     * @returns {Promise<AxiosResponse<T>>}
     */
    getUsersList() {
        return service.get( '/api/User/admin/all');
    }

    /**
     * @param id
     * @param password
     * @returns {Promise<AxiosResponse<T>>}
     */
    resetPasswordAdmin({id, password}) {
        return service.post('/api/User/resetPassword', { id, password });
    }

    /**
     * @returns {Promise<AxiosResponse<T>>}
     */
    getProgramAll() {
        return service.get('/api/PartnerProgram/all');
    }
}

export default new AdminService();
