// Asynchronous function untuk fetch data dari API
const getProducts = async () => {
    // Fetch data dari API
    const response = await fetch("https://6554347063cafc694fe63a4b.mockapi.io/api/v1/products");

    let data = await response.json();

    // store to local storage
    localStorage.setItem('products', JSON.stringify(data));
    return data;
};
// call
getProducts();

let products = JSON.parse(localStorage.getItem("products")) ?? [];
let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

// hitung jumlah item yang ada di keranjang
let totalCartItem = cart.length;

// hitung total harga item yang ada di keranjang
let totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);

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
    totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);
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
