import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

let token: string = "";

const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export const getAxiosInstance = async (): Promise<AxiosInstance> => {
  try {
    token = getCookie("USER_ACCESS_TOKEN") as string;
  } catch (e) {
    console.error("Error getting cookie:", e);
  } finally {
    const instance: AxiosInstance = axios.create({
      baseURL: BASE_URL,

      headers: {
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    instance.interceptors.request.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    return instance;
  }
};
