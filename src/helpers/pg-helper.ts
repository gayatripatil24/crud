import { Pool } from "pg";
import { data, id } from "./constants";
require("dotenv").config();
const { USER, HOST, DATABASE, PASSWORD, PORT } = process.env;
const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: Number(PORT),
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err: any) => {
  console.error("Error with PostgreSQL connection:", err);
});

export async function get(data: data) {
  try {
    //Check if name and email are already exists in db or not
    //If yes then login successfully and generate token, if not then throw error user not found
    const res = await pool.query(
      "SELECT name,password, email, role FROM users where (email= '" +
        data.email +
        "' and name= '" +
        data.name +
        "')"
    );
    if (res.rows[0]) return true;
    else return false;
  } catch (err: any) {
    return err.stack;
  }
}

export async function getSingleUser(data: id) {
  try {
    const res = await pool.query(
      "SELECT id, name, password, email, role FROM users WHERE id= '" +
        data.id +
        "'"
    );
    return res.rows;
  } catch (err: any) {
    return err.stack;
  }
}
export async function getAll(data: data) {
  try {
    const res = await pool.query(
      "SELECT id, name, password, email, role FROM users"
    );
    return res.rows;
  } catch (err: any) {
    return err.stack;
  }
}

export async function create(data: data) {
  try {
    const res = await pool.query(
      "INSERT INTO users (name,password, email, role) VALUES('" +
        data.name +
        "','" +
        data.password +
        "','" +
        data.email +
        "','" +
        data.role +
        "')"
    );
    if (res.rowCount === 1) return true;
    else return false;
  } catch (err: any) {
    return err.stack;
  }
}

export async function update(data: data, id: id) {
  try {
    var query = "";
    for (const [key, value] of Object.entries(data)) {
      query = query + key + " = '" + value + "',";
    }
    query = query.substring(0, query.length - 1);
    const res = await pool.query(
      "UPDATE users SET " + query + " WHERE id= '" + id.id + "'"
    );
    if (res.rowCount === 1) return true;
    else return false;
  } catch (err: any) {
    return err.stack;
  }
}

export async function deleteU(data: id) {
  try {
    const res = await pool.query(
      "DELETE FROM users where id='" + data.id + "'"
    );
    if (res.rowCount === 1) return true;
    else return false;
  } catch (err: any) {
    return err.stack;
  }
}
