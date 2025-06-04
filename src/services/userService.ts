import { Repository } from "typeorm";
import { User } from "../models/userModel";
import { AppDataSource } from "../database/conection";
import StatusService from "./statusService";
import { Status } from "../models/statusModel";
import { StatusEnum } from "../enum/StatusEnum";

export default class UserService {
    private userRepository: Repository<User>;
    private statusService: StatusService;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.statusService = new StatusService();
    }

    findAll = async () => {
        return await this.userRepository.find({
            relations: {
                role: true,
                device: true,
                department: true,
                status: true,
                assigments: true,
                digitalAccesses: true
            }
        });
    }

    findById = async (id: number) => {
        return await this.userRepository.findOne({
            where: { idUser: id },
            relations: {
                role: true,
                department: true,
                device: true,
                status: true,
                assigments: true,
                digitalAccesses: true
            }
        });
    }

    create = async (userData: Partial<User>) => {
        const statuses = this.statusService.findAll();
        const idStatus = (await statuses).find((status: Status) => status.description === StatusEnum.ACTIVE )?.idStatus;
        userData =  {
            ...userData,
            status: { idStatus } as any
        }
        console.log("usuer ", userData)
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    update = async (id: number, userData: Partial<User>): Promise<User> => {
        try {
            const validateUser = await this.userRepository.update(
                { idUser: id },
                userData
            );
            console.log("validaye ", validateUser)
            
            const updatedUser = await this.findById(id);
            if (!updatedUser) {
                throw new Error('Usuario no encontrado después de la actualización');
            }
            return updatedUser;
        } catch (error) {
            throw new Error(
                `Error al actualizar usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`
            );
        }
    }

    delete = async (id: number): Promise<any> => {
        try {
            const existingUser = await this.findById(id);
            if (!existingUser) {
                throw new Error(`Usuario con ID ${id} no encontrado`);
            }
            return await this.userRepository.delete(id);
        } catch (error) {
            throw new Error(
                `Error al eliminar usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`
            );
        }
    }
}
