/**
 * UZUM MARKET CLONE - MAIN APPLICATION ENTRY POINT
 * Initializes modules, renders home sections, coordinates events,
 * and manages responsive navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Search and UI
  searchManager.init();
  uiManager.init();

  // 2. Render Header & Storage Badges
  cartManager.updateBadges();
  favoritesManager.updateBadges();

  // 3. Render Homepage Sections
  renderHomePageSections();

  // 4. Setup Sorting and Filtering Tabs
  setupSortingControls();

  // 5. Setup Quick Category Pills
  setupQuickCategoryBar();

  // 6. Setup Mobile Bottom Navigation
  setupMobileNavigation();

  // 7. Event listeners for cross-component sync
  window.addEventListener('uzum:cart-updated', () => {
    syncAllProductCardCartButtons();
  });

  window.addEventListener('uzum:favorites-updated', () => {
    favoritesManager.syncHeartIcons();
  });

  console.log("Uzum Market Clone initialized successfully. 34 products ready.");
});

/**
 * Renders all primary product sections on the homepage
 */
function renderHomePageSections() {
  // Section 1: Mashhur mahsulotlar (Popular)
  const popularGrid = document.getElementById('popularProductsGrid');
  if (popularGrid) {
    const populars = getPopularProducts(10);
    popularGrid.innerHTML = populars.map(p => uiManager.createProductCardHTML(p)).join('');
  }

  // Section 2: Siz uchun tavsiyalar (Recommended For You)
  const recommendedGrid = document.getElementById('recommendedProductsGrid');
  if (recommendedGrid) {
    const recommended = getRecommendedProducts(10);
    recommendedGrid.innerHTML = recommended.map(p => uiManager.createProductCardHTML(p)).join('');
  }

  // Section 3: Eng ko'p sotilganlar (Best Sellers)
  const bestSellersGrid = document.getElementById('bestSellersGrid');
  if (bestSellersGrid) {
    const bestSellers = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 10);
    bestSellersGrid.innerHTML = bestSellers.map(p => uiManager.createProductCardHTML(p)).join('');
  }

  // Section 4: Chegirmadagi mahsulotlar (Discounts)
  const discountsGrid = document.getElementById('discountsGrid');
  if (discountsGrid) {
    const discounts = getDiscountedProducts(10);
    discountsGrid.innerHTML = discounts.map(p => uiManager.createProductCardHTML(p)).join('');
  }

  // Section 5: Yangi mahsulotlar (New Arrivals)
  const newArrivalsGrid = document.getElementById('newArrivalsGrid');
  if (newArrivalsGrid) {
    const newArrivals = getNewProducts(10);
    newArrivalsGrid.innerHTML = newArrivals.map(p => uiManager.createProductCardHTML(p)).join('');
  }

  // Section 6: Main Filterable Catalog Section
  const mainGrid = document.getElementById('mainProductsGrid');
  if (mainGrid) {
    mainGrid.innerHTML = PRODUCTS.map(p => uiManager.createProductCardHTML(p)).join('');
  }

  // Sync heart states
  favoritesManager.syncHeartIcons();
}

/**
 * Synchronize card cart buttons when cart changes
 */
function syncAllProductCardCartButtons() {
  const cards = document.querySelectorAll('.uz-product-card');
  cards.forEach(card => {
    const pid = parseInt(card.getAttribute('data-product-id'));
    const btn = card.querySelector('.uz-cart-action-btn');
    if (btn) {
      const qty = cartManager.getItemQuantity(pid);
      if (qty > 0) {
        btn.classList.add('in-cart');
        btn.innerHTML = `<span class="cart-qty-num">${qty}</span>`;
      } else {
        btn.classList.remove('in-cart');
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        `;
      }
    }
  });
}

/**
 * Setup Sorting Tabs
 */
function setupSortingControls() {
  const sortBtns = document.querySelectorAll('.sort-tab-btn');
  sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sortBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sortType = btn.getAttribute('data-sort');
      applyProductSort(sortType);
    });
  });
}

function applyProductSort(sortType) {
  let list = getProductsByCategory(uiManager.currentCategory);
  
  if (sortType === 'popular') {
    list.sort((a, b) => b.popularity - a.popularity);
  } else if (sortType === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortType === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortType === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sortType === 'discount') {
    list.sort((a, b) => parseInt(a.discount) - parseInt(b.discount));
  }

  const container = document.getElementById('mainProductsGrid');
  if (container) {
    container.innerHTML = list.map(p => uiManager.createProductCardHTML(p)).join('');
    favoritesManager.syncHeartIcons();
  }
}

/**
 * Quick Category Bar in Header/Subheader
 */
function setupQuickCategoryBar() {
  const pills = document.querySelectorAll('.subnav-item');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = pill.getAttribute('data-cat');
      uiManager.filterByCategory(cat);
      const mainSec = document.getElementById('mainProductsSection');
      if (mainSec) {
        mainSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const catCircles = document.querySelectorAll('.category-circle-item');
  catCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      const cat = circle.getAttribute('data-cat');
      if (cat === 'katalog') {
        uiManager.toggleCatalogMegaMenu();
      } else {
        uiManager.filterByCategory(cat);
        const mainSec = document.getElementById('mainProductsSection');
        if (mainSec) {
          mainSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/**
 * Mobile Bottom Bar Navigation
 */
function setupMobileNavigation() {
  const navItems = document.querySelectorAll('.mobile-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const action = item.getAttribute('data-nav');
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (action === 'home') {
        uiManager.clearSearchFilter();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (action === 'catalog') {
        uiManager.toggleCatalogMegaMenu();
      } else if (action === 'cart') {
        uiManager.openCartModal();
      } else if (action === 'fav') {
        uiManager.openFavoritesModal();
      } else if (action === 'profile') {
        uiManager.openAuthModal();
      }
    });
  });
}
