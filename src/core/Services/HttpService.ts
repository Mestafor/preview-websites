import axios, { AxiosError } from "axios"
import { normilizeUrl } from "../Helpers/normilizeUrl"

export const HttpService = {
    async postPreviewAsync<T>(url: string): Promise<T> {
        console.log('GET REQUEST ', url);
        try {
            const res = await axios.post(`/preview`, {
                websiteUrl: normilizeUrl(url)
            });
            return res.data as T;
        }
        catch (e) {
            const error = e as AxiosError;
            return Promise.reject(error.message || error.response?.data);
        }
    },
};
