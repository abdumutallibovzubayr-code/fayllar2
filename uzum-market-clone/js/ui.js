/**
 * UZUM MARKET CLONE - UI & INTERACTION CONTROLLER
 * Handles all Modals, Drawers, Banner Carousel, Product Details,
 * Toast Notifications, Checkout Simulation, and Auth State.
 */

class UIManager {
  constructor() {
    this.currentCity = localStorage.getItem('uzum_city_v1') || 'Toshkent';
    this.currentUser = JSON.parse(localStorage.getItem('uzum_user_v1') || 'null');
    this.currentCategory = 'all';
    this.currentSort = 'popular';
    this.carouselTimer = null;
    this.currentSlideIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  init() {
    this.setupCitySelector();
    this.setupCarousel();
    this.setupCatalogMegaMenu();
    this.setupModalEvents();
    this.setupEventListeners();
    this.updateUserUI();
    this.updateCityUI();
  }

  /* ==========================================================================
     PRODUCT CARD TEMPLATE
     ========================================================================== */
  createProductCardHTML(product) {
    const isFav = favoritesManager.isFavorite(product.id);
    const inCartQty = cartManager.getItemQuantity(product.id);
    const hasDiscount = product.oldPrice && product.oldPrice > product.price;

    return `
      <div class="uz-product-card" data-product-id="${product.id}" onclick="uiManager.handleCardClick(event, ${product.id})">
        <!-- Top Image Container -->
        <div class="uz-card-image-wrap">
          <img 
            src="${product.image}" 
            alt="${this.escapeHtml(product.title)}" 
            class="uz-card-img" 
            loading="lazy" 
            onerror="this.src='assets/images/placeholder.svg'"
          />
          
          <!-- Badges -->
          <div class="uz-card-badges">
            ${product.badge ? `<span class="uz-badge uz-badge-${this.getBadgeClass(product.badge)}">${product.badge}</span>` : ''}
            ${hasDiscount ? `<span class="uz-badge uz-badge-discount">${product.discount}</span>` : ''}
          </div>

          <!-- Favorite Button -->
          <button 
            type="button" 
            class="uz-fav-btn ${isFav ? 'active' : ''}" 
            data-fav-id="${product.id}" 
            onclick="uiManager.toggleFavoriteCard(event, ${product.id})"
            title="${isFav ? "Saralangandan o'chirish" : "Saralanganga qo'shish"}"
            aria-label="Sevimlilarga qo'shish"
          >
            <svg class="heart-icon" viewBox="0 0 24 24" width="20" height="20">
              <path class="heart-outline" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              <path class="heart-filled" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        <!-- Body Details -->
        <div class="uz-card-body">
          <!-- Rating & Reviews -->
          <div class="uz-card-rating">
            <span class="uz-star-icon">★</span>
            <span class="uz-rating-score">${product.rating}</span>
            <span class="uz-rating-count">(${product.reviews} sharh)</span>
          </div>

          <!-- Title -->
          <h3 class="uz-card-title" title="${this.escapeHtml(product.title)}">
            ${this.escapeHtml(product.title)}
          </h3>

          <!-- Installment Monthly Badge -->
          <div class="uz-installment-pill">
            ${product.installmentPrice}
          </div>

          <!-- Price & Action Footer -->
          <div class="uz-card-footer">
            <div class="uz-price-block">
              ${hasDiscount ? `<span class="uz-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
              <span class="uz-current-price">${formatPrice(product.price)}</span>
            </div>

            <!-- Cart Button -->
            <button 
              type="button" 
              class="uz-cart-action-btn ${inCartQty > 0 ? 'in-cart' : ''}" 
              data-cart-id="${product.id}"
              onclick="uiManager.handleCartButton(event, ${product.id})"
              title="Savatga qo'shish"
              aria-label="Savatga qo'shish"
            >
              ${inCartQty > 0 
                ? `<span class="cart-qty-num">${inCartQty}</span>` 
                : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                     <line x1="3" y1="6" x2="21" y2="6"></line>
                     <path d="M16 10a4 4 0 0 1-8 0"></path>
                   </svg>`
              }
            </button>
          </div>
        </div>
      </div>
    `;
  }

  getBadgeClass(badge) {
    if (!badge) return 'default';
    if (badge.includes('savdo')) return 'primary';
    if (badge.includes('Aksiya')) return 'danger';
    if (badge.includes('Yangi')) return 'info';
    return 'warning';
  }

  handleCardClick(e, productId) {
    // Prevent opening modal if clicking on fav or cart button
    if (e.target.closest('.uz-fav-btn') || e.target.closest('.uz-cart-action-btn')) {
      return;
    }
    this.openProductModal(productId);
  }

  toggleFavoriteCard(e, productId) {
    e.stopPropagation();
    const result = favoritesManager.toggleFavorite(productId);
    if (result.added) {
      this.showToast(`"${result.product.title.slice(0, 30)}..." sevimlilarga qo'shildi`, 'favorite');
    } else {
      this.showToast(`"${result.product.title.slice(0, 30)}..." sevimlilardan o'chirildi`, 'info');
    }
  }

  handleCartButton(e, productId) {
    e.stopPropagation();
    const product = cartManager.addItem(productId, 1);
    this.showToast(`"${product.title.slice(0, 30)}..." savatga qo'shildi`, 'cart', () => {
      this.openCartModal();
    });

    // Animate clicked button
    const btn = e.currentTarget;
    btn.classList.add('in-cart');
    btn.innerHTML = `<span class="cart-qty-num">${cartManager.getItemQuantity(productId)}</span>`;
  }

  /* ==========================================================================
     HERO BANNER CAROUSEL
     ========================================================================== */
  setupCarousel() {
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-prev-btn');
    const nextBtn = document.querySelector('.hero-next-btn');
    const indicatorsWrap = document.querySelector('.hero-indicators');

    if (!slider || slides.length === 0) return;

    // Create pagination dots
    if (indicatorsWrap) {
      indicatorsWrap.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `hero-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          this.goToSlide(idx);
          this.resetCarouselTimer();
        });
        indicatorsWrap.appendChild(dot);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetCarouselTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetCarouselTimer();
      });
    }

    // Touch Swipe support
    slider.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(this.carouselTimer));
    slider.addEventListener('mouseleave', () => this.startCarouselTimer());

    this.startCarouselTimer();
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetCarouselTimer();
    }
  }

  goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (slides.length === 0) return;

    this.currentSlideIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === this.currentSlideIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.currentSlideIndex);
    });
  }

  nextSlide() {
    this.goToSlide(this.currentSlideIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentSlideIndex - 1);
  }

  startCarouselTimer() {
    clearInterval(this.carouselTimer);
    this.carouselTimer = setInterval(() => {
      this.nextSlide();
    }, 4500);
  }

  resetCarouselTimer() {
    this.startCarouselTimer();
  }

  /* ==========================================================================
     MEGA CATALOG MENU
     ========================================================================== */
  setupCatalogMegaMenu() {
    const catalogBtn = document.getElementById('catalogMenuBtn');
    const catalogDrawer = document.getElementById('catalogMegaDrawer');
    const catalogCloseBtn = document.getElementById('catalogCloseBtn');
    const catalogBackdrop = document.getElementById('catalogBackdrop');

    if (!catalogBtn || !catalogDrawer) return;

    catalogBtn.addEventListener('click', () => {
      this.toggleCatalogMegaMenu();
    });

    if (catalogCloseBtn) {
      catalogCloseBtn.addEventListener('click', () => {
        this.closeCatalogMegaMenu();
      });
    }

    if (catalogBackdrop) {
      catalogBackdrop.addEventListener('click', () => {
        this.closeCatalogMegaMenu();
      });
    }

    // Populate catalog categories
    this.renderCatalogCategories();
  }

  toggleCatalogMegaMenu() {
    const drawer = document.getElementById('catalogMegaDrawer');
    const btn = document.getElementById('catalogMenuBtn');
    if (!drawer) return;

    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      this.closeCatalogMegaMenu();
    } else {
      drawer.classList.add('open');
      if (btn) btn.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  closeCatalogMegaMenu() {
    const drawer = document.getElementById('catalogMegaDrawer');
    const btn = document.getElementById('catalogMenuBtn');
    if (drawer) drawer.classList.remove('open');
    if (btn) btn.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  renderCatalogCategories() {
    const listEl = document.getElementById('catalogCategoriesList');
    const contentEl = document.getElementById('catalogSubcategoriesContent');
    if (!listEl || !contentEl) return;

    const categories = [
      { id: 'elektronika', name: 'Elektronika', icon: 'cat-elektronika.svg', count: '100 000+ mahsulot', subcats: ['Smartfonlar va telefonlar', 'Quloqchinlar va audio', 'Noutbuklar va kompyuterlar', 'Aqlli soatlar va bilaguzuklar', 'Televizorlar va fototexnika', 'Aksessuarlar va g\'iloflar'] },
      { id: 'maishiy-texnika', name: 'Maishiy texnika', icon: 'cat-maishiy.svg', count: '45 000+ mahsulot', subcats: ['Robot changyutgichlar', 'Aerogrillar va pechlar', 'Elektr choynaklar', 'Blenderlar va kombaynlar', 'Muzlatgichlar va kir yuvish mashinalari', 'Iqlim texnikasi'] },
      { id: 'kiyim', name: 'Kiyim', icon: 'cat-kiyim.svg', count: '120 000+ mahsulot', subcats: ['Erkaklar kiyimi', 'Ayollar kiyimi', 'Kurtkalar va paltolar', 'Xudilar va sviterlar', 'Jinsi va shimlar', 'Sport kiyimlari'] },
      { id: 'poyabzal', name: 'Poyabzal', icon: 'cat-poyabzal.svg', count: '60 000+ mahsulot', subcats: ['Erkaklar krossovkalari', 'Ayollar poyabzali', 'Klassik tuflilar', 'Etik va botinkalar', 'Uy shippaklari'] },
      { id: 'gozallik', name: 'Goʻzallik va parvarish', icon: 'cat-gozallik.svg', count: '85 000+ mahsulot', subcats: ['Parfyumeriya', 'Yuz terisi parvarishi', 'Soch parvarishi va fenslar', 'Dekorativ kosmetika', 'Erkaklar parvarishi va trimmerlar'] },
      { id: 'uy-rozgor', name: 'Uy-roʻzgʻor buyumlari', icon: 'cat-uy.svg', count: '95 000+ mahsulot', subcats: ['Oshxona idishlari va qozonlar', 'Yotoq anjomlari va to\'shaklar', 'Yoritish va qulaylik', 'Tozalash va saqlash jihozlari'] },
      { id: 'sport', name: 'Sport va hordiq', icon: 'cat-sport.svg', count: '30 000+ mahsulot', subcats: ['Fitnes va trenajyorlar', 'Gantellar va og\'ir atletika', 'Ryukzak va sumkalar', 'Termos va sport idishlari'] },
      { id: 'bolalar', name: 'Bolalar tovarlari', icon: 'cat-bolalar.svg', count: '50 000+ mahsulot', subcats: ['Konstruktorlar va LEGO', 'Yumshoq o\'yinchoqlar', 'Rivojlantiruvchi o\'yinlar', 'Bolalar aravachalari'] },
      { id: 'oziq-ovqat', name: 'Oziq-ovqat', icon: 'cat-oziq-ovqat.svg', count: '25 000+ mahsulot', subcats: ['Donli va maydalangan qahva', 'Choylar va shirinliklar', 'Belgiya shokoladlari', 'Yong\'oq va quruq mevalar'] }
    ];

    listEl.innerHTML = categories.map((cat, idx) => `
      <div class="catalog-cat-item ${idx === 0 ? 'active' : ''}" data-cat-id="${cat.id}" onmouseenter="uiManager.switchCatalogSubcat('${cat.id}')" onclick="uiManager.selectCatalogCategory('${cat.id}')">
        <img src="assets/icons/${cat.icon}" alt="${cat.name}" class="catalog-cat-icon" />
        <div class="catalog-cat-text">
          <span class="catalog-cat-title">${cat.name}</span>
          <span class="catalog-cat-sub">${cat.count}</span>
        </div>
        <span class="catalog-cat-arrow">›</span>
      </div>
    `).join('');

    this.renderCatalogSubcatContent(categories[0]);
  }

  switchCatalogSubcat(catId) {
    const items = document.querySelectorAll('.catalog-cat-item');
    items.forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-cat-id') === catId);
    });

    const categories = [
      { id: 'elektronika', name: 'Elektronika', icon: 'cat-elektronika.svg', count: '100 000+ mahsulot', subcats: ['Smartfonlar va telefonlar', 'Quloqchinlar va audio', 'Noutbuklar va kompyuterlar', 'Aqlli soatlar va bilaguzuklar', 'Televizorlar va fototexnika', 'Aksessuarlar va g\'iloflar'] },
      { id: 'maishiy-texnika', name: 'Maishiy texnika', icon: 'cat-maishiy.svg', count: '45 000+ mahsulot', subcats: ['Robot changyutgichlar', 'Aerogrillar va pechlar', 'Elektr choynaklar', 'Blenderlar va kombaynlar', 'Muzlatgichlar va kir yuvish mashinalari', 'Iqlim texnikasi'] },
      { id: 'kiyim', name: 'Kiyim', icon: 'cat-kiyim.svg', count: '120 000+ mahsulot', subcats: ['Erkaklar kiyimi', 'Ayollar kiyimi', 'Kurtkalar va paltolar', 'Xudilar va sviterlar', 'Jinsi va shimlar', 'Sport kiyimlari'] },
      { id: 'poyabzal', name: 'Poyabzal', icon: 'cat-poyabzal.svg', count: '60 000+ mahsulot', subcats: ['Erkaklar krossovkalari', 'Ayollar poyabzali', 'Klassik tuflilar', 'Etik va botinkalar', 'Uy shippaklari'] },
      { id: 'gozallik', name: 'Goʻzallik va parvarish', icon: 'cat-gozallik.svg', count: '85 000+ mahsulot', subcats: ['Parfyumeriya', 'Yuz terisi parvarishi', 'Soch parvarishi va fenslar', 'Dekorativ kosmetika', 'Erkaklar parvarishi va trimmerlar'] },
      { id: 'uy-rozgor', name: 'Uy-roʻzgʻor buyumlari', icon: 'cat-uy.svg', count: '95 000+ mahsulot', subcats: ['Oshxona idishlari va qozonlar', 'Yotoq anjomlari va to\'shaklar', 'Yoritish va qulaylik', 'Tozalash va saqlash jihozlari'] },
      { id: 'sport', name: 'Sport va hordiq', icon: 'cat-sport.svg', count: '30 000+ mahsulot', subcats: ['Fitnes va trenajyorlar', 'Gantellar va og\'ir atletika', 'Ryukzak va sumkalar', 'Termos va sport idishlari'] },
      { id: 'bolalar', name: 'Bolalar tovarlari', icon: 'cat-bolalar.svg', count: '50 000+ mahsulot', subcats: ['Konstruktorlar va LEGO', 'Yumshoq o\'yinchoqlar', 'Rivojlantiruvchi o\'yinlar', 'Bolalar aravachalari'] },
      { id: 'oziq-ovqat', name: 'Oziq-ovqat', icon: 'cat-oziq-ovqat.svg', count: '25 000+ mahsulot', subcats: ['Donli va maydalangan qahva', 'Choylar va shirinliklar', 'Belgiya shokoladlari', 'Yong\'oq va quruq mevalar'] }
    ];

    const target = categories.find(c => c.id === catId);
    if (target) {
      this.renderCatalogSubcatContent(target);
    }
  }

  renderCatalogSubcatContent(cat) {
    const contentEl = document.getElementById('catalogSubcategoriesContent');
    if (!contentEl) return;

    contentEl.innerHTML = `
      <div class="subcat-header">
        <h3 class="subcat-title">${cat.name}</h3>
        <button type="button" class="subcat-all-btn" onclick="uiManager.selectCatalogCategory('${cat.id}')">
          Barcha toifalarga o'tish →
        </button>
      </div>

      <div class="subcat-grid">
        ${cat.subcats.map(sub => `
          <div class="subcat-column">
            <h4 class="subcat-col-title" onclick="uiManager.selectCatalogCategory('${cat.id}')">${sub}</h4>
            <ul class="subcat-list">
              <li><a href="javascript:void(0)" onclick="uiManager.selectCatalogCategory('${cat.id}')">Ommabop takliflar</a></li>
              <li><a href="javascript:void(0)" onclick="uiManager.selectCatalogCategory('${cat.id}')">Katta chegirmalar</a></li>
              <li><a href="javascript:void(0)" onclick="uiManager.selectCatalogCategory('${cat.id}')">Yangi kelganlar</a></li>
            </ul>
          </div>
        `).join('')}
      </div>

      <div class="subcat-promo-card">
        <div class="subcat-promo-text">
          <h5>${cat.name} bo'yicha 1 kunda yetkazish</h5>
          <p>O'zbekistonning barcha viloyatlariga bepul yetkazib beramiz</p>
        </div>
        <button class="subcat-promo-btn" onclick="uiManager.selectCatalogCategory('${cat.id}')">Ko'rish</button>
      </div>
    `;
  }

  selectCatalogCategory(catId) {
    this.closeCatalogMegaMenu();
    this.filterByCategory(catId);
    // Smooth scroll to product section
    const el = document.getElementById('mainProductsSection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ==========================================================================
     PRODUCT DETAILS MODAL
     ========================================================================== */
  openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const modal = document.getElementById('productDetailModal');
    const container = document.getElementById('productDetailContent');
    if (!modal || !container) return;

    const isFav = favoritesManager.isFavorite(product.id);
    const inCartQty = cartManager.getItemQuantity(product.id);
    const hasDiscount = product.oldPrice && product.oldPrice > product.price;

    const images = product.additionalImages && product.additionalImages.length > 0 
      ? product.additionalImages 
      : [product.image];

    // Specifications markup
    const specsHtml = product.specs ? Object.entries(product.specs).map(([key, val]) => `
      <div class="spec-row">
        <span class="spec-label">${key}</span>
        <span class="spec-dots"></span>
        <span class="spec-value">${val}</span>
      </div>
    `).join('') : '';

    // Similar products
    const similarProducts = PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    container.innerHTML = `
      <div class="pdetail-grid">
        <!-- Gallery Column -->
        <div class="pdetail-gallery-col">
          <div class="pdetail-main-img-box">
            <img 
              id="pdetailMainImg" 
              src="${images[0]}" 
              alt="${this.escapeHtml(product.title)}" 
              onerror="this.src='assets/images/placeholder.svg'"
            />
            ${product.badge ? `<span class="uz-badge uz-badge-${this.getBadgeClass(product.badge)}">${product.badge}</span>` : ''}
          </div>
          <div class="pdetail-thumbs">
            ${images.map((img, idx) => `
              <button type="button" class="pdetail-thumb ${idx === 0 ? 'active' : ''}" onclick="uiManager.switchDetailThumb('${img}', this)">
                <img src="${img}" alt="Thumbnail" onerror="this.src='assets/images/placeholder.svg'"/>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Info Column -->
        <div class="pdetail-info-col">
          <!-- Seller & Rating -->
          <div class="pdetail-meta">
            <span class="pdetail-seller">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
              Sotuvchi: <strong>${product.seller || 'Uzum Market'}</strong>
            </span>
            <div class="pdetail-rating">
              <span class="uz-star-icon">★</span>
              <strong>${product.rating}</strong>
              <span class="pdetail-review-count">(${product.reviews} sharhlar)</span>
            </div>
          </div>

          <h2 class="pdetail-title">${this.escapeHtml(product.title)}</h2>

          <!-- Delivery Fast Banner -->
          <div class="pdetail-delivery-banner">
            <div class="pdetail-delivery-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00A344" stroke-width="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <div>
              <div class="pdetail-delivery-title">Ertagayoq bepul yetkazib beramiz!</div>
              <div class="pdetail-delivery-sub">Topshirish punktiga yoki kuryer orqali eshikkacha</div>
            </div>
          </div>

          <!-- Price Block -->
          <div class="pdetail-price-box">
            <div class="pdetail-current-price">${formatPrice(product.price)}</div>
            ${hasDiscount ? `
              <div class="pdetail-old-price">${formatPrice(product.oldPrice)}</div>
              <span class="pdetail-discount-tag">${product.discount}</span>
            ` : ''}
          </div>

          <!-- Installment Options -->
          <div class="pdetail-installment-box">
            <div class="pdetail-installment-header">
              <span>Muddatli to'lov (Uzum Nasiya):</span>
              <strong id="pdetailInstallmentVal">${product.installmentPrice}</strong>
            </div>
            <div class="pdetail-months-pills">
              <button type="button" class="month-pill" onclick="uiManager.calculateDetailInstallment(${product.price}, 3, this)">3 oy</button>
              <button type="button" class="month-pill" onclick="uiManager.calculateDetailInstallment(${product.price}, 6, this)">6 oy</button>
              <button type="button" class="month-pill active" onclick="uiManager.calculateDetailInstallment(${product.price}, 12, this)">12 oy</button>
              <button type="button" class="month-pill" onclick="uiManager.calculateDetailInstallment(${product.price}, 24, this)">24 oy</button>
            </div>
          </div>

          <!-- Quantity Selector & Actions -->
          <div class="pdetail-actions-box">
            <div class="pdetail-qty-control">
              <button type="button" class="qty-btn" onclick="uiManager.changeDetailQty(-1)">−</button>
              <span id="detailQtyDisplay" class="qty-num">1</span>
              <button type="button" class="qty-btn" onclick="uiManager.changeDetailQty(1)">+</button>
            </div>

            <button type="button" class="pdetail-cart-btn" onclick="uiManager.addDetailToCart(${product.id})">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Savatga qo'shish
            </button>

            <button type="button" class="pdetail-buy-now-btn" onclick="uiManager.openQuickBuyModal(${product.id})">
              1 bosishda xarid qilish
            </button>

            <button type="button" class="pdetail-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${product.id}" onclick="uiManager.toggleFavoriteCard(event, ${product.id})" title="Sevimlilarga qo'shish">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path class="heart-outline" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                <path class="heart-filled" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          <!-- Description -->
          <div class="pdetail-desc-box">
            <h4 class="pdetail-section-title">Mahsulot tavsifi</h4>
            <p class="pdetail-desc-text">${this.escapeHtml(product.description)}</p>
          </div>

          <!-- Specifications Table -->
          ${specsHtml ? `
            <div class="pdetail-specs-box">
              <h4 class="pdetail-section-title">Xususiyatlari</h4>
              <div class="pdetail-specs-list">
                ${specsHtml}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Similar Products Section -->
      ${similarProducts.length > 0 ? `
        <div class="pdetail-similar-section">
          <h3 class="similar-title">O'xshash mahsulotlar</h3>
          <div class="similar-grid">
            ${similarProducts.map(p => this.createProductCardHTML(p)).join('')}
          </div>
        </div>
      ` : ''}
    `;

    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  switchDetailThumb(src, btn) {
    const mainImg = document.getElementById('pdetailMainImg');
    if (mainImg) mainImg.src = src;

    const thumbs = document.querySelectorAll('.pdetail-thumb');
    thumbs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }

  calculateDetailInstallment(price, months, btn) {
    const display = document.getElementById('pdetailInstallmentVal');
    if (display) {
      display.textContent = calculateInstallment(price, months);
    }
    const pills = document.querySelectorAll('.month-pill');
    pills.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
  }

  changeDetailQty(delta) {
    const display = document.getElementById('detailQtyDisplay');
    if (!display) return;
    let qty = parseInt(display.textContent) || 1;
    qty = Math.max(1, qty + delta);
    display.textContent = qty;
  }

  addDetailToCart(productId) {
    const display = document.getElementById('detailQtyDisplay');
    const qty = display ? parseInt(display.textContent) || 1 : 1;
    const product = cartManager.addItem(productId, qty);
    this.showToast(`"${product.title.slice(0, 30)}..." (${qty} ta) savatga qo'shildi`, 'cart', () => {
      this.closeModal('productDetailModal');
      this.openCartModal();
    });
  }

  /* ==========================================================================
     SHOPPING CART MODAL & DRAWER
     ========================================================================== */
  openCartModal() {
    this.renderCartUI();
    const modal = document.getElementById('cartDrawerModal');
    if (modal) {
      modal.classList.add('open');
      document.body.classList.add('modal-open');
    }
  }

  renderCartUI() {
    const itemsContainer = document.getElementById('cartItemsList');
    const summaryContainer = document.getElementById('cartSummaryContent');
    const badgeCount = document.getElementById('cartDrawerCount');

    if (!itemsContainer || !summaryContainer) return;

    const items = cartManager.getItems();
    const totals = cartManager.getTotals();

    if (badgeCount) {
      badgeCount.textContent = totals.totalItems;
    }

    if (items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-art">🛍️</div>
          <h3 class="cart-empty-title">Savatingiz hozircha bo'sh</h3>
          <p class="cart-empty-sub">Bosh sahifadagi to'plamlardan yoki qidiruvdan foydalanib o'zingizga yoqqan mahsulotlarni tanlang</p>
          <button type="button" class="cart-empty-action-btn" onclick="uiManager.closeModal('cartDrawerModal')">
            Xarid qilishni boshlash
          </button>
        </div>
      `;
      summaryContainer.innerHTML = '';
      return;
    }

    // Top bulk actions
    const selectAllHtml = `
      <div class="cart-select-all-row">
        <label class="uz-checkbox-label">
          <input 
            type="checkbox" 
            id="cartSelectAllInput" 
            ${totals.allSelected ? 'checked' : ''} 
            onchange="cartManager.toggleSelectAll(this.checked); uiManager.renderCartUI();"
          />
          <span class="uz-checkbox-custom"></span>
          <span>Hammasini tanlash (${items.length})</span>
        </label>
        <button type="button" class="cart-clear-all-btn" onclick="uiManager.promptClearCart()">
          O'chirish
        </button>
      </div>
    `;

    // Item rows
    const itemsHtml = items.map(({ product, quantity, selected }) => {
      const itemTotal = product.price * quantity;
      return `
        <div class="cart-item-row" data-cart-item-id="${product.id}">
          <label class="uz-checkbox-label cart-item-check">
            <input 
              type="checkbox" 
              ${selected ? 'checked' : ''} 
              onchange="cartManager.toggleItemSelection(${product.id}); uiManager.renderCartUI();"
            />
            <span class="uz-checkbox-custom"></span>
          </label>

          <img 
            src="${product.image}" 
            alt="${this.escapeHtml(product.title)}" 
            class="cart-item-img" 
            onclick="uiManager.openProductModal(${product.id})"
            onerror="this.src='assets/images/placeholder.svg'"
          />

          <div class="cart-item-details">
            <h4 class="cart-item-title" onclick="uiManager.openProductModal(${product.id})">
              ${this.escapeHtml(product.title)}
            </h4>
            <div class="cart-item-seller">Sotuvchi: ${product.seller || 'Uzum Market'}</div>
            
            <div class="cart-item-pricing">
              <span class="cart-item-unit-price">${formatPrice(product.price)} / dona</span>
            </div>

            <div class="cart-item-bottom-bar">
              <!-- Stepper -->
              <div class="cart-qty-stepper">
                <button type="button" class="stepper-btn" onclick="cartManager.updateQuantity(${product.id}, ${quantity - 1}); uiManager.renderCartUI();">−</button>
                <span class="stepper-val">${quantity}</span>
                <button type="button" class="stepper-btn" onclick="cartManager.updateQuantity(${product.id}, ${quantity + 1}); uiManager.renderCartUI();">+</button>
              </div>

              <!-- Item Sum -->
              <div class="cart-item-sum">${formatPrice(itemTotal)}</div>

              <!-- Delete button -->
              <button type="button" class="cart-item-del-btn" onclick="cartManager.removeItem(${product.id}); uiManager.renderCartUI();" title="O'chirish">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    itemsContainer.innerHTML = selectAllHtml + `<div class="cart-items-wrapper">${itemsHtml}</div>`;

    // Order Summary
    const promo = totals.appliedPromo;
    summaryContainer.innerHTML = `
      <div class="cart-summary-box">
        <h4 class="summary-box-title">Buyurtmangiz</h4>

        <div class="summary-line">
          <span>Mahsulotlar (${totals.totalItems} dona):</span>
          <span>${formatPrice(totals.originalTotal)}</span>
        </div>

        ${totals.savingsTotal > 0 ? `
          <div class="summary-line savings">
            <span>Tejovingiz:</span>
            <span>−${formatPrice(totals.savingsTotal)}</span>
          </div>
        ` : ''}

        <div class="summary-line">
          <span>Yetkazib berish:</span>
          <span class="free-tag">Bepul</span>
        </div>

        <!-- Promo code input -->
        <div class="promo-code-container">
          ${promo ? `
            <div class="promo-applied-badge">
              <span>🎟️ ${promo.code} (${promo.label})</span>
              <button type="button" class="promo-remove-btn" onclick="cartManager.removePromo(); uiManager.renderCartUI();">✕</button>
            </div>
          ` : `
            <div class="promo-input-group">
              <input type="text" id="promoInput" placeholder="Promo-kod (UZUM10, BAHOR)" />
              <button type="button" class="promo-apply-btn" onclick="uiManager.handleApplyPromo()">Qo'llash</button>
            </div>
          `}
        </div>

        <div class="summary-divider"></div>

        <div class="summary-line grand-total">
          <span>Jami to'lov:</span>
          <span class="grand-price">${formatPrice(totals.grandTotal)}</span>
        </div>

        <button 
          type="button" 
          class="checkout-submit-btn ${totals.totalItems === 0 ? 'disabled' : ''}" 
          ${totals.totalItems === 0 ? 'disabled' : ''}
          onclick="uiManager.openCheckoutModal()"
        >
          Rasmiylashtirishga o'tish
        </button>

        <div class="delivery-time-hint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A344" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Buyurtmangiz topshirish punktiga ertaga yetib boradi
        </div>
      </div>
    `;
  }

  handleApplyPromo() {
    const input = document.getElementById('promoInput');
    if (!input) return;
    const res = cartManager.applyPromo(input.value);
    if (res.success) {
      this.showToast(res.message, 'success');
      this.renderCartUI();
    } else {
      this.showToast(res.message, 'warning');
    }
  }

  promptClearCart() {
    if (confirm("Savatingizdagi barcha mahsulotlarni o'chirishni istaysizmi?")) {
      cartManager.clear();
      this.renderCartUI();
      this.showToast("Savat tozalandi", "info");
    }
  }

  /* ==========================================================================
     CHECKOUT FLOW
     ========================================================================== */
  openCheckoutModal() {
    const totals = cartManager.getTotals();
    if (totals.totalItems === 0) {
      this.showToast("Xaridni rasmiylashtirish uchun kamida 1 ta mahsulot tanlang", "warning");
      return;
    }

    const modal = document.getElementById('checkoutModal');
    const container = document.getElementById('checkoutModalContent');
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="checkout-layout">
        <h3 class="checkout-title">Buyurtmani rasmiylashtirish</h3>

        <form id="checkoutForm" onsubmit="uiManager.submitCheckout(event)">
          <!-- Delivery Method -->
          <div class="checkout-section">
            <h4 class="checkout-sec-title">1. Yetkazib berish usuli</h4>
            <div class="delivery-tabs">
              <label class="delivery-tab active">
                <input type="radio" name="deliveryMethod" value="pvz" checked />
                <div>
                  <strong>Topshirish punktiga (Bepul)</strong>
                  <p>Ertagayoq eng yaqin Uzum punktidan oling</p>
                </div>
              </label>
              <label class="delivery-tab">
                <input type="radio" name="deliveryMethod" value="courier" />
                <div>
                  <strong>Kuryer orqali (20 000 so'm)</strong>
                  <p>Eshikkacha tezkor yetkazib berish</p>
                </div>
              </label>
            </div>

            <div class="form-group" style="margin-top: 12px;">
              <label class="form-label">Yetkazib berish manzili / Punkti</label>
              <input type="text" class="form-input" required value="${this.currentCity}, Amir Temur shoh ko'chasi 105-bino" />
            </div>
          </div>

          <!-- Recipient Info -->
          <div class="checkout-section">
            <h4 class="checkout-sec-title">2. Qabul qiluvchi ma'lumotlari</h4>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Ism va Familiya</label>
                <input type="text" class="form-input" required value="${this.currentUser ? this.currentUser.name : 'Azizbek Rahimov'}" />
              </div>
              <div class="form-group">
                <label class="form-label">Telefon raqam</label>
                <input type="tel" class="form-input" required value="${this.currentUser ? this.currentUser.phone : '+998 90 123 45 67'}" />
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="checkout-section">
            <h4 class="checkout-sec-title">3. To'lov turi</h4>
            <div class="payment-options-grid">
              <label class="pay-opt-card active">
                <input type="radio" name="paymentType" value="card" checked />
                <span>💳 Karta orqali (Uzcard / Humo)</span>
              </label>
              <label class="pay-opt-card">
                <input type="radio" name="paymentType" value="cash" />
                <span>💵 Qabul qilganda naqd pul</span>
              </label>
              <label class="pay-opt-card">
                <input type="radio" name="paymentType" value="nasiya" />
                <span>🟡 Uzum Nasiya (Muddatli to'lov)</span>
              </label>
            </div>
          </div>

          <!-- Summary and Submit -->
          <div class="checkout-footer-bar">
            <div class="checkout-total-val">
              <span>To'lov uchun:</span>
              <strong>${formatPrice(totals.grandTotal)}</strong>
            </div>
            <button type="submit" class="checkout-confirm-btn">
              Buyurtmani tasdiqlash
            </button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  submitCheckout(e) {
    e.preventDefault();
    const orderId = 'UZ-' + Math.floor(100000 + Math.random() * 900000);
    const totals = cartManager.getTotals();

    // Clear cart
    cartManager.clear();
    this.closeModal('checkoutModal');
    this.closeModal('cartDrawerModal');

    // Show celebratory order success modal
    this.showOrderSuccessModal(orderId, totals.grandTotal);
  }

  showOrderSuccessModal(orderId, total) {
    const modal = document.getElementById('orderSuccessModal');
    const container = document.getElementById('orderSuccessContent');
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="success-order-box">
        <div class="success-order-icon">🎉</div>
        <h3 class="success-order-title">Buyurtmangiz qabul qilindi!</h3>
        <p class="success-order-num">Buyurtma raqami: <strong>#${orderId}</strong></p>
        <p class="success-order-desc">
          To'lov summasi: <strong>${formatPrice(total)}</strong><br/>
          Yetkazib berish: <strong>Ertaga soat 18:00 gacha</strong>
        </p>
        <div class="success-order-actions">
          <button type="button" class="success-order-btn" onclick="uiManager.closeModal('orderSuccessModal')">
            Xaridlarni davom ettirish
          </button>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  /* ==========================================================================
     QUICK 1-CLICK BUY MODAL
     ========================================================================== */
  openQuickBuyModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const modal = document.getElementById('quickBuyModal');
    const container = document.getElementById('quickBuyContent');
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="quick-buy-box">
        <h3 class="quick-buy-title">1 marta bosishda xarid qilish</h3>
        
        <div class="quick-buy-prod-row">
          <img src="${product.image}" alt="${this.escapeHtml(product.title)}" class="quick-buy-img" onerror="this.src='assets/images/placeholder.svg'"/>
          <div>
            <div class="quick-buy-prod-name">${this.escapeHtml(product.title)}</div>
            <div class="quick-buy-prod-price">${formatPrice(product.price)}</div>
          </div>
        </div>

        <form onsubmit="uiManager.submitQuickBuy(event, ${product.id})">
          <div class="form-group">
            <label class="form-label">Ismingiz</label>
            <input type="text" class="form-input" required value="${this.currentUser ? this.currentUser.name : ''}" placeholder="Ismingizni kiriting" />
          </div>

          <div class="form-group">
            <label class="form-label">Telefon raqamingiz</label>
            <input type="tel" class="form-input" required value="${this.currentUser ? this.currentUser.phone : '+998 '}" placeholder="+998 90 123 45 67" />
          </div>

          <div class="form-group">
            <label class="form-label">Yetkazib berish manzili</label>
            <input type="text" class="form-input" required placeholder="Shahar, tuman, ko'cha" value="${this.currentCity}" />
          </div>

          <button type="submit" class="quick-buy-submit-btn">
            Buyurtma berish (${formatPrice(product.price)})
          </button>
        </form>
      </div>
    `;

    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  submitQuickBuy(e, productId) {
    e.preventDefault();
    const product = getProductById(productId);
    const orderId = 'UZ-' + Math.floor(100000 + Math.random() * 900000);
    this.closeModal('quickBuyModal');
    this.closeModal('productDetailModal');
    this.showOrderSuccessModal(orderId, product.price);
  }

  /* ==========================================================================
     FAVORITES MODAL / VIEW
     ========================================================================== */
  openFavoritesModal() {
    this.renderFavoritesUI();
    const modal = document.getElementById('favoritesModal');
    if (modal) {
      modal.classList.add('open');
      document.body.classList.add('modal-open');
    }
  }

  renderFavoritesUI() {
    const container = document.getElementById('favoritesListContent');
    if (!container) return;

    const list = favoritesManager.getFavoriteProducts();

    if (list.length === 0) {
      container.innerHTML = `
        <div class="fav-empty-state">
          <div class="fav-empty-icon">💜</div>
          <h3 class="fav-empty-title">Siz yoqtirgan mahsulotlar hali yo'q</h3>
          <p class="fav-empty-desc">Mahsulot kartochkasidagi yurakcha belgisini bosib sevimli tovarlaringizni shu yerda saqlang</p>
          <button type="button" class="fav-empty-action-btn" onclick="uiManager.closeModal('favoritesModal')">
            Xarid qilishni boshlash
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="fav-header-actions">
        <span class="fav-header-count">Saralanganlar: ${list.length} ta mahsulot</span>
        <button type="button" class="fav-add-all-btn" onclick="uiManager.addAllFavoritesToCart()">
          Barchasini savatga qo'shish
        </button>
      </div>
      <div class="uz-product-grid">
        ${list.map(p => this.createProductCardHTML(p)).join('')}
      </div>
    `;
  }

  addAllFavoritesToCart() {
    const list = favoritesManager.getFavoriteProducts();
    list.forEach(p => cartManager.addItem(p.id, 1));
    this.showToast(`${list.length} ta mahsulot savatga qo'shildi`, 'cart', () => {
      this.closeModal('favoritesModal');
      this.openCartModal();
    });
  }

  /* ==========================================================================
     AUTH / LOGIN MODAL
     ========================================================================== */
  openAuthModal() {
    const modal = document.getElementById('authModal');
    const container = document.getElementById('authModalContent');
    if (!modal || !container) return;

    if (this.currentUser) {
      // User is logged in -> Show Profile
      container.innerHTML = `
        <div class="auth-profile-box">
          <div class="profile-avatar">👤</div>
          <h3 class="profile-name">${this.currentUser.name}</h3>
          <div class="profile-phone">${this.currentUser.phone}</div>

          <div class="profile-quick-stats">
            <div class="profile-stat-item">
              <span class="stat-num">${cartManager.cart.length}</span>
              <span class="stat-label">Savatdagi</span>
            </div>
            <div class="profile-stat-item">
              <span class="stat-num">${favoritesManager.favorites.length}</span>
              <span class="stat-label">Saralangan</span>
            </div>
            <div class="profile-stat-item">
              <span class="stat-num">3 ta</span>
              <span class="stat-label">Buyurtmalar</span>
            </div>
          </div>

          <div class="profile-actions-list">
            <button class="profile-action-btn" onclick="uiManager.closeModal('authModal'); uiManager.openCartModal();">
              🛍️ Savatim
            </button>
            <button class="profile-action-btn" onclick="uiManager.closeModal('authModal'); uiManager.openFavoritesModal();">
              💜 Saralanganlar
            </button>
            <button class="profile-action-btn" onclick="uiManager.showToast('Buyurtmalar tarixi sahifasi', 'info')">
              📦 Buyurtmalarim
            </button>
          </div>

          <button type="button" class="profile-logout-btn" onclick="uiManager.handleLogout()">
            Hisobdan chiqish
          </button>
        </div>
      `;
    } else {
      // Show Phone login screen
      container.innerHTML = `
        <div class="auth-login-box">
          <h3 class="auth-box-title">Telefon raqamini kiriting</h3>
          <p class="auth-box-sub">Tasdiqlash kodini SMS orqali yuboramiz</p>

          <form id="authPhoneForm" onsubmit="uiManager.submitAuthPhone(event)">
            <div class="phone-input-wrap">
              <span class="phone-prefix">+998</span>
              <input 
                type="tel" 
                id="authPhoneInput" 
                class="phone-field" 
                placeholder="90 123 45 67" 
                maxlength="12" 
                required 
                autofocus
              />
            </div>
            <button type="submit" class="auth-submit-btn">Kodni olish</button>
          </form>

          <div class="auth-terms-hint">
            Kirish orqali siz Uzum Market <a href="javascript:void(0)">Foydalanish qoidalariga</a> rozilik bildirasiz.
          </div>
        </div>
      `;
    }

    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  submitAuthPhone(e) {
    e.preventDefault();
    const phoneInput = document.getElementById('authPhoneInput');
    const phone = '+998 ' + (phoneInput ? phoneInput.value : '90 123 45 67');

    const container = document.getElementById('authModalContent');
    if (!container) return;

    // Show SMS Code Screen
    container.innerHTML = `
      <div class="auth-sms-box">
        <h3 class="auth-box-title">Kodni kiriting</h3>
        <p class="auth-box-sub">Kodni <strong>${phone}</strong> raqamiga yubordik (Test kodi: <strong>1234</strong>)</p>

        <form id="authSmsForm" onsubmit="uiManager.submitAuthCode(event, '${phone}')">
          <div class="sms-inputs-row">
            <input type="text" class="sms-code-input" maxlength="1" value="1" autofocus />
            <input type="text" class="sms-code-input" maxlength="1" value="2" />
            <input type="text" class="sms-code-input" maxlength="1" value="3" />
            <input type="text" class="sms-code-input" maxlength="1" value="4" />
          </div>

          <button type="submit" class="auth-submit-btn">Tasdiqlash</button>
        </form>

        <button type="button" class="auth-resend-btn" onclick="uiManager.showToast('Yangi SMS yuborildi', 'info')">
          Kodni qayta yuborish (0:59)
        </button>
      </div>
    `;
  }

  submitAuthCode(e, phone) {
    e.preventDefault();
    this.currentUser = {
      name: "Azizbek Rahimov",
      phone: phone,
      city: this.currentCity
    };
    localStorage.setItem('uzum_user_v1', JSON.stringify(this.currentUser));
    this.updateUserUI();
    this.closeModal('authModal');
    this.showToast(`Xush kelibsiz, ${this.currentUser.name}!`, 'success');
  }

  handleLogout() {
    this.currentUser = null;
    localStorage.removeItem('uzum_user_v1');
    this.updateUserUI();
    this.closeModal('authModal');
    this.showToast("Hisobdan muvaffaqiyatli chiqildi", "info");
  }

  updateUserUI() {
    const userBtnText = document.querySelectorAll('.user-profile-name');
    userBtnText.forEach(el => {
      el.textContent = this.currentUser ? this.currentUser.name.split(' ')[0] : 'Kirish';
    });
  }

  /* ==========================================================================
     CITY SELECTOR MODAL
     ========================================================================== */
  setupCitySelector() {
    const cityBtn = document.getElementById('headerCityBtn');
    if (cityBtn) {
      cityBtn.addEventListener('click', () => {
        this.openCityModal();
      });
    }
  }

  openCityModal() {
    const modal = document.getElementById('cityModal');
    const container = document.getElementById('cityModalContent');
    if (!modal || !container) return;

    const cities = [
      "Toshkent", "Samarqand", "Buxoro", "Andijon", "Farg'ona", 
      "Namangan", "Qarshi", "Nukus", "Urganch", "Jizzax", 
      "Navoiy", "Termiz", "Guliston", "Xiva", "Qo'qon"
    ];

    container.innerHTML = `
      <div class="city-selector-box">
        <h3 class="city-box-title">Yetkazib berish shahrini tanlang</h3>
        <p class="city-box-sub">Shahringizga qarab tovarlar mavjudligi va yetkazib berish muddati aniqlanadi</p>
        
        <div class="city-search-box">
          <input type="text" id="citySearchInput" placeholder="Shaharni qidiring..." oninput="uiManager.filterCities(this.value)" />
        </div>

        <div class="city-grid" id="cityGridList">
          ${cities.map(c => `
            <button type="button" class="city-opt-btn ${c === this.currentCity ? 'active' : ''}" onclick="uiManager.selectCity('${c}')">
              ${c}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  filterCities(query) {
    const q = (query || '').toLowerCase().trim();
    const buttons = document.querySelectorAll('.city-opt-btn');
    buttons.forEach(btn => {
      const match = btn.textContent.toLowerCase().includes(q);
      btn.style.display = match ? 'block' : 'none';
    });
  }

  selectCity(cityName) {
    this.currentCity = cityName;
    localStorage.setItem('uzum_city_v1', cityName);
    this.updateCityUI();
    this.closeModal('cityModal');
    this.showToast(`Shahar o'zgartirildi: ${cityName}`, 'info');
  }

  updateCityUI() {
    const cityLabels = document.querySelectorAll('.current-city-label');
    cityLabels.forEach(el => {
      el.textContent = this.currentCity;
    });
  }

  /* ==========================================================================
     SEARCH & CATEGORY FILTERING
     ========================================================================== */
  filterByCategory(categorySlug) {
    this.currentCategory = categorySlug;
    
    // Update subheader active nav pills
    const navLinks = document.querySelectorAll('.subnav-item');
    navLinks.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-cat') === categorySlug);
    });

    const products = getProductsByCategory(categorySlug);
    this.displayFilteredProducts(products, categorySlug);
  }

  displayFilteredProducts(products, categorySlug) {
    const container = document.getElementById('mainProductsGrid');
    const titleEl = document.getElementById('mainSectionTitle');
    const badgeEl = document.getElementById('mainSectionCount');

    if (!container) return;

    if (titleEl) {
      const catObj = PRODUCTS.find(p => p.category === categorySlug);
      titleEl.textContent = categorySlug === 'all' ? "Barcha mahsulotlar" : (catObj ? catObj.categoryName : categorySlug);
    }

    if (badgeEl) {
      badgeEl.textContent = `${products.length} ta mahsulot`;
    }

    if (products.length === 0) {
      container.innerHTML = `
        <div class="search-empty-full">
          <div class="search-empty-icon">📦</div>
          <h3>Bu toifada mahsulotlar topilmadi</h3>
          <button type="button" class="search-clear-full-btn" onclick="uiManager.filterByCategory('all')">Barcha toifalarga qaytish</button>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(p => this.createProductCardHTML(p)).join('');
  }

  displaySearchResults(query, matches) {
    const searchSection = document.getElementById('searchResultsSection');
    const normalSections = document.getElementById('homePageSections');
    const resultsGrid = document.getElementById('searchResultsGrid');
    const title = document.getElementById('searchQueryTitle');
    const count = document.getElementById('searchResultsCount');

    if (!searchSection || !resultsGrid) return;

    if (normalSections) normalSections.style.display = 'none';
    searchSection.style.display = 'block';

    if (title) title.textContent = `"${query}" bo'yicha qidiruv natijalari`;
    if (count) count.textContent = `${matches.length} ta mahsulot`;

    if (matches.length === 0) {
      resultsGrid.innerHTML = `
        <div class="search-empty-full">
          <div class="search-empty-icon">🔍</div>
          <h3>Kechirasiz, hech narsa topilmadi</h3>
          <p>Boshqa so'z bilan qidirib ko'ring yoki bosh sahifaga qayting</p>
          <button type="button" class="search-clear-full-btn" onclick="uiManager.clearSearchFilter()">Bosh sahifaga qaytish</button>
        </div>
      `;
      return;
    }

    resultsGrid.innerHTML = matches.map(p => this.createProductCardHTML(p)).join('');
    searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  clearSearchFilter() {
    const searchSection = document.getElementById('searchResultsSection');
    const normalSections = document.getElementById('homePageSections');
    if (searchSection) searchSection.style.display = 'none';
    if (normalSections) normalSections.style.display = 'block';

    if (searchManager && searchManager.searchInput) {
      searchManager.searchInput.value = '';
    }
  }

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */
  showToast(message, type = 'info', actionCallback = null) {
    const container = document.getElementById('toastNotificationContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `uz-toast uz-toast-${type}`;

    let iconSvg = '';
    if (type === 'cart') {
      iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
    } else if (type === 'favorite') {
      iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    } else if (type === 'success') {
      iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-msg">${message}</div>
      ${actionCallback ? `<button type="button" class="toast-action-btn">O'tish</button>` : ''}
      <button type="button" class="toast-close-btn" aria-label="Yopish">✕</button>
    `;

    if (actionCallback) {
      const actBtn = toast.querySelector('.toast-action-btn');
      if (actBtn) {
        actBtn.addEventListener('click', () => {
          actionCallback();
          toast.remove();
        });
      }
    }

    const closeBtn = toast.querySelector('.toast-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.remove();
      });
    }

    container.appendChild(toast);

    // Auto remove after 3.8 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
      }
    }, 3800);
  }

  /* ==========================================================================
     MODALS UTILITY
     ========================================================================== */
  setupModalEvents() {
    // Backdrop click and Esc key to close all modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    const closeButtons = document.querySelectorAll('[data-close-modal]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = btn.getAttribute('data-close-modal');
        this.closeModal(modalId);
      });
    });

    const backdrops = document.querySelectorAll('.uz-modal-backdrop');
    backdrops.forEach(bd => {
      bd.addEventListener('click', () => {
        const modal = bd.closest('.uz-modal');
        if (modal) modal.classList.remove('open');
        document.body.classList.remove('modal-open');
      });
    });
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
    if (!document.querySelector('.uz-modal.open') && !document.querySelector('.catalog-mega-drawer.open')) {
      document.body.classList.remove('modal-open');
    }
  }

  closeAllModals() {
    document.querySelectorAll('.uz-modal.open').forEach(m => m.classList.remove('open'));
    this.closeCatalogMegaMenu();
    document.body.classList.remove('modal-open');
  }

  setupEventListeners() {
    // Header actions
    const cartTriggerBtns = document.querySelectorAll('.cart-open-trigger');
    cartTriggerBtns.forEach(btn => btn.addEventListener('click', () => this.openCartModal()));

    const favTriggerBtns = document.querySelectorAll('.fav-open-trigger');
    favTriggerBtns.forEach(btn => btn.addEventListener('click', () => this.openFavoritesModal()));

    const authTriggerBtns = document.querySelectorAll('.auth-open-trigger');
    authTriggerBtns.forEach(btn => btn.addEventListener('click', () => this.openAuthModal()));
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Global UI Instance
const uiManager = new UIManager();
