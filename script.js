

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inviteForm");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const options = {
      key: "rzp_test_1234567890abcdef", // Replace with your Razorpay Test Key
      amount: 50000, // Amount in paise (e.g., 50000 = ₹500)
      currency: "INR",
      name: "House of Wave",
      description: "Event Entry Fee",
      handler: function (response) {
        alert("Payment Successful. Welcome to House of Wave!");
        form.style.display = "none";
        confirmation.classList.remove("hidden");
      },
      prefill: {
        name: name,
        email: email,
        contact: phone
      },
      theme: {
        color: "#00ffff"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });

  let selectedPass = '';
  let selectedPrice = 0;
  let quantity = 1;

  // Handle pass selection
  document.querySelectorAll('.select-pass').forEach(button => {
    button.addEventListener('click', () => {
      selectedPass = button.getAttribute('data-pass');
      selectedPrice = parseInt(button.getAttribute('data-price'), 10);

      console.log(`Pass Selected: ${selectedPass}, Price: ${selectedPrice}`);

      // Update the selected pass name in the quantity section
      const passNameElement = document.getElementById('selectedPassName');
      if (passNameElement) {
        passNameElement.textContent = `Selected Pass: ${selectedPass}`;
      } else {
        console.error('Element with id "selectedPassName" not found.');
      }

      // Hide the pricing section and show the quantity section
      const pricingSection = document.querySelector('.pricing');
      const quantitySection = document.getElementById('quantitySection');
      if (pricingSection && quantitySection) {
        pricingSection.classList.add('hidden');
        quantitySection.classList.remove('hidden');
      } else {
        console.error('Pricing or Quantity section not found.');
      }
    });
  });

  // Handle quantity increase
  const increaseButton = document.getElementById('increaseQuantity');
  if (increaseButton) {
    increaseButton.addEventListener('click', () => {
      quantity++;
      const quantityElement = document.getElementById('quantity');
      if (quantityElement) {
        quantityElement.textContent = quantity;
      } else {
        console.error('Element with id "quantity" not found.');
      }
    });
  } else {
    console.error('Increase button not found.');
  }

  // Handle quantity decrease
  const decreaseButton = document.getElementById('decreaseQuantity');
  if (decreaseButton) {
    decreaseButton.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        const quantityElement = document.getElementById('quantity');
        if (quantityElement) {
          quantityElement.textContent = quantity;
        } else {
          console.error('Element with id "quantity" not found.');
        }
      }
    });
  } else {
    console.error('Decrease button not found.');
  }

  // Proceed to payment
  const proceedButton = document.getElementById('proceedToPayment');
  if (proceedButton) {
    proceedButton.addEventListener('click', () => {
      console.log(`Proceeding to payment with Pass: ${selectedPass}, Quantity: ${quantity}, Total Price: ${selectedPrice * quantity}`);

      // Redirect to the Razorpay test link
      window.location.href = "https://rzp.io/rzp/sfnFiP7";
    });
  } else {
    console.error('Proceed button not found.');
  }
});
