// implementasi class
class Product {
    constructor(data) {
        this.product_id = data.produt_id;
        this.description = data.description;
    }

    getDescriptionLength() {
        return this.description.length;
    }
}

// Asynchronous function untuk fetch data dari API
const getProducts = async () => {
    try {
        const response = await fetch(
            "https://6554347063cafc694fe63a4b.mockapi.io/api/v1/products"
        );

        // Cek apa response ok
        if (!response.ok) {
            throw new Error("Error fetching data");
        }

        let data = await response.json();
        return data;
    } catch (error) {
        // Handle kalo error
        console.error(error);
        return [];
    }
};
// call
getProducts().then((data) => {
    // store to local storage
    localStorage.setItem("products", JSON.stringify(data));
});

// get product detail
const getProductDetail = (productId, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.open(
        "GET",
        `https://6554347063cafc694fe63a4b.mockapi.io/api/v1/detailss/${productId}`,
        true
    );

    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            callback('success', data);
        } else {
            callback(new Error("Request failed with status " + xhr.status));
        }
    };

    xhr.onerror = function () {
        callback(new Error("Network error"));
    };

    xhr.send();
};

//call
getProductDetail(1, (info, data) => {
    const product = new Product(data);
    console.log(product.description);
});

let products = JSON.parse(localStorage.getItem("products")) ?? [];
let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

// hitung jumlah item yang ada di keranjang
let totalCartItem = cart.length;

// hitung total harga item yang ada di keranjang
let totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.price),
    0
);

// Fungsi untuk menambahkan item ke keranjang
function addToCart(productId) {
    // ambil data product
    let product = products.find((product) => product.id == productId);
    console.log(product);

    // cek item cart exist
    if (cart.length == 0) {
        cart.push(product);
    } else {
        let cartItemExist = cart.find((cartItem) => cartItem.id == productId);

        if (cartItemExist === undefined) {
            cart.push(product);
        }
    }

    // update local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // refresh data total
    totalPrice = cart.reduce(
        (total, item) => total + parseFloat(item.price),
        0
    );
    totalCartItem = cart.length;
}

// penggunaan variabel global untuk menghitung total + ongkos kirim
const shippingCost = 50;
let totalPriceShipping = totalPrice + shippingCost;

// fungsi untuk menghitung total harga setelah diskon dengan scope variabel
let getDiscountedTotalPrice = (discount) => {
    const couponDiscount = 20;
    return totalPriceShipping - discount - couponDiscount;
};

// coba diskon
let discountedTotalPrice = getDiscountedTotalPrice(20);

// checkout handler
const checkoutHandler = () => {
    alert(
        `Total yang harus di bayar : ${discountedTotalPrice}\n\nTerimakasih sudah checkout :)`
    );
};

console.log(`Jumlah Item di Keranjang : ${totalCartItem}`);
console.log(`Total harga item di keranjang : ${totalPrice}`);
console.log(`Total harga dengan ongkos kirim : ${totalPriceShipping}`);
console.log(`Total harga setelah diskon : ${discountedTotalPrice}`);
