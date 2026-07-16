import { v7 as uuidv7 } from "uuid";
import { Employee } from "../Entity/employee.js";

export class EmployeeService {
    private employees: Employee[] = [];

    create(employee: Omit<Employee, "id" | "receiveNoti">): Employee {
        const newEmployee = new Employee(uuidv7(), employee.name);

        this.employees.push(newEmployee);
        return newEmployee;
    }

    // Tìm Employee theo id, không thấy trả về null
    findById(id: string): Employee | null {
        const employee = this.employees.find(function (item) {
            return item.id === id;
        });

        return employee ?? null;
    }

    // Tìm Employee theo id thầy thì cập nhật không thì trả về null
    updateById(id: string, data: Partial<Employee>): Employee | null {
        const employee = this.findById(id);

        if (!employee) {
            return null;
        }

        Object.assign(employee, data);
        return employee;
    }
}