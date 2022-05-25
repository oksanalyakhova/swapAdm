import service from '../plugins/request';

class PartnerService {
    /**
     * @param id
     * @param idProgram
     * @returns {Promise<AxiosResponse<T>>}
     */
    changePartnerProgram(id, idProgram) {
        return service.patch(`/api/User/admin/${id}/partnerProgram`, {idProgram: idProgram});
    }

    /**
     * @param id
     * @param query
     * @returns {Promise<AxiosResponse<T>>}
     */
    editPartnerProgram(id, query) {
        return service.patch(`/api/PartnerProgram/${id}`, query);
    }

    /**
     * @param id
     * @param status
     * @returns {Promise<AxiosResponse<T>>}
     */
    updatePartnerPaymentStatus(id, status) {
        return service.patch(`/api/PartnerPayment/${id}/updateStatus`, status)
    }

    /**
     * @param query
     * @returns {Promise<AxiosResponse<T>>}
     */
    addPartnerProgram(query) {
        return service.post('/api/PartnerProgram/create', query);
    }

    /**
     * @returns {Promise<AxiosResponse<T>>}
     */
    getPartnersStats() {
        return service.get('/api/partner/adminPartner');
    }

    /**
     * @param query
     * @returns {Promise<AxiosResponse<T>>}
     */
    createPartnerPayment(query) {
        return service.post('/api/PartnerPayment/create', query);
    }
}

export default new PartnerService();
