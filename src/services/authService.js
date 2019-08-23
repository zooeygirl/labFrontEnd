import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth/";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(data) {
  const { data: jwt } = await http.post(apiEndPoint, data);
  localStorage.setItem(tokenKey, jwt);
  window.location = "/";
}

export async function logout() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
