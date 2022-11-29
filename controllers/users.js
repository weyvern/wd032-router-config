const db = require('../db');

const getAllUsers = async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM users;');
    res.json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      body: { first_name, last_name, age }
    } = req;
    /* 
      Some validations (this is completely outside the scope but useful, in the future something like Express Validator https://express-validator.github.io/docs/
      or JOI will come in handy)
        - First name, last name and age are required
        - First name and last name should be strings
        - Age should be a number
    */
    if (!first_name || !last_name || !age)
      throw new Error('First name, last name and age are required');
    if (typeof first_name !== 'string' || typeof last_name !== 'string')
      throw new Error('First name and last name should be strings');
    if (typeof age !== 'number') throw new Error('Age should be a number');
    // Insert - https://www.postgresql.org/docs/current/dml-returning.html
    const {
      rows: [newUser]
    } = await db.query(
      'INSERT INTO users(first_name, last_name, age) VALUES($1, $2, $3) RETURNING *;',
      [first_name, last_name, age]
    );
    // Return new user to
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const {
      rowCount,
      rows: [user]
    } = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
    if (!rowCount) throw new Error(`User with id of ${id} doesn't exist`);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      params: { id },
      body: { first_name, last_name, age }
    } = req;
    /* 
      Some validations (this is completely outside the scope but useful, in the future something like Express Validator https://express-validator.github.io/docs/
      or JOI will come in handy)
        - First name, last name and age are required
        - First name and last name should be strings
        - Age should be a number
    */
    if (!first_name || !last_name || !age)
      throw new Error('First name, last name and age are required');
    if (typeof first_name !== 'string' || typeof last_name !== 'string')
      throw new Error('First name and last name should be strings');
    if (typeof age !== 'number') throw new Error('Age should be a number');
    // Insert - https://www.postgresql.org/docs/current/dml-returning.html
    const {
      rows: [updatedUser]
    } = await db.query(
      'UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *;',
      [first_name, last_name, age, id]
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const { rowCount } = await db.query('DELETE FROM users WHERE id = $1', [id]);
    rowCount
      ? res.json({ success: true, msg: `User with id of ${id} was deleted` })
      : res.json({
          success: false,
          msg: `User with id of ${id} couldn't be deleted or doesn't exist`
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, deleteUser, getAllUsers, getSingleUser, updateUser };
