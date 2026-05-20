const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const emptyCartMessage = document.getElementById("empty-cart-message");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutMessage = document.getElementById("checkout-message");

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";
  }

  cartItemsContainer.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
        <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>June 15th 2026</p>
            <p>Jönköping Science Park</p>
        </div>

    <p class="cart-price">${item.price} SEK </p>

    <div class="cart-quantity">
        <button class="minus-btn" data-name="${item.name}">-</button>
        <span class="quantity-number">${item.quantity}</span>
        <button class="plus-btn" data-name="${item.name}">+</button>
    </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartCount.textContent = count;
  cartTotal.textContent = total + " SEK";

  addQuantityButtonEvents();
}
function addQuantityButtonEvents() {
  const plusButtons = document.querySelectorAll(".plus-btn");
  const minusButtons = document.querySelectorAll(".minus-btn");

  plusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateQuantity(button.dataset.name, 1);
    });
  });
  minusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateQuantity(button.dataset.name, -1);
    });
  });
}

function updateQuantity(ticketName, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const ticket = cart.find((item) => item.name === ticketName);

  if (!ticket) return;

  ticket.quantity += change;

  if (ticket.quantity <= 0) {
    cart = cart.filter((item) => item.name !== ticketName);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

checkoutBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    checkoutMessage.textContent = "";
    return;
  }

  localStorage.removeItem("cart");
  checkoutMessage.textContent = "Thank you! Your order has been placed.";

  renderCart();
});

renderCart();
