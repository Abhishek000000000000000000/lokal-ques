function fetchProducts() {
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(error => console.error(error));
}

window.addEventListener('load', () => {
    fetchProducts();
});

// Add event listener for category filter
// Function to fetch products based on category and price sorting
const categoryFilterElement = document.getElementById("category-filter");
categoryFilterElement.addEventListener('change', function() {
    const selectedCategory = this.value;
    fetchProductsByCategory(selectedCategory);
});

// Add event listener for sorting
const sortSelectElement = document.getElementById("sort-select");
sortSelectElement.addEventListener('change', function() {
    const selectedSortOption = this.value;
    const selectedCategory = categoryFilterElement.value;
    fetchProductsByCategory(selectedCategory, selectedSortOption);
});


function fetchProductsByCategory(category) {
    let url = 'http://localhost:3000/products';
    if (category !== 'all') {
        url += `?category=${category}`;
    }

    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(error => console.error(error));
}

function displayData(products){
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const word = product.description.split('');
        const shortDesc = word.slice(0, 15).join('');

        const productCard = `
            <div class="card">
                <img src="${product.thumbnail}" alt="${product.name}">
                <div class="card-body">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <p>${product.category}</p> 
                    <p>${shortDesc}</p> 
                    <a href="product.html?id=${product.id}">View Details</a>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}






