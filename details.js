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

    const imagesCarouselItems = product.images.map((image, index) => {
        if (image) {
            return `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${image}" class="d-block w-100" alt="${product.name}">
                </div>
            `;
        } else {
            return '';
        }
    }).join('');

    const productDetailHTML = `
        <div class="card">
        <div id="product-images-carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            ${imagesCarouselItems}
        </div>
        <a class="carousel-control-prev" href="#product-images-carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#product-images-carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>

            <div class="card-body">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <p>${product.category}</p> 
                <p>${product.description}</p> 
            </div>
        </div>
    `;
    productDetail.innerHTML = productDetailHTML;
}