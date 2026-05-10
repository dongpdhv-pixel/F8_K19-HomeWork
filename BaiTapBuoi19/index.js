const products = [
    { id: 1, name: 'iPhone', price: 2000 },
    { id: 2, name: 'Samsung', price: 1500 },
    { id: 3, name: 'Xiaomi', price: 1000 },
    { id: 4, name: 'Oppo', price: 1200 }
]
const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 }
        ]
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 }
        ]
    }
]
function findBestSellingProduct(products, orders) {
    // lưu doanh thu từng sản phẩm
    const revenueMap = {}
    // duyệt từng order
    orders.forEach(order => {
        order.items.forEach(item => {
            // tìm product tương ứng
            const product = products.find(p => p.id === item.productId)

            if (product) {
                const revenue = product.price * item.quantity

                // cộng dồn doanh thu
                revenueMap[product.id] =
                    (revenueMap[product.id] || 0) + revenue
            }
        })
    })
    let maxRevenue = 0
    let bestProduct = null
    // tìm sản phẩm doanh thu cao nhất
    products.forEach(product => {
        const revenue = revenueMap[product.id] || 0
        if (revenue > maxRevenue) {
            maxRevenue = revenue
            bestProduct = {
                ...product,
                revenue: revenue
            }
        }
    })
    return bestProduct
}
console.log(findBestSellingProduct(products, orders))