import { Repository } from "typeorm";
import { AppDataSource } from "../database/conection";
import { Assignment } from "../models/assignmentModel";
import UserService from "./userService";
import DeviceService from "./deviceService";
import { StatusEnum } from "../enum/StatusEnum";
import StatusService from "./statusService";
import { Status } from "../models/statusModel";

export default class AssignmentService {
    private assigmnentRepository: Repository<Assignment>;
    private userService: UserService;
    private deviceService: DeviceService;
        private statusService: StatusService;

    constructor() {
        this.assigmnentRepository = AppDataSource.getRepository(Assignment);
        this.userService = new UserService();
        this.deviceService = new DeviceService();
                this.statusService = new StatusService();
    }

    findAll = async () => {
        return await this.assigmnentRepository.find({
            relations: {
                status: true,
                device: true,
                user: true
            }
        });
    }

    findById = async (id: number) => {
        return await this.assigmnentRepository.findOne({
            where: { idAssignment: id },
            relations: {
                status: true,
                device: true,
                user: true
            }
        });
    }

    create = async (assignmentData: Partial<Assignment>) => {
        const { user, device } : any = assignmentData; 
        const foundUser = await this.userService.findById(user?.idUser)

        if (!foundUser) {
            throw new Error('Usuario no encontrado');
        }
        console.log("user ", user, foundUser)
        if(foundUser.device){
            throw new Error('El usuario ya cuenta con pc asignado');
        }
        const foundDevice = await this.deviceService.findDeviceBySerie(device?.serie)
        if (!foundDevice) {
            throw new Error('Dispositivo no encontrado');
        }
       const deviceAssigned = foundDevice.assignments?.find((assignment: Assignment) => assignment.device === device.serie && assignment.status.description === StatusEnum.ASSIGNED);
        if (deviceAssigned) {
            throw new Error('El dispositivo ya se encuentra asignado');
        }

        const statuses = this.statusService.findAll();
        const idStatus = (await statuses).find((status: Status) => status.description === StatusEnum.PENDING )?.idStatus;
        const assignmentCreate = {
            ...assignmentData,
            status: {idStatus}
        }
        const assignment = this.assigmnentRepository.create(assignmentCreate);
        
        await this.assigmnentRepository.save(assignment);
        await this.userService.update(foundUser.idUser, {
            device: foundDevice
        });
        return assignment;
    }

    update = async (id: number, assignmentData: Partial<Assignment>): Promise<Assignment> => {
        try {
            await this.assigmnentRepository.update(
                { idAssignment: id },
                assignmentData
            );
            const updatedAssignment = await this.findById(id);
            if (!updatedAssignment) {
                throw new Error('La solicitud de asignación del dispositivo no encontrado después de la actualización');
            }
            return updatedAssignment;
        } catch (error) {
            throw new Error(
                `Error al actualizar la solicitud de asignación del dispositivo: ${error instanceof Error ? error.message : 'Error desconocido'}`
            );
        }
    }

    delete = async (id: number): Promise<any> => {
        try {
            const existingAssignment = await this.findById(id);
            if (!existingAssignment) {
                throw new Error(`La solicitud de asignación del dispositivo con ID ${id} no encontrado`);
            }
            return await this.assigmnentRepository.delete(id);
        } catch (error) {
            throw new Error(
                `Error al eliminar la solicitud de asignación del dispositivo: ${error instanceof Error ? error.message : 'Error desconocido'}`
            );
        }
    }    
}
