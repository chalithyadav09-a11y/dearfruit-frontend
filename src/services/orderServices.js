import apiClient from "../utils/api-client";

export async function checkoutAPI() {
  return await apiClient.post("order/checkout");
}

export async function currentOrderAPI() {
  return await apiClient.get("/order");
}
