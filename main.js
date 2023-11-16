const products = [
    { id: 1, name: "Mouse", price: 250000 },
    { id: 2, name: "Keyboard", price: 300000 },
    { id: 3, name: "Monitor", price: 1000000 },
]

let cart = JSON.parse(localStorage.getItem('cart')) ?? [];

// hitung jumlah item yang ada di keranjang
let totalCartItem = cart.length;

// hitung total harga item yang ada di keranjang
let totalPrice = cart.reduce((total, item) => total + item.price, 0);

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
    localStorage.setItem('cart', JSON.stringify(cart));

    // refresh data total
    totalPrice = cart.reduce((total, item) => total + item.price, 0);
    totalCartItem = cart.length;
}

// fungsi untuk menghitung total harga setelah diskon
let getDiscountedTotalPrice = (discount) => totalPrice - discount;

// coba diskon
let discountedTotalPrice = getDiscountedTotalPrice(200000);

console.log(`Jumlah Item di Keranjang : ${totalCartItem}`);
console.log(`Total harga item di keranjang : ${totalPrice}`);
console.log(`Total harga setelah diskon : ${discountedTotalPrice}`);
