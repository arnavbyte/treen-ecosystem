/**
 * TREEN ECOSYSTEM — CLIENT SCRIPT ENGINE
 * Multi-page lightweight interaction: mobile navigation, APK download stream handler,
 * and contact email reveal with clipboard copying.
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
// 3. CONTACT REVEAL & CLIPBOARD COPY HANDLER
// ============================================================================
function initContactReveal() {
  const contactBtn = document.getElementById("contactBtn");
  const contactBox = document.getElementById("contactBox");
  if (!contactBtn || !contactBox) return;

  // Build the email address from two parts to prevent simple bot scraping
  const localPart = "treen.ecosystem";
  const domainPart = "gmail.com";
  const contactEmail = localPart + "@" + domainPart;

  function renderBoxContent() {
    if (!contactBox.hasChildNodes()) {
      const emailSpan = document.createElement("span");
      emailSpan.className = "contact-email";
      emailSpan.textContent = contactEmail;

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "contact-copy-btn";
      copyBtn.textContent = "Copy";
      copyBtn.setAttribute("aria-label", "Copy email address to clipboard");

      let timer = null;
      copyBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(contactEmail);
          } else {
            const tempInput = document.createElement("textarea");
            tempInput.value = contactEmail;
            tempInput.style.position = "fixed";
            tempInput.style.opacity = "0";
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
          }
          copyBtn.textContent = "Copied";
          clearTimeout(timer);
          timer = setTimeout(() => {
            copyBtn.textContent = "Copy";
          }, 2000);
        } catch (err) {
          console.error("Clipboard copy failed", err);
        }
      });

      contactBox.appendChild(emailSpan);
      contactBox.appendChild(copyBtn);
    }
  }

  function openBox() {
    renderBoxContent();
    contactBox.hidden = false;
    contactBtn.setAttribute("aria-expanded", "true");
  }

  function closeBox() {
    contactBox.hidden = true;
    contactBtn.setAttribute("aria-expanded", "false");
  }

  function toggleBox() {
    if (contactBox.hidden) {
      openBox();
    } else {
      closeBox();
    }
  }

  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleBox();
  });

  contactBtn.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      toggleBox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !contactBox.hidden) {
      closeBox();
      contactBtn.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!contactBox.hidden && !contactBox.contains(e.target) && e.target !== contactBtn) {
      closeBox();
    }
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initApkDownloads();
  initContactReveal();
});
