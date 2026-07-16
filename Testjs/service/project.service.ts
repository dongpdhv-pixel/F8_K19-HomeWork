import { v7 as uuidv7 } from "uuid";
import type { Project } from "../Entity/project";
import { EmployeeService } from "./employee.service";

export class ProjectService {
    private projects: Project[] = [];
    private employeeService: EmployeeService;

    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

    // Tạo Project mới
    create(project: Omit<Project, "id">): Project {
        const newProject: Project = {
            id: uuidv7(),
            ...project,
        };

        this.projects.push(newProject);

        const employee = this.employeeService.findById(newProject.employeeId);
        if (employee) {
            employee.receiveNoti("Bạn vừa được gán vào dự án mới.");
        }

        return newProject;
    }

    // Tìm Project theo id
    findById(id: string): Project | null {
        return this.projects.find(item => item.id === id) ?? null;
    }

    // Cập nhật Project
    updateById(id: string, data: Partial<Project>): Project | null {
        const project = this.findById(id);

        if (!project) {
            return null;
        }

        const oldEmployeeId = project.employeeId;

        Object.assign(project, data);

        const employeeChanged =
            data.employeeId !== undefined &&
            data.employeeId !== oldEmployeeId;

        if (employeeChanged) {
            const newEmployee = this.employeeService.findById(project.employeeId);

            if (newEmployee) {
                newEmployee.receiveNoti(
                    "Bạn đã được chuyển giao phụ trách dự án này."
                );
            }
        }

        return project;
    }
}