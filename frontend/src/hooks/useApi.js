import { useState } from "react";
import { request } from "../api/transport";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async ({ method, url, body = null, params = null }) => {
    setLoading(true);
    setError(null);
    try {
      const response = request({
        method,
        url,
        body,
        params,
      });

      return response;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendRequest };
}
