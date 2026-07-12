/*
Loop methods for data-base

const students = [
    {name:"Ali", marks:85},
    {name:"Sara", marks:92},
    {name:"Ahmed", marks:45},
    {name:"Hamza", marks:67}
];

//for...of → Print all names.
console.log("--- for...of ---");
for (const student of students) {
    console.log(student.name);
}

// forEach() → Print Name - Marks.
console.log("\n--- forEach() ---");
students.forEach(student => {
    console.log(`${student.name} : ${student.marks}`);
})

// map() → Create an array of names.
console.log("\n--- map() ---");
let newArray = students.map(student => student.name)
console.log(newArray.join(" ,"))

// filter() → Students with marks ≥ 50.
console.log("\n--- filter() ---");
const pass  = students.filter(student => student.marks>=50)
console.log(pass);

// find() → First student with marks > 90.
console.log("\n--- find() ---");
const toper = students.find(toper => toper.marks>90)
console.log(toper)

// findIndex() → Index of "Ahmed".
console.log("\n--- findIndex() ---");
var index = students.findIndex(index => index.name=="Ahmed")
console.log(index)

// reduce() → Calculate the total marks.
console.log("\n--- reduce() ---");
var marks = students.map(student=>student.marks)
var sum = marks.reduce((acc,curr)=>{
    return acc+curr;
})
console.log(`Total marks: ${sum}`)
*/

// Product Database
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000
  },
  {
    id: 2,
    name: "Phone",
    price: 30000
  },
  {
    id: 3,
    name: "Headphones",
    price: 5000
  },
  {
    id: 4,
    name: "Keyboard",
    price: 2000
  },
  {
    id: 5,
    name: "Mouse",
    price: 1000
  },
  {
    id: 6,
    name: "Monitor",
    price: 15000
  }
];


let cart = [];


window.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  document.querySelector('.cart').addEventListener('click', showCart);
});


function renderProducts() {
  const items = document.querySelector(".items");
  items.innerHTML = products.map(product => {
    return `
      <div class='card'>
        <div class='item'>
          ${product.name} 
          <p>Price: $<span class='price'>${product.price}</span></p>
        </div>
        <button onclick='addItem(${product.id})'>Add Item</button>
      </div>
    `;
  }).join(" ");
}


function addItem(productId) {
  const product = products.find(p => p.id === productId);
  
  if (product) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      
      existingItem.quantity += 1;
    } else {
    
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
    
    updateCartBadge();
    console.log("Item added to cart:", product.name);
    console.log("Current cart:", cart);
  }
}


function updateCartBadge() {
  const cartIcon = document.querySelector('.cart');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  

  let badge = cartIcon.querySelector('.cart-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'cart-badge';
    cartIcon.appendChild(badge);
  }
  badge.textContent = totalItems;
}


function showCart() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Calculate total price
  const totalPrice = calculateTotalPrice();
  

  let cartHTML = `
    <div class='cart-modal'>
      <div class='cart-content'>
        <h2>Shopping Cart</h2>
        <table class='cart-table'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  `;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    cartHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>
          <button onclick='updateQuantity(${item.id}, -1)' class='qty-btn'>-</button>
          <span class='qty-display'>${item.quantity}</span>
          <button onclick='updateQuantity(${item.id}, 1)' class='qty-btn'>+</button>
        </td>
        <td>$${itemTotal}</td>
        <td>
          <button onclick='removeItem(${item.id})' class='remove-btn'>Remove</button>
        </td>
      </tr>
    `;
  });

  cartHTML += `
          </tbody>
        </table>
        <div class='cart-summary'>
          <h3>Total Price: $<span id='total-price'>${totalPrice}</span></h3>
        </div>
        <button onclick='closeCart()' class='close-btn'>Close</button>
        <button onclick='checkout()' class='checkout-btn'>Checkout</button>
      </div>
    </div>
  `;


  let modal = document.getElementById('cart-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cart-modal';
    document.body.appendChild(modal);
  }
  
  modal.innerHTML = cartHTML;
  modal.style.display = 'block';
}


function calculateTotalPrice() {
  return cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}


function updateQuantity(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    updateCartBadge();
    showCart();
  }
}

// Remove Item from Cart
function removeItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartBadge();
  
  if (cart.length === 0) {
    closeCart();
    alert("Item removed! Your cart is now empty.");
  } else {
    showCart(); 
  }
}


function closeCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}


function checkout() {
  const totalPrice = calculateTotalPrice();
  alert(`Checkout successful! Total amount: $${totalPrice}\nThank you for your purchase!`);
  cart = []; // Clear cart
  updateCartBadge();
  closeCart();
}
document.addEventListener('click', (e) => {
  const modal = document.getElementById('cart-modal');
  if (modal && e.target === modal) {
    closeCart();
  }
});