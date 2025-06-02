import express from 'express';
import DigitalAccessController from '../controllers/digitalAccessController'

const router = express.Router();

router.get('/',  DigitalAccessController.getAllAssignment)
router.get('/applications',  DigitalAccessController.getApplications)
router.post('/', DigitalAccessController.createUserAccess)
router.route("/:id")
    .get(DigitalAccessController.getAccessById)
    .put(DigitalAccessController.updateAccess)

export default router;