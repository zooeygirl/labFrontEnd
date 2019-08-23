import http from "./httpService";

const apiEndPoint = "/exercises/";

export function getExercises() {
  const data = http.get(apiEndPoint);
  console.log(data);
  return data;
}

export function deleteExercise(exerciseId) {
  return http.delete(apiEndPoint + exerciseId);
}

export async function updateExercise(exerciseId, data) {
  return await http.put(apiEndPoint + exerciseId, data);
}

// export async function updateExerciseRatings(exerciseId, data) {
//   return await http.put(apiEndPoint + "exercises/" + exerciseId, data);
// }

export async function newExercise(data) {
  return await http.post(apiEndPoint, data);
}

export async function getExercise(exerciseId) {
  const response = await http.get(apiEndPoint + exerciseId);
  return response.data;
}
