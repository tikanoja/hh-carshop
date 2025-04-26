import { API_CONFIG } from "./config";

export const deleteCar = (url: string) => {
  return fetch(url, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("error deleting car");
    return response.json();
  })
}

export const getCars = () => {
  return fetch(`${API_CONFIG.BASE_URL}/cars`)
  .then(response => {
    if (!response.ok)
      throw new Error("error fetching cars");
      return response.json();
  })
}
