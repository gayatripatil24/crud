import {
  get,
  getAll,
  create,
  update,
  deleteU,
  getSingleUser,
} from "../helpers/pg-helper";
import { data, id } from "../helpers/constants";

export async function login(data: data) {
  return await get(data);
}
export async function getUser(data: id) {
  return await getSingleUser(data);
}
export async function listUsers(data: data) {
  return await getAll(data);
}
export async function createUser(data: data) {
  return await create(data);
}
export async function updateUser(data: data, id: id) {
  return await update(data, id);
}
export async function deleteUser(data: id) {
  return await deleteU(data);
}
