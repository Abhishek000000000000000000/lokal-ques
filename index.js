function fetchProducts() {
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(error => console.error(error));
}

window.addEventListener('load', () => {
    fetchProducts();
});

const categoryFilterElement = document.getElementById("category-filter");
categoryFilterElement.addEventListener('change', function() {
    const selectedCategory = this.value;
    fetchProductsByCategory(selectedCategory);
});

const sortSelectElement = document.getElementById("sort-select");
sortSelectElement.addEventListener('change', function() {
    const selectedSortOption = this.value;
    const selectedCategory = categoryFilterElement.value;
    fetchProductsByCategory(selectedCategory, selectedSortOption);
});

function fetchProductsByCategory(category, sortBy) {
    let url = 'http://localhost:3000/products';

    // Append category parameter
    if (category !== 'all') {
        url += `?category=${category}`;
    }

    // Append sorting parameters using proper syntax for query parameters
    if (sortBy === 'lowToHigh') {
        url += `${category !== 'all' ? '&' : '?'}_sort=price&_order=asc`;
    } else if (sortBy === 'highToLow') {
        url += `${category !== 'all' ? '&' : '?'}_sort=price&_order=desc`;
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
        const words = product.description.split(' ');
        const shortDesc = words.slice(0,15).join(' ');

        const productCard = `
            <div class="card">
                <img src="${product.thumbnail}" alt="${product.name}">
                <div class="card-body">
                    <h3>${product.name}</h3>
                    <p>$ ${product.price}</p>
                    <p>${product.category}</p> 
                    <p>${shortDesc}</p> 
                    <a href="product.html?id=${product.id}">View Details</a>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}






