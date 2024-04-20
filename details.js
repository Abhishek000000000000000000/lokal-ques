const urlParams = new URLSearchParams(window.location.search);
const proIdtype = urlParams.get('id');
const productId = parseInt(proIdtype, 10); // Parse as integer with base 10
console.log(typeof(productId));
console.log(productId);

if(productId){
    fetch(`http://localhost:3000/products/${productId}`)
    .then(res => res.json())
    .then(product => {
        displayDetails(product);
    })
    .catch(error => console.log(error));
}

function displayDetails(product){
    const productDetail = document.getElementById("product-detail");

    const imagesHTML = product.images.map(image => {
        if (image) {
            return `<img src="${image}" alt="${product.name}">`;
        } else {
            return '';
        }
    }).join('');

    const productDetailHTML = `
        <div class="card">
        <img src="${product.thumbnail}" alt="${product.name}">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <p>${product.category}</p> 
                <p>${product.description}</p> 
                <div class="product-images">
                ${imagesHTML}
            </div>
            </div>
        </div>
    `;
    productDetail.innerHTML = productDetailHTML;
}