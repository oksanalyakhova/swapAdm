import service from '../plugins/request';

class FileService {

    /**
     * @param file
     * @returns {Promise<AxiosResponse<T>>}
     */
    uploadFile(file) {
        const fileData = new FormData;
        fileData.append("UploadFile", file);

        return service.post('/api/Other/upload', fileData);
    }
}

export default new FileService();
