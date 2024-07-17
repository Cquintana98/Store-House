const productForm = document.getElementById('productForm');
const editProductButton = document.getElementById('edit');
const addProductButton = document.getElementById('submit');
const productsContainer = document.getElementById('card-container');
const searchInput = document.getElementById('searchInput');
const productName = document.getElementById('productName');
const productCategory = document.getElementById('productCategory');
const productPrice = document.getElementById('productPrice');
const productStock = document.getElementById('productStock');




document.addEventListener('DOMContentLoaded', () => {
    const products = obtenerLista();
    renderProducts(products);
    addProductButton.addEventListener('click', function () {
        addProduct();
    });
    editProductButton.addEventListener('click', function () {
        updateProduct(parseInt(editProductButton.value))
    });
});

function renderProducts(filteredProducts) {
    productsContainer.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('card');
        productCard.classList.add('my-3');
        productCard.classList.add('mx-5');
        productCard.classList.add('listed');
        productCard.innerHTML = `
            <div class="card-body">
    <h5 class="text-dark">${product.name}</h5>
    <h6 class="mb-2 text-secondary">${product.category}</h6>
    <p class="font-weight-bold text-success">$${product.price}</p>
    <p class="text-dark">Stock: ${product.stock}</p>
    <div class="d-flex justify-content-between">
        <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">
            Editar
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">
            Eliminar
        </button>
    </div>
</div>
        `;
        productsContainer.appendChild(productCard);
    });
}



function addProduct() {
    if (productName.value === '' || productCategory.value === '' || productPrice.value === '' || productStock.value === '') {
        alert('Todos los campos son obligatorios');
        alert('Fallo al agregar')
        return;
    }

    const newProduct = {
        name: productName.value,
        category: productCategory.value,
        price: productPrice.value,
        stock: productStock.value
    };
    const products = obtenerLista();
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    productForm.reset();
    productName.blur();
    renderProducts(obtenerLista());
        alert('Exito al agregar')
}

function editProduct(index) {
    const products = obtenerLista();
    const product = products[index];
    productName.value = product.name;
    productCategory.value = product.category;
    productPrice.value = product.price;
    productStock.value = product.stock;
    editProductButton.classList.remove('d-none');
    editProductButton.value = index;
    addProductButton.classList.add('d-none');
    window.scrollTo(0, 0);

}

function updateProduct(index) {
    if (productName.value === '' || productCategory.value === '' || productPrice.value === '' || productStock.value === '') {
        alert('Todos los campos son obligatorios');
        return;
    }
    const products = obtenerLista();
    products[index] = {
        name: productName.value,
        category: productCategory.value,
        price: productPrice.value,
        stock: productStock.value
    };
    localStorage.setItem('products', JSON.stringify(products));
    editProduct.classList.add('d-none');
    productForm.reset();

}

function deleteProduct(index) {
    const products = obtenerLista();
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts(obtenerLista());
}

function searchProducts() {
    const products = obtenerLista();
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
}
function obtenerLista() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

function instagram(){
    alert('Se redireccionara desde su instagram');
}
function twitter(){
    alert('Se redireccionara desde su twitter');
}