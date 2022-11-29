const { Router } = require('express');
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const usersRouter = Router();

usersRouter.route('/').get(getAllUsers).post(createUser);

usersRouter.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = usersRouter;
