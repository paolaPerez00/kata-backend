import { Router } from 'express';
import UserController from '../controllers/userController'

const router = Router();

const userController = new UserController();

router.get('/', userController.getUser)
router.post('/', userController.addUser);
router.route("/:id")
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

export default router;