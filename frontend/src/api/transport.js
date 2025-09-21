import axiosClient from "./axiosClient";
const CART_ID_KEY = "cart_id";

async function handleBackend({ method, url, body, params }) {
  try {
    const response = await axiosClient({
      method,
      url,
      data: body ?? null,
      params: params ?? null,
    });
    return response.data;
  } catch {
    throw new Error();
  }
}

export async function request({ method = "get", url, body, params } = {}) {
  try {
    return await handleBackend({ method, url, body, params });
  } catch {
    localStorage.removeItem(CART_ID_KEY);
    return null;
  }
}
