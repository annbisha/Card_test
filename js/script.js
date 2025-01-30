document.addEventListener("DOMContentLoaded", function () {
  const addCardButton = document.getElementById("add-btn");
  const addProductModal = document.getElementById("add-product-modal");
  const saveProductButton = document.getElementById("save-product");
  const cancelAddButton = document.getElementById("cancel-add");
  const productList = document.getElementById("product-list");
  const errorMessage = document.getElementById("error-message");
  const confirmModal = document.getElementById("confirmation-modal");
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");
  if (
    !addCardButton ||
    !addProductModal ||
    !saveProductButton ||
    !cancelAddButton ||
    !productList ||
    !errorMessage ||
    !confirmModal ||
    !confirmDeleteButton ||
    !cancelDeleteButton
  ) {
    return;
  }
  let quantity = 1;
  let productPrice = 0;

  function updatePrice(productCard, pricePerUnit) {
    const totalPriceElement = productCard.querySelector(".product-total-price");
    const totalPrice = pricePerUnit * quantity;
    totalPriceElement.textContent = `Сумма: $${totalPrice.toFixed(2)}`;
  }

  addCardButton.addEventListener("click", () => {
    addProductModal.classList.add("active");
    document.body.classList.add("modal-active");
    errorMessage.style.display = "none";
  });

  cancelAddButton.addEventListener("click", () => {
    addProductModal.classList.remove("active");
    document.body.classList.remove("modal-active");
  });

  saveProductButton.addEventListener("click", () => {
    const productName = document.getElementById("new-product-name").value;
    productPrice = parseFloat(
      document.getElementById("new-product-price").value
    );
    const productImageInput = document.getElementById("new-product-image");
    const productImage = productImageInput.files[0];

    const nameIsValid = /^[A-Za-zА-Яа-яЁё]+$/.test(productName);
    const priceIsValid = !isNaN(productPrice) && productPrice > 0;

    if (!nameIsValid || !priceIsValid) {
      errorMessage.style.display = "block";
      return;
    }

    if (productName && productPrice) {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const imageUrl = productImage
        ? URL.createObjectURL(productImage)
        : "img/default-image.jpg";

      const productCardContent = `
        <img src="${imageUrl}" alt="${productName}" class="product-image" onerror="this.onerror=null; this.src='default-image.jpg';" />
        <h2 class="product-title">${productName}</h2>
        <p class="product-price">Price per unit: $<span>${productPrice}</span></p>
        <div class="quantity-selector">
        <input type="number" class="quantity" value="1" min="1" max="10" readonly />
        <div class="chance">
            <button class="decrease-quantity chance-btn">-</button>
            <button class="increase-quantity chance-btn">+</button>
        </div>
        </div>
        <p class="product-quantity">Quantity: <span class="product-quantity-value">${quantity}</span></p>
        <p class="product-total-price">Total: $${(
          productPrice * quantity
        ).toFixed(2)}</p>
        <button class="remove-btn">Remove</button>
    `;

      productCard.innerHTML = productCardContent;
      productList.appendChild(productCard);
      addProductModal.classList.remove("active");
      document.body.classList.remove("modal-active");

      const decreaseButton = productCard.querySelector(".decrease-quantity");
      const increaseButton = productCard.querySelector(".increase-quantity");
      const quantityInput = productCard.querySelector(".quantity");
      const quantityValue = productCard.querySelector(
        ".product-quantity-value"
      );

      decreaseButton.addEventListener("click", () => {
        if (quantity > 1) {
          quantity--;
          quantityValue.textContent = quantity;
          quantityInput.value = quantity;
          updatePrice(productCard, productPrice);
        }
      });

      increaseButton.addEventListener("click", () => {
        if (quantity < 10) {
          quantity++;
          quantityValue.textContent = quantity;
          quantityInput.value = quantity;
          updatePrice(productCard, productPrice);
        }
      });

      productCard.querySelector(".remove-btn").addEventListener("click", () => {
        confirmModal.classList.add("active");
        document.body.classList.add("modal-active");

        confirmDeleteButton.onclick = () => {
          productCard.remove();
          confirmModal.classList.remove("active");
          document.body.classList.remove("modal-active");
        };
      });
    }
  });

  confirmDeleteButton.addEventListener("click", () => {
    confirmModal.classList.remove("active");
    document.body.classList.remove("modal-active");
  });

  cancelDeleteButton.addEventListener("click", () => {
    confirmModal.classList.remove("active");
    document.body.classList.remove("modal-active");
  });
});
