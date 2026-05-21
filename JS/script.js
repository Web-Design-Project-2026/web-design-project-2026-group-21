function updateCartBadge() {
  const cartBadge = document.getElementById("cart-badge");

  if (!cartBadge) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let count = 0;

  cart.forEach((item) => {
    count += item.quantity;
  });

  cartBadge.textContent = count;

  if (count > 0) {
    cartBadge.style.display = "flex";
  } else {
    cartBadge.style.display = "none";
  }
}

updateCartBadge();
