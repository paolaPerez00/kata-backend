import { Repository } from "typeorm";
import { AppDataSource } from "../database/conection";
import { Application } from "../models/applicationModel";

export default class ApplicationService {
    private applicationRepository: Repository<Application>;

    constructor() {
        this.applicationRepository = AppDataSource.getRepository(Application);
    }

    findAll = async () => {
        return await this.applicationRepository.find({
            relations: {
                accesRole: true,
                accessApplication: true
            }
        });
    }

    findApplicationById = async (id: number): Promise<Application | null> => {
        return await this.applicationRepository.findOne({
            where: {idApplication: id }
        });
    }

    registerApplication = async (ApplicationData: Partial<Application>) => {
        const Application = this.applicationRepository.create(ApplicationData);
        return await this.applicationRepository.save(Application);
    }

    updateApplication = async (serie: number, ApplicationData: Partial<Application>): Promise<Application> => {
        try {
            await this.applicationRepository.update(
                serie,
                ApplicationData
            );
            
            const updatedApplication = await this.findApplicationById(serie);
            if (!updatedApplication) {
                throw new Error('Aplicación no encontrada después de la actualización');
            }
            return updatedApplication;
        } catch (error) {
            throw new Error(
                `Error al actualizar de la aplicación: ${error instanceof Error ? error.message : 'Error desconocido'}`
            );
        }
    }

    delete = async (id: number): Promise<any> => {
        try {
            const existingApplication = await this.findApplicationById(id);
            if (!existingApplication) {
                throw new Error(`Aplicación con ID ${id} no encontrada`);
            }
            return await this.applicationRepository.delete(id);
        } catch (error) {
            throw new Error(
                `Error al eliminarla aplicación: ${error instanceof Error ? error.message : 'Error desconocido'}`
            );
        }
    }
    
}
