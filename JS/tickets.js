const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const ticketName = button.dataset.name;
    const ticketPrice = Number(button.dataset.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingTicket = cart.find((item) => item.name === ticketName);

    if (existingTicket) {
      existingTicket.quantity += 1;
    } else {
      cart.push({
        name: ticketName,
        price: ticketPrice,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();

    button.textContent = "Added";

    setTimeout(() => {
      button.textContent = "Add to cart";
    }, 1000);
  });
});
