import http from "./httpService";

const apiEndPoint = "/users/";

export function getUsers() {
  const data = http.get(apiEndPoint);
  console.log(data);
  return data;
}

export function deleteStudent(userId) {
  return http.delete(apiEndPoint + userId);
}

export async function updateStudent(userId, data) {
  return await http.put(apiEndPoint + userId, data);
}

export async function newUser(data) {
  return await http.post(apiEndPoint, data);
}

export function getUser(userId) {
  console.log(userId);
  const data = http.get(apiEndPoint + userId);
  console.log(data);
  return data;
}

export async function getExerciseRatingAverages() {
  const response = await http.get(apiEndPoint + "averages");

  return response.data;
}
