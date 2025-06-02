import { Repository } from "typeorm";
import { AppDataSource } from "../database/conection";
import { Device } from "../models/deviceModel";

export default class DeviceService {
    private deviceRepository: Repository<Device>;

    constructor() {
        this.deviceRepository = AppDataSource.getRepository(Device);
    }

    findAll = async () => {
        return await this.deviceRepository.find({
            relations: {
                assignments: true
            }
        });
    }

    findDeviceBySerie = async (serie: string): Promise<Device | null> => {
        return await this.deviceRepository.findOne({
            where: {serie }
        });
    }

    registerDevice = async (deviceData: Partial<Device>) => {
        const device = this.deviceRepository.create(deviceData);
        return await this.deviceRepository.save(device);
    }

    updateDevice = async (serie: string, deviceData: Partial<Device>): Promise<Device> => {
        try {
            await this.deviceRepository.update(
                serie,
                deviceData
            );
            
            const updatedDevice = await this.findDeviceBySerie(serie);
            if (!updatedDevice) {
                throw new Error('Dispositivo no encontrado después de la actualización');
            }
            return updatedDevice;
        } catch (error) {
            throw new Error(
                `Error al actualizar el dispositivo: ${error instanceof Error ? error.message : 'Error desconocido'}`
            );
        }
    }

    delete = async (id: string): Promise<any> => {
        try {
            const existingAssignment = await this.findDeviceBySerie(id);
            if (!existingAssignment) {
                throw new Error(`Dispositivo con ID ${id} no encontrado`);
            }
            return await this.deviceRepository.delete(id);
        } catch (error) {
            throw new Error(
                `Error al eliminar el dispositivo: ${error instanceof Error ? error.message : 'Error desconocido'}`
            );
        }
    }
    
}
