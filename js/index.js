let productName = document.getElementById("productName");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let productCount = document.getElementById("productCount");
let productCategory = document.getElementById("productCategory");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let search = document.getElementById('search');


let productList;
let change = 'create';
let indexEle;
let searchMood = 'title';
console.log(productName);
// Local Storage
if (localStorage.getItem('productData') != null) {
    productList = JSON.parse(localStorage.getItem('productData'));
} else {
    productList = [];
}


//calcTotalPrice
function calcTotalPrice() {
    console.log('done');
    if (price.value != '') {
        let totalPrice = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = totalPrice;
        total.style.backgroundColor = "rgba(222, 105, 105, 0.74)";
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = "rgb(202, 16, 16)";
    }
}


price.addEventListener("keyup", function() {
    calcTotalPrice();
});
ads.addEventListener("keyup", function() { calcTotalPrice(); });
ads.addEventListener("keyup", function() {
    calcTotalPrice();
});
discount.addEventListener("keyup", function() {
    calcTotalPrice();
});
taxes.addEventListener("keyup", function() {
    calcTotalPrice();
});

// add product in object and push it in array
function addProduct() {
    let product = {
        title: productName.value,
        productPrice: price.value,
        productTax: taxes.value,
        productAds: ads.value,
        productDiscount: discount.value,
        category: productCategory.value,
        Count: productCount.value,
        result: total.innerHTML,
    };
    if (
        productName.value != "" &&
        price.value != "" &&
        productCategory.value != "" &&
        product.Count < 100
    ) {
        if (change == "create") {
            if (product.Count > 1) {
                for (let i = 0; i < product.Count; i++) {
                    productList.push(product);
                }
            } else {
                productList.push(product);
            }
        } else {
            productList[indexEle] = product;
            change = "create";
            submit.innerHTML = "create";
            productCount.style.display = "block";
            calcTotalPrice();
        }
    }

    console.log(productList);
    localStorage.setItem('productData', JSON.stringify(productList));
    clearData();
    calcTotalPrice();

    displayData();


}
submit.addEventListener('click', function() {
        addProduct();

    })
    // clear data
function clearData() {
    productName.value = '';
    productCount.value = '';
    productCategory.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = "";
    total.innerHTML = '';

}

function displayData() {
    let table = ``
    for (let i = 0; i < productList.length; i++) {
        table += `  <tr>
                    <td>${i}</td>
                    <td>${productList[i].title}</td>
                    <td>${productList[i].productPrice}</td>
                    <td>${productList[i].productTax}</td>
                    <td>${productList[i].productAds}</td>
                    <td>${productList[i].productDiscount}</td>
                    <td>${productList[i].result}</td>
                    <td>${productList[i].category}</td>
                    <td><button  onclick="updateProduct(${i})" id="update">Update</button> </td>
                    <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById("btnDeleteAll");

    if (productList.length > 0) {
        btnDeleteAll.innerHTML = `<button onclick="deleteAll()" id="delete">Delete All ${productList.length}</button>`;
    } else {
        btnDeleteAll.innerHTML = "";

    }


}
displayData();

function deleteProduct(i) {
    console.log(i);
    productList.splice(i, 1);
    localStorage.productData = JSON.stringify(productList);
    displayData();
}

function deleteAll() {
    localStorage.clear();
    productList.splice(0);

    displayData();
}

function updateProduct(i) {
    console.log(i);
    change = 'update'
    productName.value = productList[i].title;
    price.value = productList[i].productPrice;
    taxes.value = productList[i].productTax;
    ads.value = productList[i].productAds;
    discount.value = productList[i].productDiscount;
    productCount.style.display = 'none'
    productCategory.value = productList[i].category;
    calcTotalPrice();
    submit.innerHTML = 'Update';
    indexEle = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

function searchByMood(id) {
    console.log(id)
    if (id == "SearchByTitle") {
        searchMood = "title";

    } else {
        searchMood = "category";

    }
    search.focus;
    search.placeholder = "Search By " + searchMood;
    search.value = '';
    displayData();

}

function searchData(value) {
    let table = ``;
    for (let i = 0; i < productList.length; i++) {
        if ((searchMood == "title")) {
            console.log(`value is ${value}`);

            if (
                productList[i].title.toLowerCase().includes(value.toLowerCase())
            ) {
                table += `  <tr>
                    <td>${i}</td>
                    <td>${productList[i].title}</td>
                    <td>${productList[i].productPrice}</td>
                    <td>${productList[i].productTax}</td>
                    <td>${productList[i].productAds}</td>
                    <td>${productList[i].productDiscount}</td>
                    <td>${productList[i].result}</td>
                    <td>${productList[i].category}</td>
                    <td><button  onclick="updateProduct(${i})" id="update">Update</button> </td>
                    <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>
        `;
            }
        } else {
            console.log("category");
            if (
                productList[i].category.toLowerCase().includes(value.toLowerCase())
            ) {
                table += `  <tr>
                    <td>${i}</td>
                    <td>${productList[i].title}</td>
                    <td>${productList[i].productPrice}</td>
                    <td>${productList[i].productTax}</td>
                    <td>${productList[i].productAds}</td>
                    <td>${productList[i].productDiscount}</td>
                    <td>${productList[i].result}</td>
                    <td>${productList[i].category}</td>
                    <td><button  onclick="updateProduct(${i})" id="update">Update</button> </td>
                    <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>
        `;
            }
        }

    }
    document.getElementById("tbody").innerHTML = table;

}
search.addEventListener('keyup', function() {
    console.log('hi');
    searchData(search.value);
})