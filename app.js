/**
 * TREEN ECOSYSTEM — CLIENT SCRIPT ENGINE
 * Multi-page lightweight interaction: mobile navigation & task mockup preview.
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
  const streakText = document.getElementById("mockupStreakText");

  if (!list) return;

  const rows = list.querySelectorAll(".task-row");

  function updateMockupState() {
    const checkedRows = list.querySelectorAll(".task-row.checked");
    const count = checkedRows.length;
    const threshold = 3;

    if (progressText) {
      if (count >= threshold) {
        progressText.textContent = `${count}/${threshold} Certified (Threshold Met)`;
      } else {
        progressText.textContent = `${count}/${threshold} Certified`;
      }
    }

    if (progressPill) {
      if (count >= threshold) {
        progressPill.classList.add("armed");
      } else {
        progressPill.classList.remove("armed");
      }
    }

    if (statusNote) {
      if (count >= threshold) {
        statusNote.innerHTML = '<span style="color: var(--accent-green); font-weight: 600;">✓ Threshold Met: Daily milestone badge logged at 11:59 PM.</span>';
      } else {
        statusNote.textContent = 'Completing 3+ tasks maintains momentum.';
      }
    }

    if (streakText) {
      if (count >= threshold) {
        streakText.textContent = "15 DAYS (INCREMENTED)";
      } else {
        streakText.textContent = "14 DAYS";
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
          timestampEl.textContent = `Completed at ${timeStr} · Checkpoint Certified`;
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
// INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initTaskMockup();
});
