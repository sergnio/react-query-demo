import { useState } from "react";
import axios, { AxiosResponse, Method as AxiosMethodType } from "axios";
import useAuth from "./useAuth";

export interface useAxiosReturn<T> {
  loading: boolean;
  error: boolean;
  data: T | null;
  fetchData: (url: string, payload?: Object) => Promise<T | void>;
  postData: (url: string, payload: Object) => Promise<T | void>;
  putData: (url: string, payload: Object) => Promise<T | void>;
  deleteData: (url: string, payload: Object) => Promise<T | void>;
}

export default function <T>(): useAxiosReturn<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setAsyncResponse] = useState<T | null>(null);
  const { getAccessTokenSilently } = useAuth();

  async function axiosWrapper(
    method: AxiosMethodType,
    url: string,
    payload?: Object
  ): Promise<T | void> {
    const token = await getAccessTokenSilently();

    try {
      setLoading(true);
      const { data }: AxiosResponse<T> = await axios({
        url,
        method,
        data: payload,
        headers: { Authorization: `Bearer ${token}` },
      });
      setAsyncResponse(data);
    } catch (e) {
      //  Global snackbar error message
      setError(true);
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    data,
    error,
    fetchData: (url: string, payload?: Object) =>
      axiosWrapper("get", url, payload),
    postData: (url: string, payload: Object) =>
      axiosWrapper("post", url, payload),
    putData: (url: string, payload: Object) =>
      axiosWrapper("put", url, payload),
    deleteData: (url: string, payload: Object) =>
      axiosWrapper("delete", url, payload),
  };
}
