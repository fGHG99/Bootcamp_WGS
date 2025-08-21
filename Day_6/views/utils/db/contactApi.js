import { pool }  from './db.js'

async function loadContact() {
  try {
    const { rows: contact } = await pool.query("SELECT * FROM contact WHERE \"isDeleted\" = false");
    return contact;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

async function findContactByName(name) {
  const result = await pool.query(
    `SELECT * FROM contact WHERE name = $1 AND "isDeleted" = false`,
    [name]
  );
  return result.rows[0];
}

async function createContact(name, email, mobile) {
  const query = `
    INSERT INTO contact (name, email, mobile, "isDeleted")
    VALUES ($1, $2, $3, false)
    RETURNING *;
  `;
  const values = [name, email, mobile];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function editContact(id, name, email, mobile) {
  const query = `
    UPDATE contact
    SET name = $1,
        email = $2,
        mobile = $3
    WHERE id = $4
      AND "isDeleted" = false
    RETURNING *;
  `;
  const values = [name, email, mobile, id];
  const result = await pool.query(query, values);
  return result.rows[0]; // hasil contact yang sudah diupdate
}

async function deleteContact(id) {
  const query = `
    UPDATE contact
    SET "isDeleted" = true
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0]; // return the deleted contact
}

export { loadContact, createContact, findContactByName, editContact, deleteContact };