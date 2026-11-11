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
  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) {
      el.textContent = val || "";
    }
  }
  function isCurrentSubLink(rawHref) {
    if (!rawHref || window.DOM_UTILS.isExternalUrl(rawHref)) {
      return false;
    }
    try {
      var targetUrl = new URL(window.DOM_UTILS.withRoot(rawHref), window.location.href);
      var currentUrl = new URL(window.location.href);
      if (targetUrl.pathname !== currentUrl.pathname) {
        return false;
      }
      if (targetUrl.search && targetUrl.search !== currentUrl.search) {
        return false;
      }
      return true;
    } catch (_) {
      return false;
    }
  }
  function hydrateHeaderBrand() {
    var profile = window.SITE_DATA.profile;
    setText("header-brand-name", profile.fullName);
    setText("header-brand-sub", profile.tagline);
    setText("drawer-brand-name", profile.shortName + ", S.H.");
    var drawerMeta = document.getElementById("drawer-contact-meta");
    if (drawerMeta) {
      drawerMeta.innerHTML =
        '<span><i class="ph ph-map-pin" aria-hidden="true"></i> ' + window.DOM_UTILS.escapeHtml(profile.cityRegion) + "</span>" +
        '<span><i class="ph ph-whatsapp-logo" aria-hidden="true"></i> ' + window.DOM_UTILS.escapeHtml(profile.phoneDisplay) + "</span>";
    }
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
        var itemIcon = item.icon ? '<i class="ph ' + window.DOM_UTILS.escapeHtml(item.icon) + ' nav-item-icon" aria-hidden="true"></i>' : "";
        var dropdownHtml = "";
        if (hasChildren) {
          dropdownHtml =
            '<ul class="nav-dropdown">' +
            item.children
              .map(function (sub) {
                var linkMeta = window.DOM_UTILS.resolveLink(sub.href, sub.external);
                var subActive = isCurrentSubLink(sub.href) ? " active" : "";
                var extIcon = linkMeta.isExternal ? '<i class="ph ph-arrow-up-right" aria-hidden="true"></i>' : "";
                return '<li><a class="nav-dropdown-link' + subActive + '" href="' + window.DOM_UTILS.escapeHtml(linkMeta.href) + '"' + linkMeta.attr + "><span>" + window.DOM_UTILS.escapeHtml(sub.label) + "</span>" + extIcon + "</a></li>";
              })
              .join("") +
            "</ul>";
        }
        var chevron = hasChildren ? ' <i class="ph ph-caret-down nav-caret" aria-hidden="true"></i>' : "";
        var linkExpandedAttr = hasChildren ? ' aria-expanded="false"' : "";
        return (
          '<li class="nav-item' + (hasChildren ? " has-dropdown" : "") + '">' +
          '<a class="nav-link' + isActive + '" href="' + window.DOM_UTILS.escapeHtml(href) + '"' + linkExpandedAttr + ">" +
          '<span class="nav-link-main">' + itemIcon + "<span>" + window.DOM_UTILS.escapeHtml(item.label) + "</span></span>" + chevron +
          "</a>" +
          dropdownHtml +
          "</li>"
        );
      })
      .join("") +
      '<li class="nav-item nav-item-theme">' +
      '<button type="button" class="nav-link nav-theme-toggle" id="mobile-theme-toggle-btn" data-theme-toggle="drawer" aria-pressed="false"></button>' +
      "</li>";
  }
  function bindNavigationEvents() {
    var nav = document.getElementById("main-nav");
    var openBtn = document.getElementById("mobile-nav-open");
    var closeBtn = document.getElementById("mobile-nav-close");
    var backdrop = document.getElementById("mobile-nav-backdrop");
    function expandActiveGroup() {
      if (!nav || window.innerWidth > 1024) {
        return;
      }
      nav.querySelectorAll(".nav-item.has-dropdown").forEach(function (group) {
        var isCurrentGroup = Boolean(group.querySelector(".nav-link.active, .nav-dropdown-link.active"));
        group.classList.toggle("open", isCurrentGroup);
        var trigger = group.querySelector(":scope > .nav-link");
        if (trigger) {
          trigger.setAttribute("aria-expanded", isCurrentGroup ? "true" : "false");
        }
      });
    }
    function setDrawerState(isOpen, restoreFocus) {
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
      if (window.innerWidth <= 1024) {
        nav.setAttribute("aria-hidden", isOpen ? "false" : "true");
      } else {
        nav.removeAttribute("aria-hidden");
      }
      if (isOpen) {
        expandActiveGroup();
        if (closeBtn) {
          setTimeout(function () {
            closeBtn.focus();
          }, 50);
        }
      } else if (restoreFocus && openBtn) {
        openBtn.focus();
      }
    }
    if (window.innerWidth <= 1024 && nav) {
      nav.setAttribute("aria-hidden", "true");
    }
    if (openBtn && nav) {
      openBtn.addEventListener("click", function () {
        setDrawerState(!nav.classList.contains("active"), false);
      });
    }
    if (closeBtn && nav) {
      closeBtn.addEventListener("click", function () {
        setDrawerState(false, true);
      });
    }
    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setDrawerState(false, false);
      });
    }
    document.querySelectorAll(".nav-item.has-dropdown > .nav-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          var parentItem = link.parentElement;
          var willOpen = !parentItem.classList.contains("open");
          document.querySelectorAll(".nav-item.has-dropdown").forEach(function (other) {
            if (other !== parentItem) {
              other.classList.remove("open");
              var otherTrigger = other.querySelector(":scope > .nav-link");
              if (otherTrigger) {
                otherTrigger.setAttribute("aria-expanded", "false");
              }
            }
          });
          parentItem.classList.toggle("open", willOpen);
          link.setAttribute("aria-expanded", willOpen ? "true" : "false");
        }
      });
    });
    if (nav) {
      nav.querySelectorAll(".nav-dropdown-link, .nav-item:not(.has-dropdown) > .nav-link, .mobile-nav-footer a").forEach(function (leaf) {
        leaf.addEventListener("click", function () {
          if (window.innerWidth <= 1024) {
            setDrawerState(false, false);
          }
        });
      });
    }
    window.addEventListener("resize", function () {
      if (!nav) {
        return;
      }
      if (window.innerWidth > 1024) {
        setDrawerState(false, false);
        nav.removeAttribute("aria-hidden");
      } else if (!nav.classList.contains("active")) {
        nav.setAttribute("aria-hidden", "true");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav && nav.classList.contains("active")) {
        setDrawerState(false, true);
      }
    });
  }
  function bindThemeToggle() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") {
      document.documentElement.classList.add("dark-mode");
    }
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    function syncThemeButtons() {
      var isDark = document.documentElement.classList.contains("dark-mode");
      toggles.forEach(function (btn) {
        var variant = btn.getAttribute("data-theme-toggle");
        btn.setAttribute("aria-pressed", isDark ? "true" : "false");
        if (variant === "icon") {
          btn.innerHTML = isDark ? '<i class="ph ph-sun" aria-hidden="true"></i>' : '<i class="ph ph-moon" aria-hidden="true"></i>';
        } else {
          var iconCls = isDark ? "ph-moon" : "ph-sun";
          var stateLabel = isDark ? "Gelap" : "Terang";
          btn.innerHTML =
            '<span class="nav-link-main"><i class="ph ' + iconCls + ' nav-item-icon" aria-hidden="true"></i><span>Mode Tampilan</span></span>' +
            '<span class="nav-theme-state">' + stateLabel + "</span>";
        }
      });
    }
    syncThemeButtons();
    toggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var isDark = document.documentElement.classList.toggle("dark-mode");
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
        syncThemeButtons();
      });
    });
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
          title: tr.title,
          url: "karya/index.html?track=" + encodeURIComponent(tr.key),
          text: tr.entity + " " + tr.summary + " " + tr.points.join(" ")
        });
      });
      entries.push(
        { type: "Profil Hukum", title: "Tentang Muhammad Lukman Hakim, S.H. & Pendidikan", url: "profil/tentang.html", text: "Hukum Keluarga Universitas Al-Qolam Malang SMK PGRI BNSP ISI TOEFL" },
        { type: "Karier", title: "Pengalaman QMR Pelayaran & Unit Usaha", url: "profil/pengalaman.html", text: "Quality Management Representative Jakalelana Sintara sisitus.com" },
        { type: "Dokumen & Kolaborasi", title: "Ajukan Kerja Sama / Izin Lampiran.pdf & Cek Status", url: "kolaborasi/index.html", text: "permintaan lampiran email persetujuan CV PDF" }
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
      var tickerViewport = tickerTrack.closest(".ticker-viewport");
      if (window.DOM_UTILS.initTickerSwipe) {
        window.DOM_UTILS.initTickerSwipe(tickerViewport, tickerTrack);
      }
    }
    var current = 0;
    var dots = dotsWrap.querySelectorAll(".hero-dot");
    var heroContainer = track.closest(".hero-banner-container");
    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach(function (d, i) {
        d.classList.toggle("active", i === current);
      });
    }
    var prev = document.getElementById("hero-prev-btn");
    var next = document.getElementById("hero-next-btn");
    var heroCarousel = window.DOM_UTILS.initCarousel({
      container: heroContainer,
      viewport: heroContainer,
      track: track,
      prevBtn: prev,
      nextBtn: next,
      autoIntervalMs: 6500,
      idleDimDelayMs: 2200,
      getBaseOffsetPx: function () {
        var width = heroContainer ? heroContainer.clientWidth : track.clientWidth;
        return -current * width;
      },
      onStep: function (delta) {
        goTo(current + delta);
      }
    });
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        goTo(parseInt(dot.getAttribute("data-slide-idx"), 10));
        if (heroCarousel) {
          heroCarousel.notifyInteract();
        }
      });
    });
  }
  function hydrateSidebar() {
    var data = window.SITE_DATA;
    var p = data.profile;
    setText("sidebar-profile-name", p.fullName);
    setText("sidebar-profile-role", p.tagline);
    setText("sidebar-profile-quote", '"' + p.quote + '"');
    var trackListEl = document.getElementById("sidebar-track-links");
    if (trackListEl) {
      var trackIcons = { travel: "ph-airplane-tilt", digital: "ph-code", "hukum-manajemen": "ph-scales" };
      var trackShort = {
        travel: "Tour & Travel (Jakalelana.id)",
        digital: "Web: PT Sintara / sisitus.com",
        "hukum-manajemen": "Hukum (S.H.), QMR & Kantor"
      };
      var itemsHtml = (data.collaborationTracks || []).map(function (tr) {
        var href = window.DOM_UTILS.withRoot("karya/index.html?track=" + encodeURIComponent(tr.key));
        var ic = trackIcons[tr.key] || "ph-compass";
        return (
          '<a class="sidebar-link-item" href="' + window.DOM_UTILS.escapeHtml(href) + '">' +
          '<span class="sidebar-link-label"><i class="ph ' + ic + '" aria-hidden="true"></i> ' + window.DOM_UTILS.escapeHtml(trackShort[tr.key] || tr.badge) + "</span>" +
          '<span class="sidebar-link-cta">Buka <i class="ph ph-caret-right" aria-hidden="true"></i></span>' +
          "</a>"
        );
      });
      var poemHref = window.DOM_UTILS.withRoot("puisi/index.html");
      var poemCount = (data.poems || []).length;
      itemsHtml.push(
        '<a class="sidebar-link-item" href="' + window.DOM_UTILS.escapeHtml(poemHref) + '">' +
        '<span class="sidebar-link-label"><i class="ph ph-book-open-text" aria-hidden="true"></i> Personal: Antologi Puisi</span>' +
        '<span class="sidebar-link-cta">' + poemCount + ' Karya <i class="ph ph-caret-right" aria-hidden="true"></i></span>' +
        "</a>"
      );
      trackListEl.innerHTML = itemsHtml.join("");
    }
    var hotlinesEl = document.getElementById("sidebar-hotlines");
    if (hotlinesEl) {
      var hotlines = [
        {
          icon: "ph-whatsapp-logo",
          title: "WhatsApp & Telepon",
          open: true,
          body: '<div>Nomor aktif: <strong>' + window.DOM_UTILS.escapeHtml(p.phoneDisplay) + '</strong></div><a class="hotline-cta" href="' + window.DOM_UTILS.escapeHtml(p.whatsappUrl) + '" target="_blank" rel="noopener noreferrer">Hubungi via WhatsApp <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>'
        },
        {
          icon: "ph-envelope",
          title: "Surat Elektronik (Email)",
          open: false,
          body: "<div>" + window.DOM_UTILS.escapeHtml(p.email) + '</div><a class="hotline-cta" href="mailto:' + window.DOM_UTILS.escapeHtml(p.email) + '">Kirim Email Langsung <i class="ph ph-arrow-right" aria-hidden="true"></i></a>'
        },
        {
          icon: "ph-instagram-logo",
          title: "Media Sosial Resmi",
          open: false,
          body: '<div>Instagram: <a class="hotline-cta" href="' + window.DOM_UTILS.escapeHtml(p.instagramUrl) + '" target="_blank" rel="noopener noreferrer">' + window.DOM_UTILS.escapeHtml(p.instagramHandle) + '</a></div><div>Facebook: <a class="hotline-cta" href="' + window.DOM_UTILS.escapeHtml(p.facebookUrl) + '" target="_blank" rel="noopener noreferrer">' + window.DOM_UTILS.escapeHtml(p.facebookName) + "</a></div>"
        },
        {
          icon: "ph-map-pin",
          title: "Alamat Domisili",
          open: false,
          body: "<div>" + window.DOM_UTILS.escapeHtml(p.address) + "</div>"
        }
      ];
      hotlinesEl.innerHTML = hotlines
        .map(function (h) {
          return (
            '<div class="hotline-item' + (h.open ? " active" : "") + '">' +
            '<button type="button" class="hotline-trigger" aria-expanded="' + (h.open ? "true" : "false") + '">' +
            '<span class="hotline-title-wrap"><i class="ph ' + h.icon + '" aria-hidden="true"></i> ' + window.DOM_UTILS.escapeHtml(h.title) + "</span>" +
            '<i class="ph ph-caret-down hotline-chevron" aria-hidden="true"></i>' +
            "</button>" +
            '<div class="hotline-body">' + h.body + "</div>" +
            "</div>"
          );
        })
        .join("");
      hotlinesEl.querySelectorAll(".hotline-trigger").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var parent = btn.closest(".hotline-item");
          if (parent) {
            var isNowOpen = parent.classList.toggle("active");
            btn.setAttribute("aria-expanded", isNowOpen ? "true" : "false");
          }
        });
      });
    }
    var bioBody = document.getElementById("bio-modal-body");
    if (bioBody) {
      bioBody.innerHTML =
        '<div class="bio-modal-wrap">' +
        '<div class="bio-modal-head">' +
        '<img class="bio-modal-photo" src="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot(p.portraitPath)) + '" alt="Foto ' + window.DOM_UTILS.escapeHtml(p.fullName) + '" width="64" height="80">' +
        '<div class="bio-modal-identity">' +
        '<h3 class="bio-modal-name">' + window.DOM_UTILS.escapeHtml(p.fullName) + "</h3>" +
        '<p class="bio-modal-meta">Universitas Al-Qolam Malang • ' + window.DOM_UTILS.escapeHtml(p.cityRegion) + "</p>" +
        "</div></div>" +
        '<p class="bio-modal-intro">Halo, selamat datang. Untuk memudahkan komunikasi sesuai kebutuhan Anda, layanan dan profil saya terbagi menjadi tiga bidang:</p>' +
        '<ul class="bio-modal-list">' +
        '<li class="bio-modal-item"><span class="bio-modal-item-title">1. Tour &amp; Travel</span><span>Paket wisata, rombongan &amp; armada via <strong>Jakalelana.id</strong>.</span></li>' +
        '<li class="bio-modal-item"><span class="bio-modal-item-title">2. Website &amp; Sistem Digital</span><span>Pembuatan website &amp; aplikasi di <strong>PT Sintara Digital Nusantara (sisitus.com)</strong>.</span></li>' +
        '<li class="bio-modal-item"><span class="bio-modal-item-title">3. Hukum, QMR &amp; Perkantoran</span><span>Sarjana Hukum (S.H.), eks QMR pelayaran &amp; sertifikasi BNSP KKNI Level II.</span></li>' +
        "</ul>" +
        '<div class="bio-modal-actions">' +
        '<a class="btn btn-primary btn-sm" href="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot("profil/tentang.html")) + '">Profil Lengkap</a>' +
        '<a class="btn btn-gold btn-sm" href="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot("kolaborasi/index.html")) + '">Kolaborasi</a>' +
        "</div></div>";
    }
    var openBio = document.getElementById("open-bio-modal-btn");
    if (openBio) {
      openBio.addEventListener("click", function () {
        openModal("bio-modal");
      });
    }
  }
  function renderFooterLinks(targetId, items) {
    var box = document.getElementById(targetId);
    if (!box || !items) {
      return;
    }
    box.innerHTML = items
      .map(function (it) {
        var meta = window.DOM_UTILS.resolveLink(it.href, it.external);
        return '<a class="footer-link" href="' + window.DOM_UTILS.escapeHtml(meta.href) + '"' + meta.attr + ">" + window.DOM_UTILS.escapeHtml(it.label) + "</a>";
      })
      .join("");
  }
  function hydrateFooter() {
    var data = window.SITE_DATA;
    var p = data.profile;
    setText("footer-brand-name", p.fullName);
    setText("footer-brand-sub", p.cityRegion);
    setText("footer-about", p.aboutShort);
    setText("footer-copyright", p.copyright);
    setText("footer-site-badge", p.siteBadge);
    renderFooterLinks("footer-menu-links", data.footerMenus);
    renderFooterLinks("footer-unit-links", data.footerUnits);
    var contactBox = document.getElementById("footer-contact-list");
    if (contactBox) {
      contactBox.innerHTML =
        '<div class="footer-contact-item"><i class="ph ph-map-pin" aria-hidden="true"></i><span>' + window.DOM_UTILS.escapeHtml(p.address) + "</span></div>" +
        '<div class="footer-contact-item"><i class="ph ph-whatsapp-logo" aria-hidden="true"></i><span>WhatsApp: <a class="footer-link" href="' + window.DOM_UTILS.escapeHtml(p.whatsappUrl) + '" target="_blank" rel="noopener noreferrer">' + window.DOM_UTILS.escapeHtml(p.phoneDisplay) + "</a></span></div>" +
        '<div class="footer-contact-item"><i class="ph ph-envelope" aria-hidden="true"></i><span>Email: <a class="footer-link" href="mailto:' + window.DOM_UTILS.escapeHtml(p.email) + '">' + window.DOM_UTILS.escapeHtml(p.email) + "</a></span></div>" +
        '<div class="footer-contact-item"><i class="ph ph-instagram-logo" aria-hidden="true"></i><span>Instagram: <a class="footer-link" href="' + window.DOM_UTILS.escapeHtml(p.instagramUrl) + '" target="_blank" rel="noopener noreferrer">' + window.DOM_UTILS.escapeHtml(p.instagramHandle) + "</a></span></div>";
    }
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
      hydrateHeaderBrand();
      renderTopBarAndNav();
      bindNavigationEvents();
      bindThemeToggle();
      hydrateHeroAndSlider();
      hydrateSidebar();
      hydrateFooter();
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
