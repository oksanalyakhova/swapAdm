import axios from 'axios';
import {FP_API_KEY, FP_API_URL} from "@/store/config";

class FpJsService {

    /**
     * @param uuid
     */
    getVisitor(uuid) {
        return axios.get(FP_API_URL + `/visitors/${uuid}?api_key=` + FP_API_KEY)
    }
}

export default new FpJsService();
