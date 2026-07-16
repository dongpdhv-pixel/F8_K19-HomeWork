import { CustomerService } from "./service/customer.service";
import { EmployeeService } from "./service/employee.service";
import { ProjectService } from "./service/project.service";

const customerService = new CustomerService();
const employeeService = new EmployeeService();
const projectService = new ProjectService(employeeService);

function assert(condition: boolean, message: string): void {
    console.log(condition ? ` PASS: ${message}` : ` FAIL: ${message}`);
}

console.log(" Test Case 1: Tạo Customer");
const customer1 = customerService.create({
    name: "Công ty ABC",
    tax: "0101234567",
    address: "123 Lê Lợi, Q1, TP.HCM",
});
assert(!!customer1.id, "Customer được tạo + id");
console.log(customer1);

console.log(" Test Case 2: Cập nhật Customer");
const updatedCustomer = customerService.updateById(customer1.id, {
    address: "456 Nguyễn Huệ, Q1, TP.HCM",
});
assert(
    updatedCustomer?.address === "456 Nguyễn Huệ, Q1, TP.HCM",
    "Địa chỉ Customer đã được cập nhật"
);
console.log(updatedCustomer);

console.log(" Test Case 3: Tạo Employee");
const employee1 = employeeService.create({ name: "Nguyễn Văn A" });
const employee2 = employeeService.create({ name: "Trần Thị B" });
assert(employee1.id !== employee2.id, "2 Employee có id khác nhau");
console.log(employee1, employee2);

console.log("Test Case 4: Tìm Employee");
const foundEmployee = employeeService.findById(employee1.id);
assert(foundEmployee?.id === employee1.id, "Tìm Employee theo id");

const notFoundEmployee = employeeService.findById("id không tồn tại");
assert(notFoundEmployee === null, "Tìm Employee với id không tồn tại trả về null");

console.log(" Test Case 5: Tạo Project=");
console.log(" thông báo bên dưới");
const project1 = projectService.create({
    customerId: customer1.id,
    employeeId: employee1.id,
});
assert(!!project1.id, "Project được tạo thành công + id");
console.log(project1);

console.log("Test Case 6: Đổi nhân viên phụ trách Project");
console.log("--> Console log thông báo bên dưới:");
const updatedProject1 = projectService.updateById(project1.id, {
    employeeId: employee2.id,
});
assert(
    updatedProject1?.employeeId === employee2.id,
    "Project đã được cập nhật employeeId mới"
);

console.log(" Test Case 7: Cập nhật Project nhưng không đổi Employee");
console.log();
const customer2 = customerService.create({
    name: "Công ty XYZ",
    tax: "0109876543",
    address: "789 Hai Bà Trưng, Q3, TP.HCM",
});
const updatedProject2 = projectService.updateById(project1.id, {
    customerId: customer2.id,
});
assert(
    updatedProject2?.customerId === customer2.id,
    "Project đã được cập nhật customerId, không gọi receiveNoti"
);

console.log("Test Case 8: Cập nhật dữ liệu không tồn tại ");
const resultCustomer = customerService.updateById("id-khong-ton-tai", {
    address: "Địa chỉ mới",
});
assert(resultCustomer === null, "CustomerService.updateById trả về null");

const resultEmployee = employeeService.updateById("id-khong-ton-tai", {
    name: "Tên mới",
});
assert(resultEmployee === null, "EmployeeService.updateById trả về null");

const resultProject = projectService.updateById("id-khong-ton-tai", {
    customerId: customer1.id,
});
assert(resultProject === null, "ProjectService.updateById trả về null");

console.log(" Test Case 9: Project với employeeId không tồn tại");
console.log("--> KHÔNG được có console log thông báo nào bên dưới:");
let noError = true;
let project9: ReturnType<typeof projectService.create> | undefined;
try {
    project9 = projectService.create({
        customerId: customer1.id,
        employeeId: "employee-khong-ton-tai",
    });
} catch (error) {
    noError = false;
}
assert(!!project9, "Project vẫn được tạo dù employeeId không tồn tại");
assert(noError, "Không phát sinh lỗi khi tạo Project với employeeId không hợp lệ");