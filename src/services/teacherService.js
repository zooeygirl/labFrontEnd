import http from "./httpService";

const apiEndPoint = "/teachers/";

export function getTeachers() {
  const data = http.get(apiEndPoint);
  console.log(data);
  return data;
}
