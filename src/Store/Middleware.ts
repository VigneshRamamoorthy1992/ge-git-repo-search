import axios from "axios";
import { ApiConsts } from "../ApiConsts"

export default class Middleware {
    public source: any;
    public async service(url: string, method: string, reqObj?: any) {
        let response;
        if (this.source) {
            this.source.cancel();
        }
        this.source = axios.CancelToken.source();
        switch (method) {
            case ApiConsts._GET:
                response = await axios.get(url, {
                    cancelToken: this.source.token,
                });
                return response;
            case ApiConsts._POST:
                response = await axios.post(url, reqObj, {
                    cancelToken: this.source.token,
                });
                return response;
            case ApiConsts._PUT:
                response = await axios.put(url, reqObj);
                return response;
            case ApiConsts._DELETE:
                response = await axios.delete(url, reqObj);
                return response;
        }
    }
}