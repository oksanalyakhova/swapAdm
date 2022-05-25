import service from '../plugins/request';

class SettingsService {
    /**
     * @returns {Promise<AxiosResponse<T>>}
     */
    getSettings() {
        return service.get('/api/Setting/all');
    }

    /**
     * @param query
     * @returns {Promise<AxiosResponse<T>>}
     */
    updateSettings(query) {
        return service.post('/api/Setting/update', query);
    }

}

export default new SettingsService();
