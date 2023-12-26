// request.js
import axios from "axios";
import config from "./config";
import { useStore } from "@/store/store";

// optionaly add base url
const client = axios.create({ baseURL: config.getBaseUrl() });

const SESSION_EXPIRED_STATUS_CODE = 400;
const EPIC_SESSION_EXPIRED_STATUS_CODE = 401;

/**
 * # request
 * It adds auth headers to an axios request
 *
 * ## Examples
 * ```
 * let data = await request({
 *  method: 'GET',
 *  url: '...', // all URLS begin with `/`
 *  data: {}
 * })
 * ```
 * @param param0
 * @returns
 */
const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${
    useStore.getState().user?.accessToken
  }`;

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    if (error?.response?.status === SESSION_EXPIRED_STATUS_CODE) {
      // useStore.setState({ user: null, isEpicAuth: false });
    }
    if (error?.response?.status === EPIC_SESSION_EXPIRED_STATUS_CODE) {
      // sessionStorage.setItem("redirectUrl", window.location.href);
      // useStore.getState().setEpicAuth(false);
    }
    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
