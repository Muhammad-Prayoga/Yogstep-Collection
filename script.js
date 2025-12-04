document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".footer-header").forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector(".toggle-icon");

      content.classList.toggle("active");
      icon.textContent = content.classList.contains("active") ? "-" : "+";
    });
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 20) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".fade, .scroll-anim, .scroll-left, .scroll-right"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon");
  const cartSidebar = document.querySelector(".cart-sidebar");
  const closeCart = document.getElementById("closeCart");
  const cartBackdrop = document.getElementById("cartBackdrop");

  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // OPEN CART
  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartBackdrop.classList.add("active");
  });

  // CLOSE CART
  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartBackdrop.classList.remove("active");
  });

  cartBackdrop.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartBackdrop.classList.remove("active");
  });

  // UPDATE UI
  function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;
    let totalQuantity = 0;

    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="${item.image}">
        <div class="cart-info">
            <h4>${item.name}</h4>
            <p>Rp ${item.price.toLocaleString()}</p>
            <div class="qty">
                <button class="minus" data-index="${index}">−</button>
                <span>${item.quantity}</span>
                <button class="plus" data-index="${index}">+</button>
            </div>
        </div>
        <span class="remove" data-index="${index}">×</span>
      `;

      cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = "Rp " + totalPrice.toLocaleString();
    cartCount.textContent = totalQuantity;

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ADD TO CART
  window.addToCart = function (name, price, image) {
    const existing = cart.find((item) => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    updateCartUI();
  };

  // BUTTON (+), (−), DELETE
  cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("plus")) {
      cart[index].quantity++;
    }

    if (e.target.classList.contains("minus")) {
      cart[index].quantity--;
      if (cart[index].quantity <= 0) cart.splice(index, 1);
    }

    if (e.target.classList.contains("remove")) {
      cart.splice(index, 1);
    }

    updateCartUI();
  });

  updateCartUI();
});

document.addEventListener("DOMContentLoaded", function () {
  const waElements = document.querySelectorAll(".fade-wa");

  const waObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  waElements.forEach((el) => waObserver.observe(el));
});
