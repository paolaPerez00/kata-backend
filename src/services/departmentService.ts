import { Repository } from "typeorm";
import { AppDataSource } from "../database/conection";
import { Department } from "../models/departmentModel";

export default class DepartmentService {
    private departmentRepository: Repository<Department>;

    constructor() {
        this.departmentRepository = AppDataSource.getRepository(Department);
    }

    findDepartments = async () => {
         return await this.departmentRepository.find();
    }
}
