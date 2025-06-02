import { Repository } from "typeorm";
import { AppDataSource } from "../database/conection";
import { DigitalAccess } from "../models/digitalAccessModel";
import UserService from "./userService";
import AccessRoleService from "./accessRoleService";
import StatusService from "./statusService";
import { Status } from "../models/statusModel";
import { StatusEnum } from "../enum/StatusEnum";

export default class AccessService {
    private digitalAccessRepository: Repository<DigitalAccess>;
    private userService: UserService;
    private accessRoleService: AccessRoleService;
    private statusService: StatusService;

    constructor() {
        this.digitalAccessRepository = AppDataSource.getRepository(DigitalAccess);
        this.userService = new UserService();
        this.accessRoleService = new AccessRoleService();
        this.statusService = new StatusService();
    }

    findAll = async () => {
        return await this.digitalAccessRepository.find({
            relations: {
                status: true,
                user: true,
                accessApplications: true
            }
        });
    }

    findById = async (id: number) => {
        return await this.digitalAccessRepository.findOne({
            where: { idAccess: id },
            relations: {
                status: true,
                user: true
            }
        });
    }

    createDigitalAccess = async (accessData: Partial<DigitalAccess>) => {
        try {
            const { user, accessApplications, description } = accessData;
            const foundUser = await this.getUserWithRole(user?.idUser);
            await this.validateApplicationPermissions(accessApplications!, foundUser.role);
            return await this.createDigitalAccessRecords(accessApplications!, foundUser, description);
    
        } catch (error) {
            throw new Error(`Error al crear acceso digital: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    update = async (id: number, accessData: Partial<DigitalAccess>): Promise<DigitalAccess> => {
        try {
            await this.digitalAccessRepository.update(
                { idAccess: id },
                accessData
            );
            
            const updatedAccess = await this.findById(id);
            if (!updatedAccess) {
                throw new Error('Acceso digital no encontrado después de la actualización');
            }
            return updatedAccess;
        } catch (error) {
            throw new Error(
                `Error al actualizar la solicitud de acceso: ${error instanceof Error ? error.message : 'Error desconocido'}`
            );
        }
    }

    
    private async getUserWithRole(id: any) {
        const foundUser = await this.userService.findById(id);
        
        if (!foundUser) {
            throw new Error('Usuario no encontrado');
        }
    
        if (!foundUser.role) {
            throw new Error('Usuario no tiene rol asignado');
        }
    
        return foundUser;
    }
    
    private async validateApplicationPermissions(accessApplications: any[], userRole: any) {
        const permissionChecks = accessApplications.map(app => 
            this.accessRoleService.findOneAccess(app.idApplication, userRole.idRole)
        );
    
        const permissions = await Promise.all(permissionChecks);
        const applicationErrors: string[] = [];
    
        permissions.forEach((hasPermission, index) => {
            if (!hasPermission) {
                const appId = accessApplications[index].idApplication;
                applicationErrors.push(
                    `El rol ${userRole.description} no tiene permiso para la aplicación ${appId}`
                );
            }
        });
    
        if (applicationErrors.length > 0) {
            throw new Error(`Errores de validación: ${applicationErrors.join(', ')}`);
        }
    }
    
    private async createDigitalAccessRecords(accessApplications: any[], foundUser: any, description: any) {

        const statuses = this.statusService.findAll();
        const idStatus = (await statuses).find((status: Status) => status.description === StatusEnum.PENDING )?.idStatus;

        const accessRecords = accessApplications.map(app => {
            const accessData = {
                user: foundUser,
                description,
                accessApplication: app,
                status: { idStatus }
            };
            return this.digitalAccessRepository.create(accessData);
        });
    
        return await this.digitalAccessRepository.save(accessRecords);
    }
}
