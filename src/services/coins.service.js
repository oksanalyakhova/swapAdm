import service from '../plugins/request';

class CoinService {
    /**
     * @returns {Promise<AxiosResponse<T>>}
     */
    getCoinsList() {
        return service.get('/api/coin/all');
    }

    /**
     * @param id
     * @param query
     * @returns {Promise<AxiosResponse<T>>}
     */
    editCoin(id, query) {
        return service.patch(`/api/coin/${id}`, query);
    }


    /**
     * @param query
     * @returns {Promise<AxiosResponse<T>>}
     */
    addCoin(query) {
        return service.post('/api/coin/create', query);
    }

    /**
     * @param id
     * @returns {Promise<AxiosResponse<T>>}
     */
    getCoinNetwork(id) {
        return service.get( `/api/coin/${id}/network`)
    }
}

export default new CoinService();
