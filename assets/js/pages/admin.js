window.PAGE_ADMIN = (function () {
  var currentFilter = "semua";
  function renderBackendState() {
    var el = document.getElementById("admin-backend-status");
    if (!el) {
      return;
    }
    var fbOk = window.PERSONAL_BACKEND_HELPERS.isFirebaseConfigured();
    var drvOk = window.PERSONAL_BACKEND_HELPERS.isDriveConfigured();
    el.innerHTML =
      "<strong>Status Isolasi Backend:</strong> " +
      (fbOk ? "Firebase RTDB Terhubung" : "Firebase RTDB Placeholder (Simulasi Lokal)") +
      " | " +
      (drvOk ? "Google Drive Bridge Terhubung" : "Google Drive Bridge Placeholder") +
      " &mdash; terisolasi dari proyek Musada.";
    var pwdGroup = document.getElementById("admin-password-group");
    if (pwdGroup) {
      pwdGroup.classList.toggle("hidden", !fbOk);
    }
  }
  function renderDashboardData() {
    var listEl = document.getElementById("admin-requests-list");
    if (!listEl) {
      return;
    }
    window.STORAGE_SERVICE.listAllRequests()
      .then(function (items) {
        var pendingCount = items.filter(function (i) { return i.status === "pending"; }).length;
        var approvedCount = items.filter(function (i) { return i.status === "approved"; }).length;
        var rejectedCount = items.filter(function (i) { return i.status === "rejected" || i.status === "revoked"; }).length;
        var mPending = document.getElementById("metric-pending");
        var mApproved = document.getElementById("metric-approved");
        var mRejected = document.getElementById("metric-rejected");
        if (mPending) { mPending.textContent = String(pendingCount); }
        if (mApproved) { mApproved.textContent = String(approvedCount); }
        if (mRejected) { mRejected.textContent = String(rejectedCount); }
        var filtered =
          currentFilter === "semua"
            ? items
            : items.filter(function (i) {
                return i.status === currentFilter;
              });
        if (filtered.length === 0) {
          listEl.innerHTML = '<div class="alert-box">Belum ada permohonan akses pada kategori ini.</div>';
          return;
        }
        listEl.innerHTML = filtered
          .map(function (item) {
            var st = window.DOM_UTILS.getRequestStatusMeta(item.status, { pending: "Menunggu" });
            var trackHtml = item.trackLabel
              ? '<div><strong>Bidang:</strong> ' + window.DOM_UTILS.escapeHtml(item.trackLabel) + "</div>"
              : "";
            return (
              '<article class="admin-request-card">' +
              '<div class="admin-request-top">' +
              '<div><strong>' + window.DOM_UTILS.escapeHtml(item.code) + "</strong> &mdash; " + window.DOM_UTILS.escapeHtml(item.requesterName) + " (" + window.DOM_UTILS.escapeHtml(item.organization || "Pribadi") + ")</div>" +
              '<span class="pill-tag ' + st.cls + '">' + window.DOM_UTILS.escapeHtml(st.text) + "</span>" +
              "</div>" +
              '<div class="card-meta"><span>Email: <strong>' + window.DOM_UTILS.escapeHtml(item.requesterEmail) + "</strong></span><span>Diajukan: " + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.formatDateTimeId(item.createdAt)) + "</span></div>" +
              trackHtml +
              "<div><strong>Keperluan:</strong> " + window.DOM_UTILS.escapeHtml(item.purpose) + "</div>" +
              '<div><strong>Catatan:</strong> ' + window.DOM_UTILS.escapeHtml(item.adminNote || "-") + "</div>" +
              '<div class="admin-actions-row mt-12">' +
              '<button type="button" class="btn btn-primary btn-sm" data-admin-action="approved" data-req-code="' + window.DOM_UTILS.escapeHtml(item.code) + '">Setujui &amp; Kirim Akses</button>' +
              '<button type="button" class="btn btn-outline btn-sm" data-admin-action="rejected" data-req-code="' + window.DOM_UTILS.escapeHtml(item.code) + '">Tolak Permohonan</button>' +
              "</div></article>"
            );
          })
          .join("");
        listEl.querySelectorAll("[data-admin-action]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var code = btn.getAttribute("data-req-code");
            var actionStatus = btn.getAttribute("data-admin-action");
            var defaultNote =
              actionStatus === "approved"
                ? "Disetujui oleh pemilik. Akses dokumen dikirimkan ke email pemohon."
                : "Permohonan akses belum dapat disetujui oleh pemilik.";
            btn.disabled = true;
            window.STORAGE_SERVICE.updateRequestStatus(code, actionStatus, defaultNote)
              .then(function () {
                renderDashboardData();
              })
              .catch(function (err) {
                alert(err.message || "Gagal memperbarui status permohonan.");
                renderDashboardData();
              });
          });
        });
      })
      .catch(function (err) {
        listEl.innerHTML = '<div class="alert-box alert-box-error">' + window.DOM_UTILS.escapeHtml(err.message) + "</div>";
      });
  }
  function updateAuthViews() {
    var session = window.STORAGE_SERVICE.getSession();
    var loginView = document.getElementById("admin-login-section");
    var dashView = document.getElementById("admin-dashboard-section");
    var userLabel = document.getElementById("admin-logged-email");
    if (!loginView || !dashView) {
      return;
    }
    if (session) {
      loginView.classList.add("hidden");
      dashView.classList.remove("hidden");
      if (userLabel) {
        userLabel.textContent = session.email + " (" + session.mode + ")";
      }
      renderDashboardData();
    } else {
      loginView.classList.remove("hidden");
      dashView.classList.add("hidden");
    }
  }
  function bindEvents() {
    var form = document.getElementById("admin-login-form");
    var errBox = document.getElementById("admin-login-error");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = document.getElementById("admin-email").value.trim();
        var pwdEl = document.getElementById("admin-password");
        var password = pwdEl ? pwdEl.value : "";
        window.STORAGE_SERVICE.signInAdmin(email, password)
          .then(function () {
            if (errBox) {
              errBox.classList.add("hidden");
            }
            updateAuthViews();
          })
          .catch(function (err) {
            if (errBox) {
              errBox.classList.remove("hidden");
              errBox.textContent = err.message || "Login gagal.";
            }
          });
      });
    }
    var logoutBtn = document.getElementById("admin-logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        window.STORAGE_SERVICE.signOutAdmin();
        updateAuthViews();
      });
    }
    document.querySelectorAll("[data-admin-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-admin-filter]").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-admin-filter");
        renderDashboardData();
      });
    });
  }
  function init() {
    renderBackendState();
    bindEvents();
    updateAuthViews();
  }
  return { init: init };
})();
