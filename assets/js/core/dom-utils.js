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
  }
};
