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

var catalog = {
    products: GPUs,
    type: "GPUs"
};

var filteredProducts = [];

/*-----------------------------------------------------------*/

function updateCatalog() {
    localStorage.setItem('catalog', JSON.stringify(catalog));
}

updateCatalog();

/*-----------------------------------------------------------*/

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

function updateCatalogDisplay(products) {
    var container = document.querySelector(".catalog");
    container.innerHTML = "";

    if (catalog.type == "GPUs") {
        for (let product of products) {
            container.innerHTML += `    
            <div class="catalog-item" id="${products.indexOf(product)}">
                <img src="img/catalog/GPU/${product.name}.png" width="150" height="150">
                <p class="name">${product.name}</p>
    
                <div class="specifications">
                  <p>Объём видеопамяти: ${product.memoryCapacity} ГБ</p>
                  <p>Тип памяти: ${product.memoryType}</p>
                  <p>Частота графического процессора: ${product.frequency} МГц</p>
                  <p>Разрядность шины видеопамяти: ${product.busBitDepth} бит</p>
                </div>
    
                <div class="purchase">
                  <p>${formatPrice(product.price)}</p>
    
                  <button onclick="addToCart('${product.name}')">Купить</button>
                </div>
            </div>
        `;
        }

        container.innerHTML += `
            <div class="control">
                <div class="sort">
                    <button onclick="setDefault('default', catalog.products)">
                        <img src="img/catalog/sort/default.png" width="28px" height="28px">
                    </button>
            
                    <button onclick="descendingSort('default', catalog.products)">
                        <img src="img/catalog/sort/descending.png" width="28px" height="28px">
                    </button>
            
                    <button onclick="ascendingSort('default', catalog.products)">
                        <img src="img/catalog/sort/ascending.png" width="28px" height="28px">
                    </button>
                </div>
           
                <form class="form" id="filterForm">
                    <div>
                        <label for="number1">От:</label>
                        <input type="number" id="number1" name="number1" required>
                    </div>
                    
                    <div>
                        <label for="number2">До:</label>
                        <input type="number" id="number2" name="number2" required>
                    </div>
    
                    
    
                    <button type="button" onclick="getNumbers()">Фильтровать по цене</button>
                </form>
            </div>
        `;
    }

    else if (catalog.type == "CPUs") {
        for (let product of products) {
            container.innerHTML += `    
                <div class="catalog-item" id="${products.indexOf(product)}">
                    <img src="img/catalog/CPU/${product.name}.png" width="150" height="150">
                    <p class="name">${product.name}</p>
        
                    <div class="specifications">
                      <p>Ядер: ${product.cores}</p>
                      <p>Сокет: ${product.socket}</p>
                      <p>Частота процессора: ${product.frequency} ГГц</p>
                      <p>Тепловыделение: ${product.TDP} Вт</p>
                    </div>
        
                    <div class="purchase">
                      <p>${formatPrice(product.price)}</p>
        
                      <button onclick="addToCart('${product.name}')">Купить</button>
                    </div>
                </div>
            `;
        }

        container.innerHTML += `
            <div class="control">
                <div class="sort">
                    <button onclick="setDefault('default', catalog.products)">
                        <img src="img/catalog/sort/default.png" width="28px" height="28px">
                    </button>
            
                    <button onclick="descendingSort('default', catalog.products)">
                        <img src="img/catalog/sort/descending.png" width="28px" height="28px">
                    </button>
            
                    <button onclick="ascendingSort('default', catalog.products)">
                        <img src="img/catalog/sort/ascending.png" width="28px" height="28px">
                    </button>
                </div>
           
                <form class="form" id="filterForm">
                    <div>
                        <label for="number1">От:</label>
                        <input type="number" id="number1" name="number1" required>
                    </div>
                    
                    <div>
                        <label for="number2">До:</label>
                        <input type="number" id="number2" name="number2" required>
                    </div>
    
                    <button type="button" onclick="getNumbers()">Фильтровать по цене</button>
                </form>
            </div>
        `;
    }

    else if (catalog.type == "RAMs") {
        for (let product of products) {
            container.innerHTML += `    
                <div class="catalog-item" id="${products.indexOf(product)}">
                    <img src="img/catalog/RAM/${product.name}.png" width="150" height="150">
                    <p class="name">${product.name}</p>
        
                    <div class="specifications">
                      <p>Объём памяти: ${product.memoryCapacity} ГБ</p>
                      <p>Тип памяти: ${product.memoryType}</p>
                      <p>Частота ОЗУ: ${product.frequency} МГц</p>
                      <p>Форм-фактор: ${product.formFactor}</p>
                    </div>
        
                    <div class="purchase">
                      <p>${formatPrice(product.price)}</p>
        
                      <button onclick="addToCart('${product.name}')">Купить</button>
                    </div>
                </div>
            `;
        }

        container.innerHTML += `
            <div class="control">
                <div class="sort">
                    <button onclick="setDefault('default', catalog.products)">
                        <img src="img/catalog/sort/default.png" width="28px" height="28px">
                    </button>
            
                    <button onclick="descendingSort('default', catalog.products)">
                        <img src="img/catalog/sort/descending.png" width="28px" height="28px">
                    </button>
            
                    <button onclick="ascendingSort('default', catalog.products)">
                        <img src="img/catalog/sort/ascending.png" width="28px" height="28px">
                    </button>
                </div>
           
                <form class="form" id="filterForm">
                    <div>
                        <label for="number1">От:</label>
                        <input type="number" id="number1" name="number1" required>
                    </div>
                    
                    <div>
                        <label for="number2">До:</label>
                        <input type="number" id="number2" name="number2" required>
                    </div>
    
                    <button type="button" onclick="getNumbers()">Фильтровать по цене</button>
                </form>
            </div>
        `;
    }
}

