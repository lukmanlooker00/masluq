window.LAYOUT_CORE = (function () {
  var THEME_KEY = "mlh_theme_mode";
  function loadComponent(targetId, relativePath) {
    var target = document.getElementById(targetId);
    if (!target) {
      return Promise.resolve(null);
    }
    var fullPath = window.DOM_UTILS.withRoot(relativePath);
    return fetch(fullPath)
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Gagal memuat komponen: " + relativePath);
        }
        return res.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        window.DOM_UTILS.applyRootLinks(target);
        return target;
      });
  }
  function renderTopBarAndNav() {
    var data = window.SITE_DATA;
    var activeNav = document.body.getAttribute("data-nav") || "";
    var topMeta = document.getElementById("topbar-meta");
    if (topMeta) {
      topMeta.innerHTML =
        '<span class="top-bar-item"><i class="ph ph-map-pin" aria-hidden="true"></i>' + window.DOM_UTILS.escapeHtml(data.profile.address) + "</span>" +
        '<span class="top-bar-item"><i class="ph ph-whatsapp-logo" aria-hidden="true"></i>' + window.DOM_UTILS.escapeHtml(data.profile.phoneDisplay) + "</span>";
    }
    var navList = document.getElementById("header-nav-list");
    if (!navList) {
      return;
    }
    navList.innerHTML = data.navigation
      .map(function (item) {
        var hasChildren = item.children && item.children.length > 0;
        var isActive = activeNav === item.key ? " active" : "";
        var href = window.DOM_UTILS.withRoot(item.href);
        var dropdownHtml = "";
        if (hasChildren) {
          dropdownHtml =
            '<ul class="nav-dropdown">' +
            item.children
              .map(function (sub) {
                var subHref = window.DOM_UTILS.withRoot(sub.href);
                var ext = sub.external ? ' target="_blank" rel="noopener noreferrer"' : "";
                var extIcon = sub.external ? '<i class="ph ph-arrow-up-right" aria-hidden="true"></i>' : "";
                return '<li><a class="nav-dropdown-link" href="' + window.DOM_UTILS.escapeHtml(subHref) + '"' + ext + "><span>" + window.DOM_UTILS.escapeHtml(sub.label) + "</span>" + extIcon + "</a></li>";
              })
              .join("") +
            "</ul>";
        }
        var chevron = hasChildren ? ' <i class="ph ph-caret-down nav-caret" aria-hidden="true"></i>' : "";
        return (
          '<li class="nav-item' + (hasChildren ? " has-dropdown" : "") + '">' +
          '<a class="nav-link' + isActive + '" href="' + window.DOM_UTILS.escapeHtml(href) + '">' +
          "<span>" + window.DOM_UTILS.escapeHtml(item.label) + "</span>" + chevron +
          "</a>" +
          dropdownHtml +
          "</li>"
        );
      })
      .join("");
  }
  function bindNavigationEvents() {
    var nav = document.getElementById("main-nav");
    var openBtn = document.getElementById("mobile-nav-open");
    var closeBtn = document.getElementById("mobile-nav-close");
    var backdrop = document.getElementById("mobile-nav-backdrop");
    function setDrawerState(isOpen) {
      if (!nav) {
        return;
      }
      nav.classList.toggle("active", isOpen);
      if (backdrop) {
        backdrop.classList.toggle("active", isOpen);
      }
      document.body.classList.toggle("nav-drawer-open", isOpen);
      if (openBtn) {
        openBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
    }
    if (openBtn && nav) {
      openBtn.addEventListener("click", function () {
        setDrawerState(!nav.classList.contains("active"));
      });
    }
    if (closeBtn && nav) {
      closeBtn.addEventListener("click", function () {
        setDrawerState(false);
      });
    }
    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setDrawerState(false);
      });
    }
    document.querySelectorAll(".nav-item.has-dropdown > .nav-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          var parentItem = link.parentElement;
          var wasOpen = parentItem.classList.contains("open");
          document.querySelectorAll(".nav-item.has-dropdown.open").forEach(function (other) {
            if (other !== parentItem) {
              other.classList.remove("open");
            }
          });
          parentItem.classList.toggle("open", !wasOpen);
        }
      });
    });
    if (nav) {
      nav.querySelectorAll(".nav-dropdown-link, .nav-item:not(.has-dropdown) > .nav-link, .mobile-nav-footer a").forEach(function (leaf) {
        leaf.addEventListener("click", function () {
          if (window.innerWidth <= 1024) {
            setDrawerState(false);
          }
        });
      });
    }
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && nav && nav.classList.contains("active")) {
        setDrawerState(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav && nav.classList.contains("active")) {
        setDrawerState(false);
      }
    });
  }
  function bindThemeToggle() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") {
      document.documentElement.classList.add("dark-mode");
    }
    var btn = document.getElementById("theme-toggle-btn");
    function syncIcon() {
      if (!btn) {
        return;
      }
      var isDark = document.documentElement.classList.contains("dark-mode");
      btn.innerHTML = isDark ? '<i class="ph ph-sun" aria-hidden="true"></i>' : '<i class="ph ph-moon" aria-hidden="true"></i>';
    }
    syncIcon();
    if (btn) {
      btn.addEventListener("click", function () {
        var isDark = document.documentElement.classList.toggle("dark-mode");
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
        syncIcon();
      });
    }
  }
  function openModal(id) {
    var el = document.getElementById(id);
    if (el) {
      el.classList.add("active");
    }
  }
  function closeModal(id) {
    var el = document.getElementById(id);
    if (el) {
      el.classList.remove("active");
    }
  }
  function bindModalEvents() {
    document.querySelectorAll("[data-close-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        closeModal(btn.getAttribute("data-close-modal"));
      });
    });
    document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
          overlay.classList.remove("active");
        }
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(function (m) {
          m.classList.remove("active");
        });
      }
    });
  }
  function bindSearchModal() {
    var openBtn = document.getElementById("open-search-btn");
    var input = document.getElementById("site-search-input");
    var resultsBox = document.getElementById("site-search-results");
    if (!openBtn || !input || !resultsBox) {
      return;
    }
    function buildIndex() {
      var d = window.SITE_DATA;
      var entries = [];
      (d.collaborationTracks || []).forEach(function (tr) {
        entries.push({
          type: tr.badge,
          title: tr.headline,
          url: "karya/index.html?track=" + encodeURIComponent(tr.key),
          text: tr.entity + " " + tr.summary + " " + tr.points.join(" ")
        });
      });
      entries.push(
        { type: "Profil Hukum", title: "Tentang Muhammad Lukman Hakim, S.H. & Pendidikan", url: "profil/tentang.html", text: "Hukum Keluarga IAI Al-Qolam SMK PGRI BNSP ISI TOEFL" },
        { type: "Karier", title: "Pengalaman QMR Pelayaran & Unit Usaha", url: "profil/pengalaman.html", text: "Quality Management Representative Jakalelana Sintara sisitus.com" },
        { type: "Dokumen & Kolaborasi", title: "Ajukan Kolaborasi / Izin Lampiran.pdf & Cek Status", url: "kolaborasi/index.html", text: "permintaan lampiran email persetujuan CV PDF" }
      );
      d.portfolioItems.forEach(function (p) {
        entries.push({
          type: p.categoryLabel,
          title: p.title,
          url: "karya/detail.html?slug=" + encodeURIComponent(p.slug),
          text: p.subtitle + " " + p.summary + " " + p.stack.join(" ")
        });
      });
      d.poems.forEach(function (poem) {
        entries.push({
          type: "Puisi (" + poem.date + ")",
          title: poem.title,
          url: "puisi/index.html#" + encodeURIComponent(poem.id),
          text: poem.theme + " " + poem.content
        });
      });
      return entries;
    }
    function renderResults(q) {
      var index = buildIndex();
      var term = (q || "").trim().toLowerCase();
      var list = term
        ? index.filter(function (item) {
            return (item.title + " " + item.text + " " + item.type).toLowerCase().indexOf(term) !== -1;
          })
        : index.slice(0, 6);
      if (list.length === 0) {
        resultsBox.innerHTML = '<p class="text-muted">Tidak ada hasil yang cocok dengan kata kunci tersebut.</p>';
        return;
      }
      resultsBox.innerHTML = list
        .slice(0, 8)
        .map(function (item) {
          return (
            '<a class="search-result-item" href="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot(item.url)) + '">' +
            '<div class="search-result-type">' + window.DOM_UTILS.escapeHtml(item.type) + "</div>" +
            '<div class="search-result-title">' + window.DOM_UTILS.escapeHtml(item.title) + "</div>" +
            "</a>"
          );
        })
        .join("");
    }
    openBtn.addEventListener("click", function () {
      openModal("search-modal");
      renderResults("");
      setTimeout(function () {
        input.focus();
      }, 60);
    });
    input.addEventListener("input", function () {
      renderResults(input.value);
    });
  }
  function hydrateHeroAndSlider() {
    var track = document.getElementById("hero-slides-track");
    var dotsWrap = document.getElementById("hero-dots");
    var tickerTrack = document.getElementById("hero-ticker-track");
    if (!track || !dotsWrap) {
      return;
    }
    var slides = window.SITE_DATA.heroSlides;
    track.innerHTML = slides
      .map(function (s) {
        return (
          '<div class="hero-slide"><img src="' +
          window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot(s.image)) +
          '" alt="' +
          window.DOM_UTILS.escapeHtml(s.alt) +
          '" width="1200" height="400"></div>'
        );
      })
      .join("");
    dotsWrap.innerHTML = slides
      .map(function (_, idx) {
        return '<button type="button" class="hero-dot' + (idx === 0 ? " active" : "") + '" data-slide-idx="' + idx + '" aria-label="Slide ' + (idx + 1) + '"></button>';
      })
      .join("");
    if (tickerTrack) {
      var tickerItems = window.SITE_DATA.tickerItems || [];
      var tickerLoop = tickerItems.concat(tickerItems);
      tickerTrack.innerHTML = tickerLoop
        .map(function (t) {
          return window.DOM_UTILS.escapeHtml(t);
        })
        .join('<span class="ticker-sep" aria-hidden="true">&bull;</span>') + '<span class="ticker-sep" aria-hidden="true">&bull;</span>';
    }
    var current = 0;
    var dots = dotsWrap.querySelectorAll(".hero-dot");
    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach(function (d, i) {
        d.classList.toggle("active", i === current);
      });
    }
    var prev = document.getElementById("hero-prev-btn");
    var next = document.getElementById("hero-next-btn");
    if (prev) {
      prev.addEventListener("click", function () {
        goTo(current - 1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        goTo(current + 1);
      });
    }
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        goTo(parseInt(dot.getAttribute("data-slide-idx"), 10));
      });
    });
    setInterval(function () {
      goTo(current + 1);
    }, 6500);
  }
  function hydrateSidebar() {
    var quoteEl = document.getElementById("sidebar-profile-quote");
    if (quoteEl) {
      quoteEl.textContent = '"' + window.SITE_DATA.profile.quote + '"';
    }
    var openBio = document.getElementById("open-bio-modal-btn");
    if (openBio) {
      openBio.addEventListener("click", function () {
        openModal("bio-modal");
      });
    }
    document.querySelectorAll(".hotline-trigger").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var parent = btn.closest(".hotline-item");
        if (parent) {
          parent.classList.toggle("active");
        }
      });
    });
  }
  function bindScrollTopButton() {
    var btn = document.getElementById("scroll-top-btn");
    if (!btn) {
      return;
    }
    window.addEventListener("scroll", function () {
      btn.classList.toggle("visible", window.scrollY > 360);
    });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  function registerServiceWorker() {
    if ("serviceWorker" in navigator && /^https?:/i.test(window.location.protocol)) {
      navigator.serviceWorker.register(window.DOM_UTILS.withRoot("sw.js")).catch(function () {});
    }
  }
  function init() {
    return Promise.all([
      loadComponent("app-header", "components/header.html"),
      loadComponent("app-hero", "components/hero.html"),
      loadComponent("app-sidebar", "components/sidebar.html"),
      loadComponent("app-footer", "components/footer.html")
    ]).then(function () {
      renderTopBarAndNav();
      bindNavigationEvents();
      bindThemeToggle();
      hydrateHeroAndSlider();
      hydrateSidebar();
      bindSearchModal();
      bindScrollTopButton();
      bindModalEvents();
      registerServiceWorker();
    });
  }
  return {
    init: init,
    openModal: openModal,
    closeModal: closeModal
  };
})();
