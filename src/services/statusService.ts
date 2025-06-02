import { Repository } from "typeorm";
import { AppDataSource } from "../database/conection";
import { Status } from "../models/statusModel";

export default class StatusService {
    private statusRepository: Repository<Status>;

    constructor() {
        this.statusRepository = AppDataSource.getRepository(Status);
    }

    findAll = async () => {
        return await this.statusRepository.find({
            relations: {
                digitalAccesss: true,
                statusAssigment: true,
                statusUser: true
            }
        });
    }

    findById = async (idStatus: number): Promise<Status | null> => {
        return await this.statusRepository.findOne({
            where: { idStatus }
        });
    }
}
