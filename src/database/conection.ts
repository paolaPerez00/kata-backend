import { DataSource } from "typeorm";
import { Assignment } from "../models/assignmentModel";
import { Department } from "../models/departmentModel";
import { Device } from "../models/deviceModel";
import { Role } from "../models/roleModel";
import { Status } from "../models/statusModel";
import { User } from "../models/userModel";
import { DigitalAccess } from "../models/digitalAccessModel";
import { Application } from "../models/applicationModel";
import { AccessApplication } from "../models/accessApplicationModel";
import { AccessRole } from "../models/accessRoleModel";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "1234567890",
    database: "kata1",
    logging: true,
    entities: [Assignment, Department, Device, Role, Status, User, DigitalAccess, Application, AccessApplication, AccessRole],
    synchronize: false,
    subscribers: [],
    migrations: [],
})