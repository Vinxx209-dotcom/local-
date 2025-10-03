// helper: pick icon based on product name
function getSymbol(name) {
    const n = name.toLowerCase();
    const clothes = ['shirt','hoodie','jacket','pant','tee','blazer','short','kurta'];
    const shoe    = ['shoe','sneaker','boot','flip','chappal','loafer','slip'];
    if (clothes.some(k=>n.includes(k))) return '👕';
    if (shoe.some(k=>n.includes(k)))    return '👟';
    return '🎁';  // fallback
  }
  
  // load + render
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  function renderCart() {
    const tbody = document.getElementById("cart-items");
    const totalE = document.getElementById("total-price");
    tbody.innerHTML = '';
    let total = 0;
  
    if (!cart.length) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center">Your cart is empty.</td></tr>`;
      totalE.textContent = '0';
      return;
    }
  
    cart.forEach((item, i) => {
      const qty      = item.quantity || 1;
      const subtotal = item.price * qty;
      total += subtotal;
      const sym = getSymbol(item.name);
  
      tbody.innerHTML += `
        <tr>
          <td class="symbol">${sym}</td>
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td><input type="number" min="1" value="${qty}" class="form-control quantity" data-index="${i}"></td>
          <td>₹${subtotal.toFixed(2)}</td>
          <td><button class="btn btn-sm btn-danger remove-btn" data-index="${i}">Remove</button></td>
        </tr>
      `;
    });
  
    totalE.textContent = total.toFixed(2);
  }
  
  // quantity change
  document.addEventListener('input', e => {
    if (e.target.classList.contains('quantity')) {
      const i = +e.target.dataset.index;
      cart[i].quantity = Math.max(1, parseInt(e.target.value)||1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  });
  
  // remove item
  document.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
      const i = +e.target.dataset.index;
      cart.splice(i,1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  });
  
  // clear / checkout
  document.getElementById('clear-cart').onclick = () => {
    cart = []; localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };
  document.getElementById('checkout').onclick = () => {
    alert('Thank you for shopping!');
    cart = []; localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };
  
  // init
  cart.forEach(item=>{ if(!item.quantity) item.quantity=1; });
  renderCart();
  
