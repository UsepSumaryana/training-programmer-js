const cartItems = [
    { name: "Mouse", price: 250000 },
    { name: "Keyboard", price: 300000 },
    { name: "Monitor", price: 1000000 },
];

let username = "usep";
let totalCartItem = cartItems.length;

let totalPrice = 0;

// hitung total harga yang ada di keranjang
for (const item of cartItems) {
    totalPrice += item.price;
}

// pengen di format ke rupiah ah
let totalInRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
}).format(totalPrice);

console.log(`Username : ${username}`);
console.log(`Jumlah Item di Keranjang : ${totalCartItem}`);
console.log(`Total harga item di keranjang : ${totalInRupiah}`);
