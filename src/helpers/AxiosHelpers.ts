import axios, { type AxiosRequestConfig } from 'axios';

class AxiosHelpers {
  static getRequest(url: string, config?: AxiosRequestConfig<any>) {
    return axios.get(url, config);
  }
}

export default AxiosHelpers