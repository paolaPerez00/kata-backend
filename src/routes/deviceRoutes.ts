import { Router } from 'express';
import DeviceController from '../controllers/deviceController';

const router = Router();

const deviceController = new DeviceController();

router.get('/', deviceController.getDevice)
router.post('/', deviceController.registerDevice);
router.route("/:id")
    .get(deviceController.getDeviceBySerie)
    .put(deviceController.updateDevice)
    .delete(deviceController.deleteDevice)

export default router;