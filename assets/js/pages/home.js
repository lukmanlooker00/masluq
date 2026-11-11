window.PAGE_HOME = (function () {
  function renderQuickRoutes() {
    var box = document.getElementById("home-quick-routes");
    if (!box) {
      return;
    }
    box.innerHTML = window.SITE_DATA.quickRoutes
      .map(function (rt) {
        var href = rt.href.charAt(0) === "#" ? rt.href : window.DOM_UTILS.withRoot(rt.href);
        var iconCls = rt.icon ? rt.icon : "ph-compass";
        var ctaText = rt.cta ? rt.cta : "Buka";
        return (
          '<a class="stat-box" href="' + window.DOM_UTILS.escapeHtml(href) + '">' +
          '<div class="stat-badge-row"><span class="stat-badge">' + window.DOM_UTILS.escapeHtml(rt.badge) + '</span><i class="ph ' + window.DOM_UTILS.escapeHtml(iconCls) + ' stat-icon" aria-hidden="true"></i></div>' +
          '<div class="stat-value">' + window.DOM_UTILS.escapeHtml(rt.title) + "</div>" +
          '<div class="stat-label">' + window.DOM_UTILS.escapeHtml(rt.entity) + "</div>" +
          '<div class="stat-sub">' + window.DOM_UTILS.escapeHtml(rt.desc) + "</div>" +
          '<div class="stat-cta"><span>' + window.DOM_UTILS.escapeHtml(ctaText) + '</span><i class="ph ph-arrow-right" aria-hidden="true"></i></div>' +
          "</a>"
        );
      })
      .join("");
  }
  function renderTracks() {
    var box = document.getElementById("home-tracks");
    if (!box) {
      return;
    }
    box.innerHTML = window.SITE_DATA.collaborationTracks
      .map(function (tr) {
        var pointsHtml = tr.points
          .map(function (pt) {
            return '<li class="track-point-item"><i class="ph ph-check-circle" aria-hidden="true"></i><span>' + window.DOM_UTILS.escapeHtml(pt) + "</span></li>";
          })
          .join("");
        var pLink = window.DOM_UTILS.resolveLink(tr.primaryBtn.url, tr.primaryBtn.external);
        var pIcon = pLink.isExternal ? '<i class="ph ph-arrow-up-right" aria-hidden="true"></i>' : '<i class="ph ph-user" aria-hidden="true"></i>';
        var sLink = window.DOM_UTILS.resolveLink(tr.secondaryBtn.url, tr.secondaryBtn.external);
        var sIcon = sLink.isExternal ? '<i class="ph ph-file-pdf" aria-hidden="true"></i>' : '<i class="ph ph-paper-plane-tilt" aria-hidden="true"></i>';
        var dHref = window.DOM_UTILS.withRoot(tr.detailBtn.url);
        return (
          '<article class="track-card track-card-' + window.DOM_UTILS.escapeHtml(tr.key) + '" id="' + window.DOM_UTILS.escapeHtml(tr.anchorId) + '">' +
          '<div class="track-card-grid">' +
          '<div class="track-card-media">' +
          '<img class="track-card-img" src="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot(tr.image)) + '" alt="' + window.DOM_UTILS.escapeHtml(tr.imageAlt) + '" width="800" height="450">' +
          '<div class="track-media-caption">Entitas: ' + window.DOM_UTILS.escapeHtml(tr.entity) + "</div>" +
          "</div>" +
          '<div class="track-card-body">' +
          '<div class="track-card-head"><span class="pill-tag">' + window.DOM_UTILS.escapeHtml(tr.badge) + "</span></div>" +
          '<h3 class="track-card-title">' + window.DOM_UTILS.escapeHtml(tr.title) + "</h3>" +
          '<p class="card-excerpt">' + window.DOM_UTILS.escapeHtml(tr.summary) + "</p>" +
          '<ul class="track-points">' + pointsHtml + "</ul>" +
          '<div class="track-actions">' +
          '<a class="btn btn-primary btn-sm" href="' + window.DOM_UTILS.escapeHtml(pLink.href) + '"' + pLink.attr + ">" + window.DOM_UTILS.escapeHtml(tr.primaryBtn.label) + " " + pIcon + "</a>" +
          '<a class="btn btn-gold btn-sm" href="' + window.DOM_UTILS.escapeHtml(sLink.href) + '"' + sLink.attr + ">" + sIcon + " " + window.DOM_UTILS.escapeHtml(tr.secondaryBtn.label) + "</a>" +
          '<a class="btn btn-outline btn-sm" href="' + window.DOM_UTILS.escapeHtml(dHref) + '">' + window.DOM_UTILS.escapeHtml(tr.detailBtn.label) + ' <i class="ph ph-arrow-right" aria-hidden="true"></i></a>' +
          "</div></div></div></article>"
        );
      })
      .join("");
  }
  function renderGallery() {
    var track = document.getElementById("home-gallery-track");
    if (!track) {
      return;
    }
    var items = window.SITE_DATA.galleryItems;
    track.innerHTML = items
      .map(function (item) {
        return (
          '<a class="gallery-item" href="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot(item.href)) + '">' +
          '<img src="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot(item.image)) + '" alt="' + window.DOM_UTILS.escapeHtml(item.caption) + '" width="800" height="450">' +
          '<div class="gallery-caption">' + window.DOM_UTILS.escapeHtml(item.caption) + "</div>" +
          "</a>"
        );
      })
      .join("");
    var idx = 0;
    var prev = document.getElementById("gallery-prev-btn");
    var next = document.getElementById("gallery-next-btn");
    function getPerView() {
      if (window.innerWidth <= 640) {
        return 1;
      }
      if (window.innerWidth <= 960) {
        return 2;
      }
      return 3;
    }
    function updateSlide() {
      var perView = getPerView();
      var maxIdx = Math.max(0, items.length - perView);
      if (idx > maxIdx) {
        idx = 0;
      }
      if (idx < 0) {
        idx = maxIdx;
      }
      var firstCard = track.querySelector(".gallery-item");
      var gap = 12;
      if (firstCard) {
        var step = firstCard.getBoundingClientRect().width + gap;
        track.style.transform = "translateX(-" + idx * step + "px)";
        return;
      }
      var pct = idx * (100 / perView);
      track.style.transform = "translateX(-" + pct + "%)";
    }
    if (prev) {
      prev.addEventListener("click", function () {
        idx -= 1;
        updateSlide();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        idx += 1;
        updateSlide();
      });
    }
    window.addEventListener("resize", updateSlide);
  }
  function renderEcosystem() {
    var grid = document.getElementById("home-ecosystem-track");
    if (!grid) {
      return;
    }
    var links = window.SITE_DATA.ecosystemLinks;
    grid.innerHTML = links
      .map(function (link) {
        var meta = window.DOM_UTILS.resolveLink(link.url, false);
        var iconCls = link.icon ? link.icon : "ph-link";
        return (
          '<a class="ecosystem-chip" href="' + window.DOM_UTILS.escapeHtml(meta.href) + '"' + meta.attr + ">" +
          '<i class="ph ' + window.DOM_UTILS.escapeHtml(iconCls) + ' ecosystem-icon" aria-hidden="true"></i>' +
          '<span class="ecosystem-label">' + window.DOM_UTILS.escapeHtml(link.label) + "</span>" +
          '<i class="ph ph-arrow-up-right ecosystem-arrow" aria-hidden="true"></i>' +
          "</a>"
        );
      })
      .join("");
  }
  function init() {
    renderQuickRoutes();
    renderTracks();
    renderGallery();
    renderEcosystem();
  }
  return { init: init };
})();