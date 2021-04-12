import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getUserInfo() {
  return http.get(`${apiUrl}/users/me`).then((resp) => resp.data);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}
export function getUser(id) {
  return http.get(`${apiUrl}/users/${id}`);
}

export function getAll() {
  return http.get(`${apiUrl}/users/all`);
}

export function deleteuser(id) {
  return http.delete(`${apiUrl}/users/${id}`);
}

export function updateUser(user) {
  const userId = user._id;
  delete user._id;
 
  return http.put(`${apiUrl}/users/${userId}`, user);
}

const service = {
  login,
  getCurrentUser,
  logout,
  getJwt,
  getUserInfo,
  getAll,
  deleteuser,
  updateUser,
  getUser,
};

export default service;
