const cartItems = [
    { name: "Mouse", price: 250000 },
    { name: "Keyboard", price: 300000 },
    { name: "Monitor", price: 1000000 },
];

let username = "usep";
let totalCartItem = cartItems.length;

// hitung total harga item yang ada di keranjang
let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

// Fungsi untuk menambahkan item ke keranjang
function addToCart(name, price) {
    const newItem = {
        name: name,
        price: price,
    };

    cartItems.push(newItem);

    // refresh data total
    totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    totalCartItem = cartItems.length;
}

// nyoba panggil
addToCart("Headset", 150000);

console.log(`Username : ${username}`);
console.log(`Jumlah Item di Keranjang : ${totalCartItem}`);
console.log(`Total harga item di keranjang : ${totalPrice}`);
