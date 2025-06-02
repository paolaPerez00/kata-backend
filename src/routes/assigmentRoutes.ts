import express from 'express';
import AssignmentController from '../controllers/assigmentController'

const router = express.Router();

router.get('/',  AssignmentController.getAssignment)
router.post('/', AssignmentController.createAssignment)
router.route("/:id")
    .get(AssignmentController.getAssignmentById)
    .put(AssignmentController.updateAssignment)

export default router;