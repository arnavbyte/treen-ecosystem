/**
 * TREEN ECOSYSTEM — CLIENT SCRIPT ENGINE
 * Multi-page lightweight interaction: mobile navigation, mockup state, and WebCrypto verification.
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

  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  });
}

// ============================================================================
// 2. TREEN TASK MOCKUP INTERACTION (task.html)
// ============================================================================
function initTaskMockup() {
  const list = document.getElementById("mockupTaskList");
  const progressText = document.getElementById("capsuleProgressText");
  const progressPill = document.getElementById("capsuleProgressPill");
  const statusNote = document.getElementById("mockupStatusNote");

  if (!list) return;

  const rows = list.querySelectorAll(".task-row");

  function updateMockupState() {
    const checkedRows = list.querySelectorAll(".task-row.checked");
    const count = checkedRows.length;
    const total = 3;

    if (progressText) {
      if (count >= total) {
        progressText.textContent = `${count}/${total} Certified (Threshold Met)`;
      } else {
        progressText.textContent = `${count}/${total} Certified`;
      }
    }

    if (progressPill) {
      if (count >= total) {
        progressPill.classList.add("armed");
      } else {
        progressPill.classList.remove("armed");
      }
    }

    if (statusNote) {
      if (count >= total) {
        statusNote.innerHTML = '<span style="color: var(--accent-green); font-weight: 600;">✓ Gate Met: Daily milestone stamp logged at 11:59 PM.</span>';
      } else {
        statusNote.textContent = 'Completing 3+ tasks maintains momentum.';
      }
    }
  }

  rows.forEach(row => {
    row.addEventListener("click", () => {
      row.classList.toggle("checked");
      const timestampEl = row.querySelector(".task-timestamp");
      const isChecked = row.classList.contains("checked");

      if (timestampEl) {
        if (isChecked) {
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          timestampEl.textContent = `Completed at ${timeStr} · Certified`;
        } else {
          timestampEl.textContent = 'Pending · Tap to certify completion';
        }
      }

      updateMockupState();
    });
  });

  updateMockupState();
}

// ============================================================================
// 3. THE VAULT WEBCRYPTO VERIFICATION CONSOLE (vault.html)
// ============================================================================
const authenticVaultPayload = {
  header: "POPV-1.4.2",
  device_bound_entropy: "hw-9a8f4-e0c2-7718",
  created_at: "2026-10-03T04:15:00Z",
  streak_record: 14,
  tasks_certified: 42,
  active_collection: "batman_dc",
  tier_state: "Cadet",
  checksum_salt: "0x7F4A88B2"
};

let isTampered = false;
const VAULT_SECRET_KEY = "DEVICE_HARDWARE_BACKED_SECRET_ENTROPY";

async function computeSha256Hmac(messageStr, secretKeyStr) {
  try {
    const enc = new TextEncoder();
    const keyData = enc.encode(secretKeyStr);
    const key = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    const signature = await window.crypto.subtle.sign(
      "HMAC",
      key,
      enc.encode(messageStr)
    );
    const hashArray = Array.from(new Uint8Array(signature));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    return "8f9d6c34b12a8790c3e456d8123abef049281745263a8b4c9e1029384756ab12";
  }
}

async function initVaultConsole() {
  const previewEl = document.getElementById("vaultPayloadPreview");
  const hmacEl = document.getElementById("vaultHmacPreview");
  const cipherEl = document.getElementById("vaultCipherPreview");
  const tamperCheckbox = document.getElementById("vaultTamperCheckbox");
  const verifyBtn = document.getElementById("verifyVaultBtn");
  const resultBadge = document.getElementById("vaultResultBadge");

  if (!previewEl || !hmacEl) return;

  const payload = JSON.parse(JSON.stringify(authenticVaultPayload));
  const validHmac = await computeSha256Hmac(JSON.stringify(payload, null, 2), VAULT_SECRET_KEY);

  function renderPayload() {
    const currentData = JSON.parse(JSON.stringify(authenticVaultPayload));
    if (isTampered) {
      currentData.streak_record = 999;
      currentData.tier_state = "Legend (Forged)";
      previewEl.innerHTML = JSON.stringify(currentData, null, 2)
        .replace('"streak_record": 999', '<span style="color: #DC2626; font-weight: 700; background: rgba(239, 68, 68, 0.12); padding: 0 4px; border-radius: 3px;">"streak_record": 999  // &lt;-- FORGED BY TEXT EDITOR</span>');
      if (cipherEl) cipherEl.textContent = "7e4b901a8df9037cba5511... [Tampered ByteStream]";
    } else {
      previewEl.textContent = JSON.stringify(currentData, null, 2);
      if (cipherEl) cipherEl.textContent = "2c90a184f7b2c918ee0421... [Authenticated AES-256-CBC]";
    }
    hmacEl.textContent = validHmac.substring(0, 32) + "...";
  }

  if (tamperCheckbox) {
    tamperCheckbox.addEventListener("change", (e) => {
      isTampered = e.target.checked;
      renderPayload();
      if (resultBadge) {
        resultBadge.className = "verify-badge";
        resultBadge.innerHTML = '<span>Status: Payload State Changed (Run Verification)</span>';
      }
    });
  }

  if (verifyBtn && resultBadge) {
    verifyBtn.addEventListener("click", async () => {
      const currentData = JSON.parse(JSON.stringify(authenticVaultPayload));
      if (isTampered) {
        currentData.streak_record = 999;
        currentData.tier_state = "Legend (Forged)";
      }
      const calculatedHash = await computeSha256Hmac(JSON.stringify(currentData, null, 2), VAULT_SECRET_KEY);

      if (calculatedHash === validHmac && !isTampered) {
        resultBadge.className = "verify-badge valid";
        resultBadge.innerHTML = '<span>✓ Status: Valid (HMAC Matches) — Safe to Restore</span>';
      } else {
        resultBadge.className = "verify-badge invalid";
        resultBadge.innerHTML = '<span>✗ Status: Signature Mismatch — Tampered Streak Quarantined</span>';
      }
    });
  }

  renderPayload();
}

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initTaskMockup();
  initVaultConsole();
});
