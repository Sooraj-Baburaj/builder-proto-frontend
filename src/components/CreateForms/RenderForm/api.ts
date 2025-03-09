import { getAxiosInstance } from "@/lib/api";
import { createWebsiteBodyProps } from "./types";
import { AxiosResponse } from "axios";

export const createWebsite = async ({
  appId,
  name,
  content,
}: createWebsiteBodyProps): Promise<AxiosResponse<any>> => {
  try {
    const api = await getAxiosInstance();
    const response: AxiosResponse<any> = await api.post("/website/create", {
      amplifyApp: appId,
      name,
      content,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
