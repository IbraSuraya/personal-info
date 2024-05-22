document.addEventListener("alpine:init", () => {
  Alpine.data("support", () => ({
    items: [
      {
        id: 1,
        name: "Level 1",
        img: "level-1.jpg",
        price: 25000 * 1,
      },
      {
        id: 2,
        name: "Level 2",
        img: "level-2.jpg",
        price: 25000 * 2,
      },
      {
        id: 3,
        name: "Level 3",
        img: "level-3.jpg",
        price: 25000 * 3,
      },
      {
        id: 4,
        name: "Level 4",
        img: "level-4.jpg",
        price: 25000 * 4,
      },
      {
        id: 5,
        name: "Level 5",
        img: "level-5.jpg",
        price: 25000 * 5,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // check same support
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // if cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika support sudah ada, cek apakah support beda atau saam dengan yang di cart
        this.items = this.items.map((item) => {
          // jika support berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika suppor sudah ada, add quantity and total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
      console.log(newItem);
    },
    remove(id) {
      // get item yang mau diremove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // if item lebih dari 1
      if (cartItem.quantity > 1) {
        // explore one by one
        this.items = this.items.map((item) => {
          // if bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // if barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Convertion Currency IDR
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
