import { Router } from 'express';
import UserController from '../controllers/userController'

const router = Router();

const userController = new UserController();

router.get('/', userController.getUser);
router.get('/role', userController.getRole)
router.get('/department', userController.getDepartment)
router.post('/', userController.addUser);
router.route("/:id")
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

export default router;