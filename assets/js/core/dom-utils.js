window.DOM_UTILS = {
  getRootPrefix: function () {
    return document.body.getAttribute("data-root") || "";
  },
  isExternalUrl: function (path) {
    return /^(https?:|mailto:|tel:)/i.test(path || "") || /\.pdf$/i.test(path || "");
  },
  withRoot: function (path) {
    if (!path) {
      return "#";
    }
    if (/^(https?:|mailto:|tel:|#)/i.test(path)) {
      return path;
    }
    return this.getRootPrefix() + path.replace(/^\//, "");
  },
  resolveLink: function (path, forceExternal) {
    var external = Boolean(forceExternal || this.isExternalUrl(path));
    return {
      href: this.withRoot(path),
      attr: external ? ' target="_blank" rel="noopener noreferrer"' : "",
      isExternal: external
    };
  },
  escapeHtml: function (value) {
    var str = String(value === undefined || value === null ? "" : value);
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },
  getQueryParam: function (name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
  },
  getRequestStatusMeta: function (status, labels) {
    var pendingLabel = (labels && labels.pending) || "Menunggu Persetujuan";
    if (status === "approved") {
      return { text: "Disetujui", cls: "pill-tag-green" };
    }
    if (status === "rejected" || status === "revoked") {
      return { text: "Ditolak / Dicabut", cls: "pill-tag-red" };
    }
    return { text: pendingLabel, cls: "pill-tag-amber" };
  },
  formatDateTimeId: function (isoString) {
    if (!isoString) {
      return "-";
    }
    var date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return isoString;
    }
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  },
  applyRootLinks: function (scope) {
    var rootEl = scope || document;
    var self = this;
    rootEl.querySelectorAll("[data-root-href]").forEach(function (el) {
      var raw = el.getAttribute("data-root-href");
      el.setAttribute("href", self.withRoot(raw));
    });
    rootEl.querySelectorAll("[data-root-src]").forEach(function (el) {
      var rawSrc = el.getAttribute("data-root-src");
      el.setAttribute("src", self.withRoot(rawSrc));
    });
  },
  initCarousel: function (cfg) {
    if (!cfg || !cfg.viewport || !cfg.track) {
      return null;
    }
    var container = cfg.container || cfg.viewport;
    var viewport = cfg.viewport;
    var track = cfg.track;
    var autoMs = cfg.autoIntervalMs || 6000;
    var dimMs = cfg.idleDimDelayMs || 2200;
    var autoTimer = null;
    var dimTimer = null;
    var isHovered = false;
    var isFocused = false;
    var isDragging = false;
    var activePointerId = null;
    var startX = 0;
    var startY = 0;
    var axis = "";
    var dragDx = 0;
    var baseOffsetPx = 0;
    var suppressClickUntil = 0;
    function setDimmed(dimmed) {
      container.classList.toggle("is-auto-idle", Boolean(dimmed));
    }
    function scheduleDim() {
      clearTimeout(dimTimer);
      dimTimer = setTimeout(function () {
        if (!isHovered && !isFocused && !isDragging) {
          setDimmed(true);
        }
      }, dimMs);
    }
    function wakeControls() {
      setDimmed(false);
      scheduleDim();
    }
    function restartAutoTimer() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () {
        if (isHovered || isFocused || isDragging) {
          return;
        }
        cfg.onStep(1);
        setDimmed(true);
      }, autoMs);
    }
    function stepManual(delta) {
      cfg.onStep(delta);
      wakeControls();
      restartAutoTimer();
    }
    if (cfg.prevBtn) {
      cfg.prevBtn.addEventListener("click", function () {
        stepManual(-1);
      });
    }
    if (cfg.nextBtn) {
      cfg.nextBtn.addEventListener("click", function () {
        stepManual(1);
      });
    }
    container.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "mouse") {
        isHovered = true;
        setDimmed(false);
      }
    });
    container.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse") {
        isHovered = false;
        scheduleDim();
      }
    });
    container.addEventListener("focusin", function () {
      isFocused = true;
      setDimmed(false);
    });
    container.addEventListener("focusout", function (e) {
      if (!e.relatedTarget || !container.contains(e.relatedTarget)) {
        isFocused = false;
        scheduleDim();
      }
    });
    viewport.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
    viewport.addEventListener(
      "click",
      function (e) {
        if (Date.now() < suppressClickUntil) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );
    viewport.addEventListener("pointerdown", function (e) {
      if (!e.isPrimary || e.target.closest("button")) {
        return;
      }
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }
      isDragging = true;
      activePointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      axis = "";
      dragDx = 0;
      baseOffsetPx = cfg.getBaseOffsetPx ? cfg.getBaseOffsetPx() : 0;
      wakeControls();
    });
    function finishDrag(e, canceled) {
      if (!isDragging || (e && e.pointerId !== undefined && e.pointerId !== activePointerId)) {
        return;
      }
      var wasHorizontal = axis === "x";
      var dx = dragDx;
      isDragging = false;
      activePointerId = null;
      axis = "";
      track.classList.remove("is-dragging");
      if (!wasHorizontal) {
        scheduleDim();
        return;
      }
      if (Math.abs(dx) > 10) {
        suppressClickUntil = Date.now() + 350;
      }
      var threshold = Math.min(48, Math.max(26, (viewport.clientWidth || 320) * 0.12));
      if (!canceled && dx <= -threshold) {
        cfg.onStep(1);
      } else if (!canceled && dx >= threshold) {
        cfg.onStep(-1);
      } else {
        cfg.onStep(0);
      }
      scheduleDim();
      restartAutoTimer();
    }
    window.addEventListener("pointermove", function (e) {
      if (!isDragging || e.pointerId !== activePointerId) {
        return;
      }
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) {
          return;
        }
        if (Math.abs(dy) > Math.abs(dx)) {
          finishDrag(e, true);
          return;
        }
        axis = "x";
        track.classList.add("is-dragging");
      }
      dragDx = dx;
      track.style.transform = "translateX(" + (baseOffsetPx + dragDx) + "px)";
    });
    window.addEventListener("pointerup", function (e) {
      finishDrag(e, false);
    });
    window.addEventListener("pointercancel", function (e) {
      finishDrag(e, true);
    });
    scheduleDim();
    restartAutoTimer();
    return {
      notifyInteract: function () {
        wakeControls();
        restartAutoTimer();
      }
    };
  },
  initTickerSwipe: function (viewport, track) {
    if (!viewport || !track) {
      return;
    }
    var isDragging = false;
    var activePointerId = null;
    var startX = 0;
    var startY = 0;
    var axis = "";
    var offsetPx = 0;
    var resumeTimer = null;
    viewport.addEventListener("pointerdown", function (e) {
      if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) {
        return;
      }
      clearTimeout(resumeTimer);
      isDragging = true;
      activePointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      axis = "";
      offsetPx = 0;
      track.classList.add("is-paused");
    });
    function releaseTicker(e) {
      if (!isDragging || (e && e.pointerId !== undefined && e.pointerId !== activePointerId)) {
        return;
      }
      isDragging = false;
      activePointerId = null;
      axis = "";
      track.classList.remove("is-dragging");
      track.style.marginLeft = "0px";
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () {
        track.classList.remove("is-paused");
      }, 1800);
    }
    window.addEventListener("pointermove", function (e) {
      if (!isDragging || e.pointerId !== activePointerId) {
        return;
      }
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) {
          return;
        }
        if (Math.abs(dy) > Math.abs(dx)) {
          releaseTicker(e);
          return;
        }
        axis = "x";
        track.classList.add("is-dragging");
      }
      var limit = Math.max(120, Math.round((viewport.clientWidth || 320) * 0.55));
      offsetPx = Math.max(-limit, Math.min(limit, dx));
      track.style.marginLeft = offsetPx + "px";
    });
    window.addEventListener("pointerup", releaseTicker);
    window.addEventListener("pointercancel", releaseTicker);
  }
};
