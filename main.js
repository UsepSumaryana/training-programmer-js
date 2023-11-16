const cartItems = [
    { name: "Mouse", price: 250000 },
    { name: "Keyboard", price: 300000 },
    { name: "Monitor", price: 1000000 },
];

let username = "usep";
let totalCartItem = cartItems.length;

// hitung total harga item yang ada di keranjang
let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

// pengen di format ke rupiah ah
let totalInRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
}).format(totalPrice);

console.log(`Username : ${username}`);
console.log(`Jumlah Item di Keranjang : ${totalCartItem}`);
console.log(`Total harga item di keranjang : ${totalInRupiah}`);
