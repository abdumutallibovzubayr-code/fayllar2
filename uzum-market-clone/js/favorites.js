/**
 * UZUM MARKET CLONE - FAVORITES (SEVIMLILAR) SYSTEM
 * Full localStorage persistence, animated heart buttons sync,
 * counter badges, and modal view.
 */

const FAVORITES_STORAGE_KEY = 'uzum_favorites_v1';

class FavoritesManager {
  constructor() {
    this.favorites = this.loadFavorites();
  }

  loadFavorites() {
    try {
      const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Favorites loading error:", e);
      return [];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(this.favorites));
      this.updateBadges();
      this.syncHeartIcons();
      window.dispatchEvent(new CustomEvent('uzum:favorites-updated', { detail: { favorites: this.favorites } }));
    } catch (e) {
      console.error("Favorites saving error:", e);
    }
  }

  isFavorite(productId) {
    const id = parseInt(productId);
    return this.favorites.includes(id);
  }

  toggleFavorite(productId) {
    const id = parseInt(productId);
    const index = this.favorites.indexOf(id);
    let added = false;

    if (index > -1) {
      this.favorites.splice(index, 1);
      added = false;
    } else {
      this.favorites.push(id);
      added = true;
    }

    this.saveFavorites();
    const product = getProductById(id);
    return { added, product };
  }

  removeFavorite(productId) {
    const id = parseInt(productId);
    this.favorites = this.favorites.filter(idNum => idNum !== id);
    this.saveFavorites();
  }

  clear() {
    this.favorites = [];
    this.saveFavorites();
  }

  getFavoriteProducts() {
    return this.favorites
      .map(id => getProductById(id))
      .filter(p => p !== undefined);
  }

  updateBadges() {
    const count = this.favorites.length;
    const badges = document.querySelectorAll('.fav-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
      if (count > 0) {
        badge.classList.remove('badge-pop');
        void badge.offsetWidth;
        badge.classList.add('badge-pop');
      }
    });
  }

  syncHeartIcons() {
    // Update all heart buttons on page
    const buttons = document.querySelectorAll('[data-fav-id]');
    buttons.forEach(btn => {
      const id = parseInt(btn.getAttribute('data-fav-id'));
      const active = this.isFavorite(id);
      if (active) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        btn.title = "Saralangandan o'chirish";
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
        btn.title = "Saralanganga qo'shish";
      }
    });
  }
}

// Global Favorites Instance
const favoritesManager = new FavoritesManager();
