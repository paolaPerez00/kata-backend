import { Repository } from "typeorm";
import { AppDataSource } from "../database/conection";
import { AccessApplication } from "../models/accessApplicationModel";

export default class AccessApplicationService {
  private accessApplicationRepository: Repository<AccessApplication>;

  constructor() {
      this.accessApplicationRepository = AppDataSource.getRepository(AccessApplication);
  }

  findAll = async () => {
      return await this.accessApplicationRepository.find({
          relations: {
              application: true,
              assignment: true
          }
      });
  }

  async findOneAccess(idApplication: number, idRole: number) {
    return await this.accessApplicationRepository.findOne({
      where: {
        idAssignment: idRole,
        idApplication: idApplication
      },
      relations: {
        assignment: true,
        application: true
      }
    });
  }
}
