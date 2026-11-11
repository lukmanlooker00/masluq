window.PAGE_KOLABORASI = (function () {
  function getStatusLabel(status) {
    if (status === "approved") {
      return { text: "Disetujui", cls: "pill-tag-green" };
    }
    if (status === "rejected" || status === "revoked") {
      return { text: "Ditolak / Dicabut", cls: "pill-tag-red" };
    }
    return { text: "Menunggu Persetujuan", cls: "pill-tag-amber" };
  }
  function populateTrackSelect() {
    var sel = document.getElementById("req-track");
    if (!sel) {
      return;
    }
    var opts = window.SITE_DATA.collaborationOptions || [];
    sel.innerHTML = opts
      .map(function (o) {
        return '<option value="' + window.DOM_UTILS.escapeHtml(o.value) + '">' + window.DOM_UTILS.escapeHtml(o.label) + "</option>";
      })
      .join("");
    var param = window.DOM_UTILS.getQueryParam("bidang");
    if (param) {
      var match = opts.find(function (o) {
        return o.value === param;
      });
      if (match) {
        sel.value = match.value;
      }
    }
  }
  function renderStatusBadge() {
    var infoEl = document.getElementById("kolaborasi-mode-info");
    if (!infoEl) {
      return;
    }
    var fbOk = window.PERSONAL_BACKEND_HELPERS.isFirebaseConfigured();
    var drvOk = window.PERSONAL_BACKEND_HELPERS.isDriveConfigured();
    if (fbOk && drvOk) {
      infoEl.className = "alert-box alert-box-success";
      infoEl.textContent = "Terhubung ke backend pribadi (Firebase RTDB & Google Drive Bridge).";
    } else {
      infoEl.className = "alert-box alert-box-warning";
      infoEl.textContent = "Mode Uji Lokal: Pengaturan Firebase & Google Drive pada backend-config.js masih placeholder (terpisah dari proyek Musada). Pengajuan sementara tersimpan di peramban ini.";
    }
  }
  function bindRequestForm() {
    var form = document.getElementById("lampiran-request-form");
    var feedback = document.getElementById("lampiran-form-feedback");
    if (!form || !feedback) {
      return;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var trackEl = document.getElementById("req-track");
      var trackVal = trackEl ? trackEl.value : "lampiran";
      var trackLabel = trackEl && trackEl.selectedIndex >= 0 ? trackEl.options[trackEl.selectedIndex].text : "Umum";
      var nameVal = document.getElementById("req-name").value.trim();
      var emailVal = document.getElementById("req-email").value.trim();
      var orgVal = document.getElementById("req-org").value.trim();
      var purposeVal = document.getElementById("req-purpose").value.trim();
      if (!nameVal || !emailVal || !purposeVal) {
        feedback.className = "alert-box alert-box-error";
        feedback.classList.remove("hidden");
        feedback.textContent = "Mohon lengkapi nama lengkap, email aktif, dan keperluan pengajuan.";
        return;
      }
      var submitBtn = document.getElementById("req-submit-btn");
      submitBtn.disabled = true;
      window.STORAGE_SERVICE.submitRequest({
        track: trackVal,
        trackLabel: trackLabel,
        requesterName: nameVal,
        requesterEmail: emailVal,
        organization: orgVal,
        purpose: purposeVal
      })
        .then(function (res) {
          submitBtn.disabled = false;
          feedback.className = "alert-box alert-box-success";
          feedback.classList.remove("hidden");
          feedback.innerHTML =
            "<strong>Pengajuan berhasil dicatat.</strong><br>" +
            "Bidang: <strong>" + window.DOM_UTILS.escapeHtml(res.data.trackLabel) + "</strong><br>" +
            "Kode Tiket Anda: <strong>" + window.DOM_UTILS.escapeHtml(res.data.code) + "</strong><br>" +
            "Email Terdaftar: " + window.DOM_UTILS.escapeHtml(res.data.requesterEmail) + "<br>" +
            "Status saat ini: <strong>Menunggu Persetujuan Pemilik</strong>. Simpan kode tiket ini untuk memeriksa status persetujuan.";
          form.reset();
          populateTrackSelect();
          var checkInput = document.getElementById("status-query-input");
          if (checkInput) {
            checkInput.value = res.data.code;
          }
        })
        .catch(function (err) {
          submitBtn.disabled = false;
          feedback.className = "alert-box alert-box-error";
          feedback.classList.remove("hidden");
          feedback.textContent = err.message || "Terjadi kendala saat mengirim pengajuan.";
        });
    });
  }
  function bindStatusLookup() {
    var form = document.getElementById("status-check-form");
    var resultBox = document.getElementById("status-check-result");
    if (!form || !resultBox) {
      return;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var query = document.getElementById("status-query-input").value.trim();
      if (!query) {
        return;
      }
      window.STORAGE_SERVICE.findRequestByCodeOrEmail(query)
        .then(function (items) {
          if (!items || items.length === 0) {
            resultBox.innerHTML = '<div class="alert-box alert-box-warning">Data permohonan dengan kode atau email tersebut belum ditemukan.</div>';
            return;
          }
          resultBox.innerHTML = items
            .map(function (item) {
              var badge = getStatusLabel(item.status);
              var driveLinkHtml = item.shareUrl
                ? '<div class="mt-12"><strong>Keterangan Akses:</strong> ' + window.DOM_UTILS.escapeHtml(item.shareUrl) + "</div>"
                : "";
              var trackHtml = item.trackLabel
                ? '<div><strong>Bidang:</strong> ' + window.DOM_UTILS.escapeHtml(item.trackLabel) + "</div>"
                : "";
              return (
                '<div class="admin-request-card mt-12">' +
                '<div class="admin-request-top">' +
                '<div><strong>' + window.DOM_UTILS.escapeHtml(item.code) + "</strong> &mdash; " + window.DOM_UTILS.escapeHtml(item.requesterName) + "</div>" +
                '<span class="pill-tag ' + badge.cls + '">' + window.DOM_UTILS.escapeHtml(badge.text) + "</span>" +
                "</div>" +
                '<div class="card-meta"><span>Email: ' + window.DOM_UTILS.escapeHtml(item.requesterEmail) + "</span><span>Diajukan: " + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.formatDateTimeId(item.createdAt)) + "</span></div>" +
                trackHtml +
                '<div><strong>Rincian Keperluan:</strong> ' + window.DOM_UTILS.escapeHtml(item.purpose) + "</div>" +
                '<div><strong>Catatan Pemilik:</strong> ' + window.DOM_UTILS.escapeHtml(item.adminNote || "-") + "</div>" +
                driveLinkHtml +
                "</div>"
              );
            })
            .join("");
        })
        .catch(function (err) {
          resultBox.innerHTML = '<div class="alert-box alert-box-error">' + window.DOM_UTILS.escapeHtml(err.message) + "</div>";
        });
    });
  }
  function init() {
    populateTrackSelect();
    renderStatusBadge();
    bindRequestForm();
    bindStatusLookup();
  }
  return { init: init };
})();