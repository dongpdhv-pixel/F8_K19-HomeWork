import { v7 as uuidv7 } from "uuid";
import type  {Customer} from "../Entity/customer"

export class CustomerService {
    private customers: Customer[] = [];

    create(customer: Omit<Customer, "id">): Customer {
        const newCustomer: Customer = {
            id: uuidv7(),
        ...customer,
    }
    this.customers.push(newCustomer);
        return newCustomer;
}

    findById(id: string): Customer | null  {
        const customer = this.customers.find(function (item){
            return item.id === id;
        });
        return customer ?? null;
    }
    updateById(id: string, data: Partial<Customer>): Customer | null {
    const customer = this.findById(id);

    if (!customer) {
    return null;
    }
Object.assign(customer, data);
return customer;
}
}
