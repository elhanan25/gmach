import http from "./httpService";
import { apiUrl } from "../config.json";


export function getPlease(id) {
  return http.get(`${apiUrl}/pleasers/${id}`);
}

export function getPleasers(email) {
  return http.get(`${apiUrl}/pleasers/email/${email}`);
}

export function getpleaseAll() {
  
    return http.get(`${apiUrl}/pleasers/all`);
}

export function deletepleaser(id) {
  return http.delete(`${apiUrl}/pleasers/${id}`);
}

export function updatePlease(please) {
  const pleaseId = {...please};
  delete please._id;
  return http.put(`${apiUrl}/pleasers/${pleaseId._id}`, please);
}

const service = {
  
  getpleaseAll,
  deletepleaser,
  updatePlease,
  getPlease,
  getPleasers
};

export default service;
