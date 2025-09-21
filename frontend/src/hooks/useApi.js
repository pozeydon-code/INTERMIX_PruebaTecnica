import axiosClient from "../api/axiosClient";
import { useState } from "react";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async ({ method, url, body = null, params = null }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient({
        method,
        url,
        data: body,
        params: { ...params },
      });

      return response.data;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendRequest };
}
