import Request from "./Request";

export default class GetInfoRequest extends Request {
  static getInfo = () => {
    const pathname = `${
      !import.meta.env?.VITE_PANEL_DOMAIN
        ? window.location.origin
        : import.meta.env?.VITE_PANEL_DOMAIN
    }${window.location.pathname.split("#")[0]}`;
    return GetInfoRequest.send(
      `${pathname}/info`,
      "GET",
      {},
      {
        toastError: true,
      }
    );
  };
}
