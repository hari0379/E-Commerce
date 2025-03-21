document.addEventListener('DOMContentLoaded', function () {
    const categories = document.querySelectorAll('.categories a');
    const productGrid = document.querySelector('.product-grid');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const categoryFilter = document.getElementById('category-filter');
    const brandFilter = document.getElementById('brand-filter');
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('login-message');


    const validCredentials = {
        username: 'user123',
        password: 'pass123'
    };

  
    loginBtn.addEventListener('click', function () {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === validCredentials.username && password === validCredentials.password) {
            loginMessage.textContent = 'Login successful!';
            loginMessage.style.color = 'green';
        } else {
            loginMessage.textContent = 'Invalid username or password.';
            loginMessage.style.color = 'red';
        }
    });

   
    const products = [
        { name: 'Laptop', price: 999, image: 'images/laptop-img.png', category: 'electronics', brand: 'apple' },

        { name: 'camera', price: 500, image: 'images/camera-img.png', category: 'electronics', brand: 'apple' },

        { name: 'women T-shirt', price: 500, image: 'images/party.webp', category: 'clothes', brand: 'adidas' },

        { name: 'Smartphone', price: 699, image: 'images/mobile-img.png', category: 'electronics', brand: 'samsung' },

        { name: 'T-Shirt', price: 20, image: 'images/dress.webp', category: 'clothing', brand: 'nike' },

        { name: 'Suit', price: 20, image: 'images/img-4.png', category: 'clothing', brand: 'nike' },

        { name: 'cut-Bunnies', price: 20, image: 'images/img-3.png', category: 'clothing', brand: 'nike' },

        { name: 'Mac-book', price: 500, image: 'images/mac-img.png', category: 'electronics', brand: 'apple' },

        { name: 'Jeans', price: 50, image: 'images/T shirts & pants.jpeg', category: 'clothing', brand: 'adidas' },

        { name: 'Watch', price: 150, image: 'images/watch-img.png', category: 'accessories', brand: 'apple' },
        
        { name: 'Sunglasses', price: 100, image: 'images/sunglasses.jpg', category: 'accessories', brand: 'nike' },

        { name: 'Computer', price: 999, image: 'images/computer-img.png', category: 'electronics', brand: 'Samsung' }
    ];
 
    displayProducts(products);

    priceRange.addEventListener('input', function () {
        priceValue.textContent = `$${this.value}`;
        applyFilters();
    });

    categoryFilter.addEventListener('change', applyFilters);
    brandFilter.addEventListener('change', applyFilters);

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedBrand = brandFilter.value;
        const maxPrice = priceRange.value;

        let filteredProducts = products;

   
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

     
        if (selectedBrand !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
        }

    
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);

        displayProducts(filteredProducts);
    }

  
    function displayProducts(products) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <p><strong>Brand:</strong> ${product.brand}</p>
            `;
            productGrid.appendChild(productCard);
        });
    }
});

    categories.forEach(category => {
        category.addEventListener('click', function (event) {
            event.preventDefault();
            const categoryName = this.getAttribute('data-category');
            displayProducts(categoryName);
        });
    });

    priceRange.addEventListener('input', function () {
        priceValue.textContent = `$${this.value}`;
        filterProductsByPrice(this.value);
    });

    function displayProducts(category) {
        productGrid.innerHTML = '';
        products[category].forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="images/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
            `;
            productGrid.appendChild(productCard);
        });
    }

    function filterProductsByPrice(maxPrice) {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const price = parseFloat(card.querySelector('p').textContent.replace('$', ''));
            if (price > maxPrice) {
                card.style.display = 'none';
            } else {
                card.style.display = 'block';
            }
        });
    }

    displayProducts('electronics');
;