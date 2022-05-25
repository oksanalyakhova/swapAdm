import service from '../plugins/request';

class PaymentService {
    /**
     * @param query
     * @returns {Promise<AxiosResponse<T>>}
     */
    userPayment(query) {
        return service.get('/api/PartnerPayment/userPayment', query);
    }

    /**
     * @returns {Promise<AxiosResponse<T>>}
     */
    getAllPayment() {
        return service.get('/api/PartnerPayment/all');
    }

    /**
     * @param id
     * @param status
     * @returns {Promise<AxiosResponse<T>>}
     */
    changePaymentStatus(id, status) {
        return service.patch(`/api/PartnerPayment/${id}/updateStatus`, {status: status});
    }
}

export default new PaymentService();
