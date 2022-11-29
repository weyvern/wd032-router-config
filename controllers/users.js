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
    const { body } = req;
    console.log(body);
    // Postgres you can insert RETURNING *
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, deleteUser, getAllUsers, getSingleUser, updateUser };
