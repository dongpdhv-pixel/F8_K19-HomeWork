const getProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')

        const data = await response.json()

        return data
    } catch (e) {
        alert ('Failed to fetch products.')
    }
}

const renderProductCard = (product) => {
    const cardContainer = document.createElement('div')
    cardContainer.classList = 'product-cards'
    cardContainer.setAttribute('data-id', 'product.id')
    cardContainer.className = 'flex flex-col justify-between border border-gray-200 rounded-xl p-4 bg-white h-full'

    const productItemImg = document.createElement('div')
    productItemImg.classList = 'product-card-img'

    const productImg = document.createElement('img')
    productImg.setAttribute('src', product.image)
    productImg.className = 'w-full h-40 object-contain'

    productItemImg.append(productImg)


    const productItemTitle = document.createElement('p')
    productItemTitle.setAttribute('class', 'product-title')
    productItemTitle.innerHTML = product.title

    const productItemStar = document.createElement('p')
    productItemStar.classList = 'product-star'

    const productItemStarIcon = document.createElement('i')
    productItemStarIcon.classList = 'mdi mdi-star'

    const productItemStarRate = document.createElement('span')
    productItemStarRate.innerText = product.rating.rate

    const productItemStarStar = document.createElement('span')
    productItemStarStar.classList = 'quantity-star'
    productItemStarStar.innerText = '(' +product.rating.count +')'

    const productCardFooter = document.createElement('div')
    productCardFooter.classList = 'product-card-footer'
    productCardFooter.className = 'flex justify-between items-center mt-2 border-t py-4 border-gray-200'

    const productPrice = document.createElement('p')
    productPrice.classList = 'product-price'
    productPrice.innerText = product.price
    productPrice.innerText = product.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const productItemButton= document.createElement('button')
    productItemButton.setAttribute('title', 'Thêm vào giỏ hàng')
    productItemButton.classList = 'product-button'
    productItemButton.className = 'border border-gray-200 rounded-lg px-2 cursor-pointer hover:bg-violet-50 hover:border-violet-300 transition-colors'

    productItemButton.addEventListener('click', () => {
        updateCartCount()
    })

    const productItemButtonIcon = document.createElement('i')
    productItemButtonIcon.classList = 'mdi mdi-cart-plus'

    productItemButton.append(productItemButtonIcon)

    productCardFooter.append(productPrice)
    productCardFooter.append(productItemButton)

    productItemStar.append(productItemStarIcon)
    productItemStar.append(productItemStarRate)
    productItemStar.append(productItemStarStar)

    cardContainer.append(productItemImg)
    cardContainer.append(productItemTitle)
    cardContainer.append(productItemStar)
    cardContainer.append(productCardFooter)

    return cardContainer
}

const renderProductList = async () => {
    const products = await getProducts()

    const productList = document.querySelector('.product-list')

    products.forEach(product => {
        productList.append(renderProductCard(product))
    })
}

const renderCategoryList = (categories, products) => {
    const sidebarContent = document.querySelector('.sidebar-content')

    categories.forEach(category => {
        const count = products.filter(p => p.category === category).length

        const categoriesItem = document.createElement('div')
        categoriesItem.className = 'category-item flex justify-between items-center pl-2 py-2 rounded-xl cursor-pointer hover:bg-violet-50 transition-colors'

        const categoryName = document.createElement('span')
        categoryName.innerText = category

        const categoryCount = document.createElement('span')
        categoryCount.className = 'bg-violet-50 text-violet-500 text-xs rounded-full px-2 py-0.5'
        categoryCount.innerText = count

        categoriesItem.append(categoryName)
        categoriesItem.append(categoryCount)
        sidebarContent.append(categoriesItem)

        categoriesItem.addEventListener('click', () => {
            filterByCategory(category, products)
        })
    })
}

const filterByCategory = (category, products) => {
    const filtered = products.filter(p => p.category === category)
    const productList = document.querySelector('.product-list')
    const countLabel = document.querySelector('.count-label')

    productList.innerHTML = ''
    filtered.forEach(product => {
        productList.append(renderProductCard(product))
    })

    countLabel.innerText = `Hiển thị ${filtered.length} sản phẩm`
}

const init = async () => {
    const products = await getProducts()

    let categoryNames = [...products.map(products => products.category)]
    categoryNames = new Set(categoryNames)
    categoryNames = Array.from(categoryNames)

    renderCategoryList(categoryNames, products)
    renderProductList()

    document.querySelector('.categories-item').addEventListener('click', async () => {
        const products = await getProducts()
        const productList = document.querySelector('.product-list')
        const countLabel = document.querySelector('.count-label')

        productList.innerHTML = ''
        products.forEach(product => {
            productList.append(renderProductCard(product))
        })
        countLabel.innerText = `Hiển thị ${products.length} sản phẩm`
    })
}

init()

let cartCount = 0

const updateCartCount = () => {
    cartCount++
    document.querySelector('#cart-count').innerText = cartCount
}