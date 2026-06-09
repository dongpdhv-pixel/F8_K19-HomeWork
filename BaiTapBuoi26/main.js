const API_URL = "http://localhost:3000/customers";

const customerList = document.getElementById("customer-list");

const companyNameInput = document.getElementById("companyName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const taxIdInput = document.getElementById("taxId");
const addressInput = document.getElementById("address");

let currentCustomerId = null;

// Get

async function renderCustomers() {
    try {
        const response = await fetch(API_URL);
        const customers = await response.json();

        customerList.innerHTML = customers
            .map(
                (customer) => `
        <tr>
          <td>${customer.id}</td>

          <td>
            <div class="customer-info">
              <span class="customer-name">
                ${customer.companyName}
              </span>

              <span class="customer-email">
                ${customer.email}
              </span>
            </div>
          </td>

          <td>${customer.phone}</td>
          <td>${customer.address}</td>
          <td>${customer.taxId}</td>

          <td>
            <span class="badge badge-active">
              ${customer.status}
            </span>
          </td>

          <td class="actions">
            <button onclick="editCustomer('${customer.id}')">
              ✎
            </button>

            <button onclick="deleteCustomer('${customer.id}')">
              🗑
            </button>
          </td>
        </tr>
      `
            )
            .join("");
    } catch (error) {
        console.log(error);
    }
}

// delete

async function deleteCustomer(id) {
    const isConfirm = confirm("Bạn có chắc muốn xóa?");

    if (!isConfirm) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    renderCustomers();
}

// edit

async function editCustomer(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const customer = await response.json();

    currentCustomerId = id;

    companyNameInput.value = customer.companyName;
    emailInput.value = customer.email;
    phoneInput.value = customer.phone;
    taxIdInput.value = customer.taxId;
    addressInput.value = customer.address;

    document.getElementById("popup-toggle").checked = true;
}

// update

async function saveCustomer() {
    if (!currentCustomerId) return;

    const response = await fetch(
        `${API_URL}/${currentCustomerId}`
    );

    const oldCustomer = await response.json();

    const updatedCustomer = {
        ...oldCustomer,
        companyName: companyNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        taxId: taxIdInput.value,
        address: addressInput.value,
    };

    await fetch(`${API_URL}/${currentCustomerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCustomer),
    });

    document.getElementById("popup-toggle").checked = false;

    currentCustomerId = null;

    renderCustomers();
}

renderCustomers();