/**
 * UZUM MARKET CLONE - SHOPPING CART LOGIC
 * Full localStorage persistence, quantity stepper, item selection,
 * promo code discount engine, and summary calculation.
 */

const CART_STORAGE_KEY = 'uzum_cart_items_v1';
const PROMO_STORAGE_KEY = 'uzum_cart_promo_v1';

const PROMO_CODES = {
  'UZUM10': { type: 'percent', value: 10, label: "10% chegirma" },
  'BAHOR': { type: 'fixed', value: 50000, label: "50 000 so'm bahorgi chegirma" },
  'YANGI': { type: 'fixed', value: 30000, label: "30 000 so'm birinchi xarid uchun" }
};

class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.appliedPromo = this.loadPromo();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Cart loading error:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
      this.updateBadges();
      window.dispatchEvent(new CustomEvent('uzum:cart-updated', { detail: { cart: this.cart } }));
    } catch (e) {
      console.error("Cart saving error:", e);
    }
  }

  loadPromo() {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  savePromo(code) {
    if (code) {
      localStorage.setItem(PROMO_STORAGE_KEY, code);
      this.appliedPromo = code;
    } else {
      localStorage.removeItem(PROMO_STORAGE_KEY);
      this.appliedPromo = null;
    }
    this.saveCart();
  }

  getItems() {
    return this.cart.map(item => {
      const product = getProductById(item.productId);
      return {
        ...item,
        product: product || null
      };
    }).filter(item => item.product !== null);
  }

  addItem(productId, qty = 1) {
    const id = parseInt(productId);
    const existingIndex = this.cart.findIndex(i => i.productId === id);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += qty;
    } else {
      this.cart.push({
        productId: id,
        quantity: qty,
        selected: true
      });
    }

    this.saveCart();
    const product = getProductById(id);
    return product;
  }

  removeItem(productId) {
    const id = parseInt(productId);
    this.cart = this.cart.filter(i => i.productId !== id);
    this.saveCart();
  }

  updateQuantity(productId, newQty) {
    const id = parseInt(productId);
    const item = this.cart.find(i => i.productId === id);
    if (!item) return;

    if (newQty <= 0) {
      this.removeItem(id);
    } else {
      item.quantity = newQty;
      this.saveCart();
    }
  }

  toggleItemSelection(productId) {
    const id = parseInt(productId);
    const item = this.cart.find(i => i.productId === id);
    if (item) {
      item.selected = !item.selected;
      this.saveCart();
    }
  }

  toggleSelectAll(isSelected) {
    this.cart.forEach(item => {
      item.selected = isSelected;
    });
    this.saveCart();
  }

  clear() {
    this.cart = [];
    this.appliedPromo = null;
    localStorage.removeItem(PROMO_STORAGE_KEY);
    this.saveCart();
  }

  hasItem(productId) {
    const id = parseInt(productId);
    return this.cart.some(i => i.productId === id);
  }

  getItemQuantity(productId) {
    const id = parseInt(productId);
    const item = this.cart.find(i => i.productId === id);
    return item ? item.quantity : 0;
  }

  getTotals() {
    const items = this.getItems();
    let totalItems = 0;
    let originalTotal = 0;
    let finalTotal = 0;

    items.forEach(({ product, quantity, selected }) => {
      if (selected && product) {
        totalItems += quantity;
        originalTotal += (product.oldPrice || product.price) * quantity;
        finalTotal += product.price * quantity;
      }
    });

    let promoDiscount = 0;
    if (this.appliedPromo && PROMO_CODES[this.appliedPromo] && finalTotal > 0) {
      const rule = PROMO_CODES[this.appliedPromo];
      if (rule.type === 'percent') {
        promoDiscount = Math.round(finalTotal * (rule.value / 100));
      } else if (rule.type === 'fixed') {
        promoDiscount = Math.min(rule.value, finalTotal);
      }
    }

    const grandTotal = Math.max(0, finalTotal - promoDiscount);
    const totalSavings = (originalTotal - finalTotal) + promoDiscount;

    return {
      totalItems,
      allSelected: items.length > 0 && items.every(i => i.selected),
      originalTotal,
      savingsTotal: Math.max(0, totalSavings),
      subtotal: finalTotal,
      promoDiscount,
      grandTotal,
      appliedPromo: this.appliedPromo ? {
        code: this.appliedPromo,
        ...PROMO_CODES[this.appliedPromo]
      } : null
    };
  }

  applyPromo(code) {
    const upper = (code || '').trim().toUpperCase();
    if (!upper) {
      return { success: false, message: "Promo-kodni kiriting" };
    }
    if (PROMO_CODES[upper]) {
      this.savePromo(upper);
      return {
        success: true,
        message: `"${upper}" kodi qo'llanildi: ${PROMO_CODES[upper].label}`
      };
    }
    return {
      success: false,
      message: "Bunday promo-kod mavjud emas yoki muddati tugagan"
    };
  }

  removePromo() {
    this.savePromo(null);
  }

  updateBadges() {
    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
      if (count > 0) {
        badge.classList.remove('badge-pop');
        void badge.offsetWidth; // trigger reflow
        badge.classList.add('badge-pop');
      }
    });
  }
}

// Global Cart Instance
const cartManager = new CartManager();
