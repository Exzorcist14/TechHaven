/*-----------------------------------------------------------*/

var GPUs = [
    {
        type: "GPU",
        name: "RTX 3070 Ti",
        price: 65000,
        memoryCapacity: 8,
        memoryType: "GDDR6X",
        frequency: 1770,
        busBitDepth: 256
    },

    {
        type: "GPU",
        name: "GTX 1060 6GB",
        price: 22000,
        memoryCapacity: 6,
        memoryType: "GDDR5",
        frequency: 1505,
        busBitDepth: 192
    },

    {
        type: "GPU",
        name: "RTX 4060",
        price: 78000,
        memoryCapacity: 8,
        memoryType: "GDDR6",
        frequency: 2460,
        busBitDepth: 128
    },

    {
        type: "GPU",
        name: "GTX 1080 Ti",
        price: 38000,
        memoryCapacity: 11,
        memoryType: "GDDR5X",
        frequency: 1582,
        busBitDepth: 352
    },

    {
        type: "GPU",
        name: "RTX 2080 Ti",
        price: 40000,
        memoryCapacity: 8,
        memoryType: "GDDR6",
        frequency: 1830,
        busBitDepth: 256
    },

    {
        type: "GPU",
        name: "RX 7600",
        price: 33000,
        memoryCapacity: 8,
        memoryType: "GDDR6",
        frequency: 1720,
        busBitDepth: 128
    }
];

var CPUs = [
    {
        type: 'CPU',
        name: "Intel Core i7-11700F",
        price: 24000,
        cores: 8,
        socket: "LGA 1200",
        frequency: 2.5,
        TDP: 65
    },

    {
        type: 'CPU',
        name: "Intel Core i9-10900F",
        price: 34000,
        cores: 10,
        socket: "LGA 1200",
        frequency: 2.8,
        TDP: 65
    },

    {
        type: 'CPU',
        name: "AMD Ryzen 9 7900X",
        price: 46000,
        cores: 12,
        socket: "AM5",
        frequency: 4.7,
        TDP: 170
    },

    {
        type: 'CPU',
        name: "AMD Ryzen 7 5800X",
        price: 23000,
        cores: 8,
        socket: "AM4",
        frequency: 3.8,
        TDP: 105
    },

    {
        type: 'CPU',
        name: "Intel Core i5-10400F",
        price: 10500,
        cores: 6,
        socket: "LGA 1200",
        frequency: 2.9,
        TDP: 65
    }
];

var RAMs = [
    {
        type: 'RAM',
        name: "Kingston FURY Beast Black [KF426C16BB16]",
        price: 3999,
        memoryType: "DDR4",
        memoryCapacity: 16,
        frequency: 2666,
        formFactor: "DIMM",
        type: 'RAM'
    },

    {
        type: 'RAM',
        name: "Kingston FURY Beast Black RGB [KF426C16BBA16]",
        price: 4699,
        memoryType: "DDR5",
        memoryCapacity: 8,
        frequency: 5200,
        formFactor: "DIMM"
    },

    {
        type: 'RAM',
        name: "Kingston FURY Beast Black RGB [KF552C40BBA-8]",
        price: 4399,
        memoryType: "DDR4",
        memoryCapacity: 16,
        frequency: 2666,
        formFactor: "DIMM"
    }
];

var catalog = JSON.parse(localStorage.getItem('catalog'));

cart = {
    selectedProducts: [],
    totalAmount: 0,
    totalQuantity: 0,
}

function updateCartDisplay() {
    var container = document.querySelector(".cart-items-container");
    container.innerHTML = "";

    for (let product of cart.selectedProducts) {
        container.innerHTML += `    
            <div class="cart-item" id="${cart.selectedProducts.indexOf(product)}">
                <img src="img/catalog/${product.type == "GPU" ? 'GPU' : (product.type == "CPU" ? 'CPU' : 'RAM')}/${product.name}.png" width="150" height="150">
                <p class="name">${product.name}</p>
    
                <div class="quantity-container">
                  <button class="minus" onclick="decreaseQuantity('${product.name}')">
                    <img src="img/cart/minus.png" width="28px" height="28px">
                  </button>
    
                  <p class="quantity">${product.quantity}</p>
    
                  <button class="plus" onclick="increaseQuantity('${product.name}')">
                    <img src="img/cart/plus.png" width="25px" height="25px">
                  </button>
                </div>
    
                <div class="delete">
                  <button onclick="deleteInCart('${product.name}')">
                    <img src="img/cart/delete.png" width="30px" height="30px">
                  </button>
                  
                </div>
    
                <div class="price">
                  <p>${formatPrice(product.price * product.quantity)}</p>
                </div>
   
              </div>
            `;
    }

    container = document.querySelector(".total-amount");
    container.innerHTML = `Всего: ${formatPrice(cart.totalAmount)}`;

    container = document.querySelector(".total-quantity");
    container.innerHTML = `Товаров: ${cart.totalQuantity}`;
}

function addToCart(name) {
    var index = findIndexInCart(name);

    if (index == -1) {
        index = findIndexInCatalog(name);
        cart.selectedProducts.unshift(catalog.products[index]);
        cart.selectedProducts[0].quantity = 1;

        cart.totalAmount += cart.selectedProducts[0].price;
        cart.totalQuantity++;
    }

    else {
        increaseQuantity(name);
    }

    updateCartDisplay();
}

function increaseQuantity(name) {
    var index = findIndexInCart(name);

    cart.selectedProducts[index].quantity += 1;
    cart.totalAmount += cart.selectedProducts[index].price;
    cart.totalQuantity++;

    updateCartDisplay();
}

function decreaseQuantity(name) {
    var index = findIndexInCart(name);

    if (cart.selectedProducts[index].quantity > 1) {
        cart.selectedProducts[index].quantity -= 1;

        cart.totalAmount -= cart.selectedProducts[index].price;
        cart.totalQuantity--;
    }

    else {
        deleteInCart(name);
    }

    updateCartDisplay();
}

function deleteInCart(name) {
    id = findIndexInCart(name);

    cart.totalAmount -= cart.selectedProducts[id].price * cart.selectedProducts[id].quantity;
    cart.totalQuantity -= cart.selectedProducts[id].quantity;
    cart.selectedProducts.splice(id, 1);

    updateCartDisplay();
}

function clearCart() {
    cart = {
        selectedProducts: [],
        totalAmount: 0,
        totalQuantity: 0
    }

    updateCartDisplay();
}

/*-----------------------------------------------------------*/

function findIndexInCatalog(name) {
    for (let i = 0; i < catalog.products.length; i++) {
        if (catalog.products[i].name == name) {
            return i;
        }
    }

    return -1;
}

function findIndexInCart(name) {
    for (let i = 0; i < cart.selectedProducts.length; i++) {
        if (cart.selectedProducts[i].name == name) {
            return i;
        }
    }

    return -1;
}

function formatPrice(price) {
    if (price == 0) {
        return "0 ₽"
    }

    else {
        let pass = 0;
        let result = "";

        while (price > 0) {
            if (pass == 3) {
                result += " ";
                pass = 0;
            }

            result += price % 10;
            price = Math.floor(price / 10);

            pass++;
        }

        result = result.split('').reverse().join('');

        result += " ₽";

        return result;
    }
}