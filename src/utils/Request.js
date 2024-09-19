import Axios from "axios";
import { toast } from "react-toastify";

/**
 * @typedef Utils
 * @prop {boolean} toastError
 * @prop {boolean} toastSuccess
 */

export default class Request {
  /**
   *
   * @param {string} url
   * @param {Method} type
   * @param {import('axios').AxiosRequestConfig} config
   * @param {Utils} utils
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async send(url, method, config = {}, utils = undefined) {
    const request = Axios.request({
      url: url,
      method: method,
    });
    return Request.handleRequest(request, utils);
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
      throw e;
    }
  }
}