updateCatalogDisplay(GPUs);

/*-----------------------------------------------------------*/

function setDefault(mode, products) {
    if (mode == 'default') {
        updateCatalogDisplay(products);
    }

    else {
        updateFilteredCatalogDisplay(products);
    }
}

function descendingSort(mode, products) {
    var descendingProducts = products.slice();

    for (let i = 0; i < descendingProducts.length - 1; i++) {
        for (let j = 0; j < descendingProducts.length - 1 - i; j++) {
            if (descendingProducts[j].price < descendingProducts[j + 1].price) {
                const temp = descendingProducts[j];
                descendingProducts[j] = descendingProducts[j + 1];
                descendingProducts[j + 1] = temp;
            }
        }
    }

    if (mode == 'default') {
        updateCatalogDisplay(descendingProducts);
    }

    else {
        updateFilteredCatalogDisplay(descendingProducts);
    }
}

function ascendingSort(mode, products) {
    var ascendingProducts = products.slice();

    for (let i = 0; i < ascendingProducts.length - 1; i++) {
        for (let j = 0; j < ascendingProducts.length - 1 - i; j++) {
            if (ascendingProducts[j].price > ascendingProducts[j + 1].price) {
                const temp = ascendingProducts[j];
                ascendingProducts[j] = ascendingProducts[j + 1];
                ascendingProducts[j + 1] = temp;
            }
        }
    }

    if (mode == 'default') {
        updateCatalogDisplay(ascendingProducts);
    }

    else {
        updateFilteredCatalogDisplay(ascendingProducts);
    }
}

/*-----------------------------------------------------------*/

function getNumbers() {
    var number1 = document.getElementById('number1').value;
    var number2 = document.getElementById('number2').value;

    if (number1 !== '' && number2 !== '') {
        filterProducts(catalog.products, Number(number1), Number(number2));
    }
}

function filterProducts(products, min, max) {
    filteredProducts = [];

    for (let product of products) {
        if (product.price >= min && product.price <= max) {
            filteredProducts.push(product);
        }
    }

    updateFilteredCatalogDisplay(filteredProducts);
}

