import { Repository } from "typeorm";
import { AppDataSource } from "../database/conection";
import { AccessRole } from "../models/accessRoleModel";

export default class AccessRoleService {
  private accessRoleRepository: Repository<AccessRole>;

  constructor() {
      this.accessRoleRepository = AppDataSource.getRepository(AccessRole);
  }

  findAll = async () => {
      return await this.accessRoleRepository.find({
          relations: {
              role: true,
              application: true
          }
      });
  }

  async findOneAccess(idApplication: number, idRole: number) {
    return await this.accessRoleRepository.findOne({
      where: {
        idRole: idRole,
        idApplication: idApplication
      },
      relations: {
        role: true,
        application: true
      }
    });
  }
}
