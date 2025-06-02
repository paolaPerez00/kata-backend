import { Request, Response } from "express";
import UserService  from "../services/userService";

export default class UserController {

    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    getUser = async(req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.findAll();
            res.json(users);
        } catch (error) {
            if (error instanceof Error){
                res.status(500).json({ message: error.message });
            }
        }
    }

    getUserById = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const user = await this.userService.findById(parseInt(id));
            
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            
            res.json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    addUser = async(req: Request, res: Response): Promise<void> => {
        try {
            const newUser = await this.userService.create(req.body);
            res.json({status: 201, user: newUser});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }

    updateUser = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const userUpdate = await this.userService.update(parseInt(id), req.body);
            res.json({status: 200, user: userUpdate});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }

    deleteUser = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const deleteUser = await this.userService.delete(parseInt(id));
            res.json({status: 200, user: deleteUser});
        } catch (error) {
            if (error instanceof Error){
                res.status(500).send(error.message)
            }
        }
    }
}