function updateFilteredCatalogDisplay(filteredProducts) {
    var container = document.querySelector(".main");
    var section = document.querySelector(".filtered-catalog")

    if (filteredProducts.length > 0) {
        if (section == undefined) {
            container.innerHTML += ` 
                <section>
                    <div class="filtered-catalog">
                        <h2 align="center">Отфильтрованный каталог</h2>
                    </div>
                </section>
            `;

            section = document.querySelector(".filtered-catalog");
        }

        else {
            section.innerHTML = ` 
                <div class="filtered-catalog">
                    <h2 align="center">Отфильтрованный каталог</h2>
                </div>
            `;
        }

        if (catalog.type == "GPUs") {
            for (let product of filteredProducts) {
                section.innerHTML += `    
                    <div class="catalog-item" id="${filteredProducts.indexOf(product)}">
                        <img src="img/catalog/GPU/${product.name}.png" width="150" height="150">
                        <p class="name">${product.name}</p>
            
                        <div class="specifications">
                          <p>Объём видеопамяти: ${product.memoryCapacity} ГБ</p>
                          <p>Тип памяти: ${product.memoryType}</p>
                          <p>Частота графического процессора: ${product.frequency} МГц</p>
                          <p>Разрядность шины видеопамяти: ${product.busBitDepth} бит</p>
                        </div>
            
                        <div class="purchase">
                          <p>${formatPrice(product.price)}</p>
            
                          <button onclick="addToCart('${product.name}')">Купить</button>
                        </div>
                    </div>
                `;
            }

            section.innerHTML += `
                <div class="control">
                    <div class="sort">
                        <button onclick="setDefault('filtered', filteredProducts)">
                            <img src="img/catalog/sort/default.png" width="28px" height="28px">
                        </button>
                
                        <button onclick="descendingSort('filtered', filteredProducts)">
                            <img src="img/catalog/sort/descending.png" width="28px" height="28px">
                        </button>
                
                        <button onclick="ascendingSort('filtered', filteredProducts)">
                            <img src="img/catalog/sort/ascending.png" width="28px" height="28px">
                        </button>
                    </div>
                </div>
              `;
        }

        else if (catalog.type == "CPUs") {
            for (let product of filteredProducts) {
                section.innerHTML += `    
                    <div class="catalog-item" id="${filteredProducts.indexOf(product)}">
                        <img src="img/catalog/CPU/${product.name}.png" width="150" height="150">
                        <p class="name">${product.name}</p>
            
                        <div class="specifications">
                          <p>Ядер: ${product.cores}</p>
                          <p>Сокет: ${product.socket}</p>
                          <p>Частота процессора: ${product.frequency} ГГц</p>
                          <p>Тепловыделение: ${product.TDP} Вт</p>
                        </div>
            
                        <div class="purchase">
                          <p>${formatPrice(product.price)}</p>
            
                          <button onclick="addToCart('${product.name}')">Купить</button>
                        </div>
                    </div>
                `;
            }

            section.innerHTML += `
                <div class="control">
                    <div class="sort">
                        <button onclick="setDefault('filtered', filteredProducts)">
                            <img src="img/catalog/sort/default.png" width="28px" height="28px">
                        </button>
                
                        <button onclick="descendingSort('filtered', filteredProducts)">
                            <img src="img/catalog/sort/descending.png" width="28px" height="28px">
                        </button>
                
                        <button onclick="ascendingSort('filtered', filteredProducts)">
                            <img src="img/catalog/sort/ascending.png" width="28px" height="28px">
                        </button>
                    </div>
                </div>
              `;
        }

        else if (catalog.type == "RAMs") {
            for (let product of filteredProducts) {
                section.innerHTML += `    
                    <div class="catalog-item" id="${filteredProducts.indexOf(product)}">
                        <img src="img/catalog/RAM/${product.name}.png" width="150" height="150">
                        <p class="name">${product.name}</p>
            
                        <div class="specifications">
                          <p>Объём памяти: ${product.memoryCapacity} ГБ</p>
                          <p>Тип памяти: ${product.memoryType}</p>
                          <p>Частота ОЗУ: ${product.frequency} МГц</p>
                          <p>Форм-фактор: ${product.formFactor}</p>
                        </div>
            
                        <div class="purchase">
                          <p>${formatPrice(product.price)}</p>
            
                          <button onclick="addToCart('${product.name}')">Купить</button>
                        </div>
                    </div>
                `;
            }

            section.innerHTML += `
                <div class="control">
                    <div class="sort">
                        <button onclick="setDefault('filtered', filteredProducts)">
                            <img src="img/catalog/sort/default.png" width="28px" height="28px">
                        </button>
                
                        <button onclick="descendingSort('filtered', filteredProducts)">
                            <img src="img/catalog/sort/descending.png" width="28px" height="28px">
                        </button>
                
                        <button onclick="ascendingSort('filtered', filteredProducts)">
                            <img src="img/catalog/sort/ascending.png" width="28px" height="28px">
                        </button>
                    </div>
                </div>
              `;
        }
    }

    else if (section != undefined) {
        container.removeChild(container.lastChild);
    }
}

/*-----------------------------------------------------------*/

function setGPU() {
    catalog.products = [];

    for (let i = 0; i < GPUs.length; i++) {
        catalog.products[i] = GPUs[i];
    }

    catalog.type = "GPUs";

    updateCatalog();
    updateCatalogDisplay(catalog.products);
}

function setCPU() {
    catalog.products = [];

    for (let i = 0; i < CPUs.length; i++) {
        catalog.products[i] = CPUs[i];
    }

    catalog.type = "CPUs";

    updateCatalog();
    updateCatalogDisplay(catalog.products);
}

function setRAM() {
    catalog.products = [];

    for (let i = 0; i < RAMs.length; i++) {
        catalog.products[i] = RAMs[i];
    }

    catalog.type = "RAMs";

    updateCatalog();
    updateCatalogDisplay(catalog.products);
}

/*-----------------------------------------------------------*/