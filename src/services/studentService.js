import http from "./httpService";
const _ = require("lodash");
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
  return await http.put(
    apiEndPoint + studentId,
    _.pick(data, [
      "id",
      "firstname",
      "lastname",
      "exerciseRatings",
      "completed",
      "dateCompleted",
      "validatedBy"
    ])
  );
}

export async function updateExerciseRatings(studentId, data) {
  return await http.put(
    apiEndPoint + "exercises/" + studentId,
    _.pick(data, ["id", "exerciseRatings"])
  );
}

export async function newStudent(data) {
  return await http.post(apiEndPoint, data);
}

export async function getStudent(studentId) {
  const response = await http.get(apiEndPoint + studentId);

  return response.data;
}
