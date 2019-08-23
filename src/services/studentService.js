import http from "./httpService";

const apiEndPoint = "/students/";

export function getStudents() {
  const data = http.get(apiEndPoint);
  console.log(data);
  return data;
}

export function deleteStudent(studentId) {
  return http.delete(apiEndPoint + studentId);
}

export async function updateStudent(studentId, data) {
  return await http.put(apiEndPoint + studentId, data);
}

export async function updateExerciseRatings(studentId, data) {
  return await http.put(apiEndPoint + "students/" + studentId, data);
}

export async function newStudent(data) {
  return await http.post(apiEndPoint, data);
}

export async function getStudent(studentId) {
  const response = await http.get(apiEndPoint + studentId);

  return response.data;
}
