import { Repository } from "typeorm";
import { AppDataSource } from "../database/conection";
import { Role } from "../models/roleModel";

export default class RoleService {
    private roleRepository: Repository<Role>;

    constructor() {
        this.roleRepository = AppDataSource.getRepository(Role);
    }

    findAll = async () => {
        return await this.roleRepository.find({
            relations: {
                users: true,
                accesRole: true
            }
        });
    }

    findById = async (idRole: number): Promise<Role | null> => {
        return await this.roleRepository.findOne({
            where: { idRole }
        });
    }
}
