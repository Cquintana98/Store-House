const productsContainer = document.getElementById('card-container');
const searchInput = document.getElementById('searchInput');
const paginacion = document.getElementById('paginacion');
const elementosPagina = paginacion.getElementsByClassName('page-item');

document.addEventListener('DOMContentLoaded', ()=> {
    const product = optenerlista();

    getPageNumber(product);
});

function renderProducts(filteredProducts) {
    filteredProducts.sort(function(a, b) {
        let nombreA = a.name.toLowerCase();
        let nombreB = b.name.toLowerCase();
    
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    });
    productsContainer.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('card');
        productCard.classList.add('mx-3');
        productCard.classList.add('my-5');
        productCard.classList.add('elem');
                productCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${product.category}</h6>
                <p class="card-text">$${product.price}</p>
                 <p class="card-stock">${product.stock}</p>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

function optenerlista(){
    return JSON.parse(localStorage.getItem('products')) || [];
}


function getPageNumber(products){
    const pageNumber = Math.ceil(products.length / 4);
    for (let index = 1; index <=pageNumber; index++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.textContent = index;
        a.onclick = function() {
          seleccionarPagina(index);
        };

        li.appendChild(a);
        paginacion.appendChild(li);
      }
    const listapag = products.slice(0, 4);
    renderProducts(listapag);
    elementosPagina[0].classList.add('active')
}
function seleccionarPagina(index){
    for (let i = 0; i < elementosPagina.length; i++) {
        if (elementosPagina[i].classList.contains('active')) {
          const numeroPagina = elementosPagina[i]
            numeroPagina.classList.remove('active')
        }
      } 
      elementosPagina[index-1].classList.add('active')
      const products = optenerlista();
      const rango = (index*4)-4;
      const listapag = products.slice(rango,(rango+4));
      renderProducts(listapag);

}



function instagram(){
    alert('Se redireccionara desde su instagram');
}
function twitter(){
    alert('Se redireccionara desde su twitter');
}