import { Request, Response } from "express";
import DeviceService from "../services/deviceService";

export default class DeviceController {

    private deviceService: DeviceService;

    constructor(){
        this.deviceService = new DeviceService();
    }

    getDevice= async(req: Request, res: Response): Promise<void> => {
        try {
            const devices = await this.deviceService.findAll();
            res.json(devices);
        } catch (error) {
            if (error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    getDeviceBySerie = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const Device= await this.deviceService.findDeviceBySerie(id);
            
            if (!Device) {
                res.status(404).json({ message: "Dispositivo no encontrado" });
                return;
            }
            
            res.json(Device);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    registerDevice= async(req: Request, res: Response): Promise<void> => {
        try {
            const newDevice= await this.deviceService.registerDevice(req.body);
            res.json({status: 201, device: newDevice});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }

    updateDevice= async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const DeviceUpdate = await this.deviceService.updateDevice(id, req.body);
            res.json({status: 200, device: DeviceUpdate});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }

    deleteDevice= async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const deleteDevice= await this.deviceService.delete(id);
            res.json({status: 200, device: deleteDevice});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }
}
