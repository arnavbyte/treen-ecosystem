/**
 * TREEN ECOSYSTEM — CLIENT SCRIPT ENGINE
 * Multi-page lightweight interaction: mobile navigation & mobile APK download stream handler.
 */

// ============================================================================
// 1. MOBILE NAVIGATION DRAWER
// ============================================================================
function initMobileNav() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const drawer = document.getElementById("mobileNavDrawer");
  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  });
}

// ============================================================================
// 2. APK DOWNLOAD FALLBACK FOR MOBILE BROWSERS
// Direct window assignment bypasses cross-origin redirect stalling on mobile.
// ============================================================================
function initApkDownloads() {
  document.querySelectorAll('a[href$=".apk"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const url = btn.getAttribute("href");
      if (url && url !== "#") {
        // Direct window assignment triggers the OS download manager on mobile Android
        window.location.assign(url);
      }
    });
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initApkDownloads();
});
