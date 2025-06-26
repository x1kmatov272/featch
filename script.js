let kartochki = document.querySelector('.kartochki');
let korzinka = document.querySelector('.korzinka');
let totalPrice = document.querySelector('.totalPrice');

let total = 0; // Общая сумма покупок

fetch('https://fakestoreapi.com/products?limit=10')
    .then(response => response.json())
    .then(data => {
        genaratorProduct(data);
    });

function genaratorProduct(product) {
    kartochki.innerHTML = '';
    product.forEach(element => {
        let shortDescription = element.description.slice(0, 100); // обрезаем описание
        let divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.innerHTML = `
            <img src="${element.image}" alt="" class="img">
            <h2 class="title">${element.title}</h2>
            <p class="description">${shortDescription}...</p>
            <p class="category"><span class="span">Категория:</span> ${element.category}</p>
            <p class="price">${element.price} $</p>
            <button class="btn" onclick="addProduct('${element.title}', '${element.price}')">Купить</button>
        `;
        kartochki.appendChild(divCard);
    });
}

function addProduct(title, price) {
    price = parseFloat(price); // Преобразуем цену в число
    total += price; // Добавляем к общей сумме

    // Создаем и добавляем товар в корзину
    let productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <h2 class="title">${title}</h2>
        <p class="price">${price.toFixed(2)} $</p>
    `;
    korzinka.appendChild(productDiv);

    // Обновляем отображение общей суммы
    totalPrice.innerHTML = '<p>Total: ${total.toFixed(2)} $</p>';
}