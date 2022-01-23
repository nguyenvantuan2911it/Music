import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    timeout: 6000
});

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    config => {
        return config;
    },
    async error => {
        console.log(error.response.data); //có ra
        // console.log(error.response.data.status.code);
        if ([2003].includes(error.response.data.status.code)) {
            localStorage.clear();
        }
        return Promise.reject(error);
    }
);

export type Response<T = any> = {
    status: boolean;
    message: string;
    result: T;
};

type Method = 'get' | 'post' | 'put';

export type MyResponse<T = any> = Promise<T>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): MyResponse<T> => {
    const prefix = process.env.NX_REACT_APP_API ? process.env.NX_REACT_APP_API : '';
    url = prefix + url;
    if (method === 'post') {
        return axiosInstance.post(url, data, config);
    } else if (method === 'put') {
        return axiosInstance.put(url, data, config);
    } else {
        return axiosInstance.get(url, {
            params: data,
            ...config
        });
    }
};