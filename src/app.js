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
      // console.log(newItem);
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

// Form Validation Checkout Detail
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }

  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// Send data when checkout button clicked
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // console.log(objData)

  // Whatshapp Message
  // const message = formatMessage(objData);
  // window.open('http://wa.me/YOUR_PHONE_NUMBER?text=' + encodeURIComponent(message))

  // Midtrans - Get Transction Token with Ajax/Fetch
  try {
    const response = await fetch('php/placeOrder.php', {
      method: "POST",
      body: data,
    });

    const token = await response.text();
    console.log(token);
    console.log('TEST token')
    window.snap.pay(token);
  } catch (err) {
    console.log(err.message);
  }
});

// Format Mesagge Whatshap
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No.HP: ${obj.phone}
    
  Data Support
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
  )}
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih.`;
};

// Convertion Currency IDR
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
