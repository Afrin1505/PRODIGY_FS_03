const products = [
  { id: 1, name: 'Organic Apples', category: 'Fruits', price: 199, rating: 4.8, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Fresh Spinach', category: 'Vegetables', price: 89, rating: 4.6, image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Whole Milk', category: 'Dairy', price: 129, rating: 4.7, image: 'https://images.unsplash.com/photo-1556400056-8207f3f40455?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Brown Rice', category: 'Groceries', price: 240, rating: 4.9, image: 'https://images.unsplash.com/photo-1585238342028-3baa490bf6c8?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Avocado Pack', category: 'Fruits', price: 260, rating: 4.5, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Baby Carrots', category: 'Vegetables', price: 119, rating: 4.4, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80' },
  { id: 7, name: 'Yogurt Pack', category: 'Dairy', price: 149, rating: 4.6, image: 'https://images.unsplash.com/photo-1582738416050-05b37425b3f5?auto=format&fit=crop&w=600&q=80' },
  { id: 8, name: 'Olive Oil', category: 'Groceries', price: 420, rating: 4.7, image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80' },
  { id: 9, name: 'Banana Bunch', category: 'Fruits', price: 79, rating: 4.6, image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e43e?auto=format&fit=crop&w=600&q=80' },
  { id: 10, name: 'Tomato Basket', category: 'Vegetables', price: 99, rating: 4.5, image: 'https://images.unsplash.com/photo-1506807803488-8eafc153f5a1?auto=format&fit=crop&w=600&q=80' },
  { id: 11, name: 'Paneer Block', category: 'Dairy', price: 210, rating: 4.8, image: 'https://images.unsplash.com/photo-1604908177522-cf096b3c9a5a?auto=format&fit=crop&w=600&q=80' },
  { id: 12, name: 'Whole Wheat Flour', category: 'Groceries', price: 179, rating: 4.6, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80' }
];

const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const categoryButtons = document.querySelectorAll('.category-item');

let cart = JSON.parse(localStorage.getItem('eKartCart')) || [];
let activeCategory = 'all';
let currentSearch = '';
let currentSort = 'default';

function saveCart() {
  localStorage.setItem('eKartCart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

function updateCartItems() {
  cartItemsContainer.innerHTML = '';
  if (!cart.length) {
    cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty. Add fresh local picks to get started.</p>';
    cartTotal.textContent = '₹0.00';
    return;
  }

  cart.forEach(item => {
    const product = products.find(product => product.id === item.id);
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="cart-item-info">
        <div>
          <h4>${product.name}</h4>
          <p>₹${product.price.toFixed(2)}</p>
        </div>
        <div>
          <div class="quantity-control">
            <button data-action="decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button data-action="increase" data-id="${item.id}">+</button>
          </div>
          <button class="remove-item" data-action="remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  const total = cart.reduce((sum, item) => {
    const product = products.find(product => product.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);
  cartTotal.textContent = `₹${total.toFixed(2)}`;
}

function addToCart(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  updateCartItems();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartCount();
  updateCartItems();
}

function changeQuantity(id, delta) {
  const item = cart.find(item => item.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < 1) {
    removeFromCart(id);
    return;
  }
  saveCart();
  updateCartCount();
  updateCartItems();
}

function filterProducts() {
  let filtered = [...products];

  if (activeCategory !== 'all') {
    filtered = filtered.filter(product => product.category === activeCategory);
  }

  if (currentSearch.trim()) {
    const query = currentSearch.trim().toLowerCase();
    filtered = filtered.filter(product => product.name.toLowerCase().includes(query));
  }

  if (currentSort === 'low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'high-low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
}

function renderProducts() {
  productGrid.innerHTML = '';
  const items = filterProducts();

  if (!items.length) {
    productGrid.innerHTML = '<p class="empty-message">No products match your search or filters.</p>';
    return;
  }

  items.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3 class="product-title">${product.name}</h3>
      <div class="product-meta">
        <span class="price">₹${product.price.toFixed(2)}</span>
        <span class="rating">★ ${product.rating.toFixed(1)}</span>
      </div>
      <button class="add-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

function setActiveCategory(button) {
  categoryButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  activeCategory = button.dataset.category;
  renderProducts();
}

cartBtn.addEventListener('click', () => cartPanel.classList.add('open'));
closeCart.addEventListener('click', () => cartPanel.classList.remove('open'));

productGrid.addEventListener('click', event => {
  const target = event.target.closest('[data-id]');
  if (!target) return;
  const id = Number(target.dataset.id);
  if (target.classList.contains('add-cart')) {
    addToCart(id);
  }
});

cartItemsContainer.addEventListener('click', event => {
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const id = Number(actionButton.dataset.id);
  const action = actionButton.dataset.action;

  if (action === 'remove') removeFromCart(id);
  if (action === 'increase') changeQuantity(id, 1);
  if (action === 'decrease') changeQuantity(id, -1);
});

searchBtn.addEventListener('click', () => {
  currentSearch = searchInput.value;
  renderProducts();
});

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    currentSearch = searchInput.value;
    renderProducts();
  }
});

sortSelect.addEventListener('change', () => {
  currentSort = sortSelect.value;
  renderProducts();
});

categoryButtons.forEach(button => {
  button.addEventListener('click', () => setActiveCategory(button));
});

function initialize() {
  updateCartCount();
  updateCartItems();
  renderProducts();
}

initialize();
