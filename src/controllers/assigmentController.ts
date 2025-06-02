import { Request, Response } from "express";
import AssignmentService from "../services/assignmentService";

class AssignmentController {
    private assigmentService: AssignmentService;
    
   
    constructor(){
        this.assigmentService = new AssignmentService();
    }
    getAssignment = async(req: Request, res: Response): Promise<void> => {
        try {
            const assignments = await this.assigmentService.findAll();
            res.json(assignments);
        } catch (error) {
            if (error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    getAssignmentById = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const assignment = await this.assigmentService.findById(parseInt(id));
            
            if (!assignment) {
                res.status(404).json({ message: "Asignación no encontrado" });
                return;
            }
            
            res.json(assignment);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    createAssignment = async(req: Request, res: Response): Promise<void> => {
        try {
            const newAssignment = await this.assigmentService.create(req.body);
            res.json({status: 201, assignment: newAssignment});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }

    updateAssignment = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const assignmentUpdate = await this.assigmentService.update(parseInt(id), req.body);
            res.json({status: 200, assignment: assignmentUpdate});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }
}

export default new AssignmentController();