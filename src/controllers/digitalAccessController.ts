import { Request, Response } from "express";
import AccessService from "../services/digitalAccessService";
import ApplicationService from "../services/applicationServices";

class AccessController {
    private accessService: AccessService;
    private applicationService: ApplicationService;
   
    constructor(){
        this.accessService = new AccessService();
        this.applicationService = new ApplicationService();
    }

    getAllAssignment = async(req: Request, res: Response): Promise<void> => {
        try {
            const access = await this.accessService.findAll();
            res.json(access);
        } catch (error) {
            if (error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    getApplications = async(req: Request, res: Response): Promise<void> => {
        try {
            const applications = await this.applicationService.findAll();
            res.json(applications);
        } catch (error) {
            if (error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }


    getAccessById = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const acess = await this.accessService.findById(parseInt(id));
            
            if (!acess) {
                res.status(404).json({ message: "Acceso no encontrado" });
                return;
            }
            
            res.json(acess);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    createUserAccess = async(req: Request, res: Response): Promise<void> => {
        try {
            const newUserAccess = await this.accessService.createDigitalAccess(req.body);
            res.json({status: 201, Access: newUserAccess});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }

    updateAccess = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const accessUpdate = await this.accessService.update(parseInt(id), req.body);
            res.json({status: 200, access: accessUpdate});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }
}

export default new AccessController();