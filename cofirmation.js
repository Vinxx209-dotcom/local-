document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Save customer details to localStorage
    const customerDetails = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    localStorage.setItem("customerInfo", JSON.stringify(customerDetails));

    // Show confirmation message
    alert("Your order has been placed! Thank you for shopping.");

    // Clear cart and redirect to order confirmation page
    localStorage.removeItem("cartData");
    window.location.href = "order_confirmation.html";  // Redirect to order confirmation page
});
