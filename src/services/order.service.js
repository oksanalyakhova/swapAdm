import service from '../plugins/request';
import UrlService from "@/services/url.service";

class OrderService {
    /**
     * @param payload
     * @returns {Promise<AxiosResponse<any>>}
     */
    getOrderList(payload) {
        if (!payload.page) {
            payload.page = 1;
        }

        let query = UrlService.buildParams(payload);

        return service.get(`/api/Order/list/?${query}`);
    }

    /**
     * @param id
     * @param status
     * @returns {Promise<AxiosResponse<T>>}
     */
    updateOrderStatusById(id, status) {
        return service.patch(`/api/Order/${id}/status`, status);
    }

    /**
     * @param id
     * @param order
     * @returns {Promise<AxiosResponse<T>>}
     */
    editOrderById(id, order) {
        return service.patch(`/api/Order/${id}/edit`, order);
    }

    /**
     * @param id
     * @returns {Promise<AxiosResponse<T>>}
     */
    getOrderAdminById(id) {
        return service.get(`/api/Order/admin/${id}`);
    }

    /**
     * @param id
     * @returns {Promise<AxiosResponse<T>>}
     */
    orderRecalc(id) {
        return service.get(`/api/Order/calc/${id}`);
    }

    /**
     * @returns {Promise<AxiosResponse<any>>}
     */
    orderStatTotal() {
        return service.get('/api/Order/admin/stat/total');
    }

    /**
     * @returns {Promise<AxiosResponse<any>>}
     */
    orderMainChart(query) {
        return service.get('/api/Order/admin/stat/mainGraf' + query);
    }
}

export default new OrderService();
