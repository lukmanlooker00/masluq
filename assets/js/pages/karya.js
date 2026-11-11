window.PAGE_KARYA = (function () {
  function renderList() {
    var grid = document.getElementById("portfolio-grid");
    var contextPanel = document.getElementById("track-context-panel");
    var pageTitle = document.getElementById("karya-page-title");
    var pageSub = document.getElementById("karya-page-subtitle");
    if (!grid) {
      return;
    }
    var items = window.SITE_DATA.portfolioItems;
    var tracks = window.SITE_DATA.collaborationTracks;
    function renderContextPanel(filterKey) {
      if (!contextPanel) {
        return;
      }
      if (filterKey === "semua") {
        if (pageTitle) {
          pageTitle.textContent = "Bidang Usaha & Portofolio";
        }
        if (pageSub) {
          pageSub.textContent = "Pilih kategori di bawah ini untuk melihat layanan Jakalelana.id, proyek PT Sintara Digital, rekam jejak Hukum & QMR, atau arsip puisi.";
        }
        contextPanel.innerHTML = "";
        return;
      }
      if (filterKey === "literasi") {
        if (pageTitle) {
          pageTitle.textContent = "Antologi Torehan Puisi (2022–2023)";
        }
        if (pageSub) {
          pageSub.textContent = "Enam naskah puisi pribadi yang disimpan terpisah dari halaman jasa dan karier.";
        }
        contextPanel.innerHTML =
          '<div class="info-panel mb-16">' +
          '<div class="info-panel-title">Tulisan Pribadi</div>' +
          '<p>Kategori ini hanya memuat arsip puisi Muhammad Lukman Hakim. Untuk membaca lengkap keenam naskahnya, buka <a class="section-link" href="' +
          window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot("puisi/index.html")) +
          '">halaman Antologi Puisi <i class="ph ph-arrow-right" aria-hidden="true"></i></a></p>' +
          "</div>";
        return;
      }
      var foundTrack = tracks.find(function (t) {
        return t.key === filterKey;
      });
      if (!foundTrack) {
        contextPanel.innerHTML = "";
        return;
      }
      if (pageTitle) {
        pageTitle.textContent = foundTrack.headline || foundTrack.title;
      }
      if (pageSub) {
        pageSub.textContent = foundTrack.summary;
      }
      var pLink = window.DOM_UTILS.resolveLink(foundTrack.primaryBtn.url, foundTrack.primaryBtn.external);
      var sLink = window.DOM_UTILS.resolveLink(foundTrack.secondaryBtn.url, foundTrack.secondaryBtn.external);
      contextPanel.innerHTML =
        '<div class="info-panel mb-16">' +
        '<div class="info-panel-title">' + window.DOM_UTILS.escapeHtml(foundTrack.entity) + "</div>" +
        "<p>" + window.DOM_UTILS.escapeHtml(foundTrack.summary) + "</p>" +
        '<div class="admin-actions-row mt-12">' +
        '<a class="btn btn-primary btn-sm" href="' + window.DOM_UTILS.escapeHtml(pLink.href) + '"' + pLink.attr + ">" + window.DOM_UTILS.escapeHtml(foundTrack.primaryBtn.label) + "</a>" +
        '<a class="btn btn-gold btn-sm" href="' + window.DOM_UTILS.escapeHtml(sLink.href) + '"' + sLink.attr + ">" + window.DOM_UTILS.escapeHtml(foundTrack.secondaryBtn.label) + "</a>" +
        "</div></div>";
    }
    function draw(filterKey) {
      var list =
        filterKey === "semua"
          ? items
          : items.filter(function (i) {
              return i.track === filterKey;
            });
      renderContextPanel(filterKey);
      grid.innerHTML = list
        .map(function (item) {
          var detailHref = window.DOM_UTILS.withRoot("karya/detail.html?slug=" + encodeURIComponent(item.slug));
          var extBtn = item.externalUrl && /^https?:/i.test(item.externalUrl)
            ? '<a class="btn btn-gold btn-sm" href="' + window.DOM_UTILS.escapeHtml(item.externalUrl) + '" target="_blank" rel="noopener noreferrer">Buka Situs <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>'
            : "";
          return (
            '<article class="portfolio-card">' +
            '<img class="portfolio-card-img" src="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot(item.image)) + '" alt="' + window.DOM_UTILS.escapeHtml(item.title) + '" width="800" height="450">' +
            '<div class="portfolio-card-body">' +
            '<div class="card-meta"><span class="pill-tag">' + window.DOM_UTILS.escapeHtml(item.categoryLabel) + "</span><span>" + window.DOM_UTILS.escapeHtml(item.date) + "</span></div>" +
            '<h3 class="card-title"><a href="' + window.DOM_UTILS.escapeHtml(detailHref) + '">' + window.DOM_UTILS.escapeHtml(item.title) + "</a></h3>" +
            '<p class="card-excerpt">' + window.DOM_UTILS.escapeHtml(item.summary) + "</p>" +
            '<div class="portfolio-card-footer">' +
            '<a class="btn btn-primary btn-sm" href="' + window.DOM_UTILS.escapeHtml(detailHref) + '">Detail</a>' +
            extBtn +
            "</div></div></article>"
          );
        })
        .join("");
    }
    var initialTrack = window.DOM_UTILS.getQueryParam("track") || "semua";
    var validKeys = ["semua", "travel", "digital", "hukum-manajemen", "literasi"];
    if (validKeys.indexOf(initialTrack) === -1) {
      initialTrack = "semua";
    }
    document.querySelectorAll("[data-filter-karya]").forEach(function (btn) {
      var key = btn.getAttribute("data-filter-karya");
      btn.classList.toggle("active", key === initialTrack);
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-filter-karya]").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        draw(key);
      });
    });
    draw(initialTrack);
  }
  function renderDetail() {
    var wrap = document.getElementById("karya-detail-container");
    if (!wrap) {
      return;
    }
    var slug = window.DOM_UTILS.getQueryParam("slug");
    var items = window.SITE_DATA.portfolioItems;
    var found =
      items.find(function (p) {
        return p.slug === slug;
      }) || items[0];
    var titleEl = document.getElementById("karya-detail-heading");
    if (titleEl) {
      titleEl.textContent = found.title;
    }
    var subEl = document.getElementById("karya-detail-subheading");
    if (subEl) {
      subEl.textContent = found.subtitle;
    }
    document.title = found.title + " — Muhammad Lukman Hakim, S.H.";
    var paragraphs = found.details
      .map(function (p, i) {
        return '<p class="' + (i === 0 ? "drop-cap-paragraph" : "") + '">' + window.DOM_UTILS.escapeHtml(p) + "</p>";
      })
      .join("");
    var stackBadges = found.stack
      .map(function (s) {
        return '<span class="pill-tag pill-tag-teal">' + window.DOM_UTILS.escapeHtml(s) + "</span>";
      })
      .join(" ");
    var extAction = "";
    if (found.externalUrl) {
      var extMeta = window.DOM_UTILS.resolveLink(found.externalUrl, false);
      extAction =
        '<a class="btn btn-gold btn-sm" href="' + window.DOM_UTILS.escapeHtml(extMeta.href) + '"' + extMeta.attr + '>Buka Tautan <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>';
    }
    var bidangParam = found.track === "hukum-manajemen" ? "hukum" : found.track;
    wrap.innerHTML =
      '<img class="article-featured-image" src="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot(found.image)) + '" alt="' + window.DOM_UTILS.escapeHtml(found.title) + '" width="800" height="450">' +
      '<div class="card-meta mb-16"><span class="pill-tag">' + window.DOM_UTILS.escapeHtml(found.categoryLabel) + "</span><span>Status: " + window.DOM_UTILS.escapeHtml(found.date) + "</span></div>" +
      '<div class="magazine-style"><p><strong>' + window.DOM_UTILS.escapeHtml(found.summary) + "</strong></p>" + paragraphs + "</div>" +
      '<div class="info-panel"><div class="info-panel-title">Ruang Lingkup & Kompetensi</div><div class="card-meta">' + stackBadges + "</div></div>" +
      '<div class="admin-actions-row mt-20">' +
      '<a class="btn btn-outline btn-sm" href="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot("karya/index.html?track=" + encodeURIComponent(found.track))) + '"><i class="ph ph-arrow-left" aria-hidden="true"></i> Kembali</a>' +
      extAction +
      '<a class="btn btn-primary btn-sm" href="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot("kolaborasi/index.html?bidang=" + encodeURIComponent(bidangParam))) + '">Kolaborasi</a>' +
      "</div>";
  }
  function init() {
    renderList();
    renderDetail();
  }
  return { init: init };
})();