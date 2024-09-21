import Axios from "axios";
import { toast } from "react-toastify";

/**
 * @typedef Utils
 * @prop {boolean} toastError
 * @prop {boolean} toastSuccess
 */

export default class Request {
  static axiosInstance = Axios.create({
    // Base URL can be set here if needed
    // baseURL: 'https://api.example.com',
  });

  /**
   *
   * @param {string} url
   * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method
   * @param {import('axios').AxiosRequestConfig} config
   * @param {Utils} utils
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async send(url, method = "GET", config = {}, utils = undefined) {
    const request = this.axiosInstance.request({
      url,
      method,
      ...config, // Spread the config to include any additional Axios request settings
    });
    return this.handleRequest(request, utils);
  }

  /**
   * @param {Promise<AxiosResponse>} request
   * @param {Utils} utils
   * @return {Promise<AxiosResponse<any>>}
   */
  static async handleRequest(request, utils = undefined) {
    try {
      const response = await request;
      if (utils?.toastSuccess) toast.success(response.data.message);
      return response;
    } catch (e) {
      if (!e.response) {
        if (utils?.toastError) {
          toast.error("در اتصال به سرور خطایی رخ داده است.");
        }
        return;
      }
      if (
        utils?.toastError &&
        (e.response?.data?.message || e.response?.data?.detail)
      ) {
        toast.error(e.response?.data?.message || e.response?.data?.detail);
      }
      console.error("Request error:", e); // Log the error for debugging
      throw e;
    }
  }
}
