import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { showMessage } from './status'
import { IResponse, ILogin, RequestOptions } from './type'
// import { API_BASE_URL } from '../../../../config/constant'
import { getToken, TokenPrefix } from '@/utils/auth'
axios.defaults.timeout = 5000
axios.defaults.withCredentials = false
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL + ''
})
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response
        }
        showMessage(response.status)
        return response
    },
    (error: any) => {
        const { response } = error
        if (response) {
            showMessage(response.status)
            return Promise.reject(response.data)
        }
        showMessage('网络连接异常,请稍后再试!')
    }
)
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken()
        if (token) {
            config.headers!.Authorization = `${TokenPrefix}${token}`
        }
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)
const request = <T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
): Promise<T> => {
    const conf = config
    return new Promise((resolve, reject) => {
        axiosInstance
            .request<any, AxiosResponse<IResponse>>(conf)
            .then((res: AxiosResponse<IResponse>) => {
                const {
                    data: { result }
                } = res
                resolve(result as T)
            })
    })
}
export function get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
): Promise<T> {
    return request({ ...config, method: 'GET' }, options)
}
export function post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
): Promise<T> {
    return request({ ...config, method: 'POST' }, options)
}
export default request
export type { AxiosInstance, AxiosResponse }
