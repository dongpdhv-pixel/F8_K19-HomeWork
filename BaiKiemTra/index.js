const employees = [
    { id: 1, name: "Alice", age: 23, status: 'working' },
    { id: 3, name: "Bob", age: 25, status: 'working' },
    { id: 6, name: "John", age: 27, status: 'working' },
    { id: 8, name: "David", age: 23, status: 'quit_job' },
    { id: 10, name: "Eve", age: 20, status: 'working' },
];


const products = [
    { id: 1, name: "Phone", price: 1200 },
    { id: 2, name: "Laptop", price: 3000  },
    { id: 3, name: "Tab", price: 2000  },
    { id: 4, name: "PC", price: 800  },
    { id: 5, name: "Monitor", price: 1500  },
]


const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 3, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 1 },
    { id: 4, employeeId: 6, productId: 1, quantity: 2 },
    { id: 5, employeeId: 3, productId: 5, quantity: 3 },
    { id: 6, employeeId: 8, productId: 1, quantity: 1 },
    { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];
//
const productMap = new Map(products.map(p =>[p.id, p]));
const employeeMap = new Map(employees.map(e =>[e.id, e]));
// Aggregate orders into a Map: employeeId -> { totalQty, totalRevenue, productRevMap }
const employeeStatsMap = orders.reduce((map, { employeeId, productId, quantity }) => {
    const price    = productMap.get(productId)?.price ?? 0;
    const revenue  = price * quantity;

    if (!map.has(employeeId)) {
        map.set(employeeId, { totalQty: 0, totalRevenue: 0, productRevMap: new Map() });
    }

    const stats = map.get(employeeId);
    stats.totalQty     += quantity;
    stats.totalRevenue += revenue;

    // Track per-product revenue for this employee (Bài 8)
    stats.productRevMap.set(
        productId,
        (stats.productRevMap.get(productId) ?? 0) + revenue
    );

    return map;
}, new Map());

// Aggregate orders into a Map: productId -> { totalQty, totalRevenue }
const productStatsMap = orders.reduce((map, { productId, quantity }) => {
    const price   = productMap.get(productId)?.price ?? 0;
    if (!map.has(productId)) {
        map.set(productId, { totalQty: 0, totalRevenue: 0 });
    }
    const stats = map.get(productId);
    stats.totalQty     += quantity;
    stats.totalRevenue += price * quantity;
    return map;
}, new Map());

// ─── Shared Helper: pick the entry with the highest value from a Map ──────────
const getMaxByValue = (map) =>
    [...map.entries()].reduce((max, curr) => (curr[1] > max[1] ? curr : max));

//Bài 1//
function getWorkingEmployees (employees) {
    return employees.filter(employee => employee.status === 'working');
}
console.log (getWorkingEmployees(employees));


//Bài 2
function getOldestEmployee (employees) {
        return employees.reduce((oldest, e) => (e.age > oldest.age ? e : oldest));
}
console.log (getOldestEmployee(employees));


//Bài 3
function getCheapestProduct (products) {
    return products.reduce((cheapest, p) => (p.price < cheapest.price ? p : cheapest ));
}
console.log (getCheapestProduct(products));


//Bài 4
function getBestSellingProduct(products) {
    const findBestSelling = () => {
        const qtyMap = new Map(
            [...productStatsMap].map(([id, s]) => [id, s.totalQty])
        );
        const [productId] = getMaxByValue(qtyMap);
        return productMap.get(productId);
    };
    return findBestSelling();
}
console.log (getBestSellingProduct(products));



//Bài 5
function getHighestRevenueProduct(products) {
    const buildRevenueMap = () => {
        return new Map(
            [...productStatsMap].map(([id, s]) => [id, s.totalRevenue])
        );
    };
    const revenueMap = buildRevenueMap();
    const [productId] = getMaxByValue(revenueMap);
    return productMap.get(productId);
}
console.log (getHighestRevenueProduct(products));

//Bài 6
function getTopSellerByQuantity (employees) {
    const buildEmployeeQtyMap = () => {
        return new Map(
            [...employeeStatsMap].map(([id, s]) => [id, s.totalQty])
        );
    };
    const qtyMap = buildEmployeeQtyMap();
    const [employeeId] = getMaxByValue(qtyMap);
    return employeeMap.get(employeeId);
}
console.log (getTopSellerByQuantity(employees));

//Bài 7
function getTopSellerByRevenue (employees) {
    const buildRevenueMap = () => {
        return new Map(
            [...employeeStatsMap].map(([id, s]) => [id, s.totalRevenue])
        );
    };
    const revenueMap = buildRevenueMap();
    const [employeeId] = getMaxByValue(revenueMap);
    return employeeMap.get(employeeId);
}
console.log (getTopSellerByRevenue(employees));

//Bài 8
function getTopProductPerEmployee(products) {

    const findTopProduct = (productRevMap) => {

        const [topProductId] = getMaxByValue(productRevMap);

        return {
            productName: productMap.get(topProductId)?.name,
            revenue: productRevMap.get(topProductId)
        };
    };

    return [...employeeStatsMap.entries()].map(
        ([employeeId, { productRevMap }]) => {

            const topProduct = findTopProduct(productRevMap);

            return {
                employee: employeeMap.get(employeeId)?.name,
                topProduct: topProduct.productName,
                revenue: topProduct.revenue
            };
        }
    );
}
console.log (getTopProductPerEmployee(products));

//Bài 9
function getCommissionPerEmployee(rate) {
    const result = [];
    employeeStatsMap.forEach((stats, employeeId) => {
        result.push({
            employee: employeeMap.get(employeeId).name,

            commission: stats.totalRevenue * 0.03
        });
    });
    return result;
}
console.log (getCommissionPerEmployee(0.03));

//BaÌ 10
function getEmployeesSortedByRevenue(order) {
    return [...employeeStatsMap.entries()]
        .sort(
            ([, a], [, b]) => b.totalRevenue - a.totalRevenue
        )
        .map(
            ([employeeId, { totalRevenue }]) => ({
                employee: employeeMap.get(employeeId)?.name,
                revenue: totalRevenue
            })
        );
}
console.log (getEmployeesSortedByRevenue("desc"));
