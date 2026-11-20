/**
 * UZUM MARKET CLONE - SEARCH SYSTEM
 * Live suggestions dropdown, debounced instant search, query highlight,
 * popular chips, and dedicated results view.
 */

class SearchManager {
  constructor() {
    this.searchInput = null;
    this.searchDropdown = null;
    this.clearBtn = null;
    this.debounceTimer = null;
    this.currentQuery = '';
    this.popularQueries = [
      "iPhone 15",
      "AirPods",
      "Xiaomi",
      "Krossovka",
      "Hoodie",
      "Blender",
      "Dyson",
      "Lego",
      "Qahva"
    ];
  }

  init() {
    this.searchInput = document.getElementById('mainSearchInput');
    this.searchDropdown = document.getElementById('searchSuggestionsDropdown');
    this.clearBtn = document.getElementById('searchClearBtn');

    if (!this.searchInput || !this.searchDropdown) return;

    this.searchInput.addEventListener('input', (e) => {
      this.handleInput(e.target.value);
    });

    this.searchInput.addEventListener('focus', () => {
      this.showDropdown(this.searchInput.value);
    });

    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        this.clear();
      });
    }

    // Close dropdown when clicked outside
    document.addEventListener('click', (e) => {
      const isInside = this.searchInput.contains(e.target) || this.searchDropdown.contains(e.target);
      if (!isInside) {
        this.hideDropdown();
      }
    });

    // Handle form submit / Enter key
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.executeSearch(this.searchInput.value);
      });
    }
  }

  handleInput(val) {
    const query = val.trim();
    this.currentQuery = query;

    if (this.clearBtn) {
      this.clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
    }

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.showDropdown(query);
    }, 180);
  }

  searchProducts(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(p => {
      return p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        (p.seller && p.seller.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q));
    });
  }

  showDropdown(query) {
    if (!this.searchDropdown) return;

    if (!query || query.length === 0) {
      this.renderPopularSuggestions();
      this.searchDropdown.style.display = 'block';
      return;
    }

    const matches = this.searchProducts(query);
    this.renderSearchResultsPreview(query, matches);
    this.searchDropdown.style.display = 'block';
  }

  hideDropdown() {
    if (this.searchDropdown) {
      this.searchDropdown.style.display = 'none';
    }
  }

  clear() {
    if (this.searchInput) {
      this.searchInput.value = '';
      this.searchInput.focus();
    }
    if (this.clearBtn) {
      this.clearBtn.style.display = 'none';
    }
    this.currentQuery = '';
    this.showDropdown('');
    // If a search view was active, restore normal sections
    if (window.uiManager) {
      window.uiManager.clearSearchFilter();
    }
  }

  renderPopularSuggestions() {
    let html = `
      <div class="search-drop-section">
        <div class="search-drop-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7000FF" stroke-width="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
          Ommabop qidiruvlar
        </div>
        <div class="search-chips">
          ${this.popularQueries.map(item => `
            <button type="button" class="search-chip" onclick="searchManager.selectChip('${item}')">
              ${item}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    this.searchDropdown.innerHTML = html;
  }

  renderSearchResultsPreview(query, matches) {
    if (matches.length === 0) {
      this.searchDropdown.innerHTML = `
        <div class="search-empty">
          <div class="search-empty-icon">🔍</div>
          <div class="search-empty-title">"${this.escapeHtml(query)}" bo'yicha hech narsa topilmadi</div>
          <div class="search-empty-desc">So'rovni to'g'ri yozganingizni tekshiring yoki ommabop so'rovlardan foydalaning</div>
        </div>
      `;
      return;
    }

    const previewList = matches.slice(0, 5);
    const highlightedMatches = previewList.map(p => {
      const highlightedTitle = this.highlightMatch(p.title, query);
      return `
        <div class="search-item" onclick="searchManager.openProductAndClose(${p.id})">
          <img src="${p.image}" alt="${p.title}" class="search-item-img" onerror="this.src='assets/images/placeholder.svg'" />
          <div class="search-item-info">
            <div class="search-item-title">${highlightedTitle}</div>
            <div class="search-item-cat">${p.categoryName}</div>
          </div>
          <div class="search-item-price">${formatPrice(p.price)}</div>
        </div>
      `;
    }).join('');

    this.searchDropdown.innerHTML = `
      <div class="search-drop-results">
        <div class="search-drop-header">
          <span>Topilgan mahsulotlar (${matches.length})</span>
        </div>
        <div class="search-items-list">
          ${highlightedMatches}
        </div>
        <button type="button" class="search-view-all-btn" onclick="searchManager.executeSearch('${this.escapeHtml(query)}')">
          Barcha natijalarni ko'rish (${matches.length} ta) →
        </button>
      </div>
    `;
  }

  selectChip(text) {
    if (this.searchInput) {
      this.searchInput.value = text;
      this.searchInput.focus();
    }
    this.executeSearch(text);
  }

  openProductAndClose(id) {
    this.hideDropdown();
    if (window.uiManager) {
      window.uiManager.openProductModal(id);
    }
  }

  executeSearch(query) {
    const q = (query || '').trim();
    if (!q) return;

    this.hideDropdown();
    if (this.searchInput) {
      this.searchInput.value = q;
    }
    if (this.clearBtn) {
      this.clearBtn.style.display = 'flex';
    }

    const matches = this.searchProducts(q);
    if (window.uiManager) {
      window.uiManager.displaySearchResults(q, matches);
    }
  }

  highlightMatch(text, query) {
    if (!query) return this.escapeHtml(text);
    const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
    return this.escapeHtml(text).replace(regex, '<mark class="search-highlight">$1</mark>');
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

  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// Global Search Instance
const searchManager = new SearchManager();
