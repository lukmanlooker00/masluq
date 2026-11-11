window.PAGE_PROFIL = (function () {
  function renderEducation() {
    var tbody = document.getElementById("education-table-body");
    if (!tbody) {
      return;
    }
    tbody.innerHTML = window.SITE_DATA.educationAndCerts
      .map(function (row) {
        return (
          "<tr>" +
          "<td><strong>" + window.DOM_UTILS.escapeHtml(row.year) + "</strong></td>" +
          "<td><strong>" + window.DOM_UTILS.escapeHtml(row.title) + "</strong><div>" + window.DOM_UTILS.escapeHtml(row.institution) + "</div></td>" +
          "<td>" + window.DOM_UTILS.escapeHtml(row.note) + "</td>" +
          "</tr>"
        );
      })
      .join("");
  }
  function renderExperiences() {
    var wrap = document.getElementById("experience-grouped-sections");
    if (!wrap) {
      return;
    }
    wrap.innerHTML = window.SITE_DATA.experiences
      .map(function (exp) {
        var bullets = exp.highlights
          .map(function (h) {
            return "<li>&#8226; " + window.DOM_UTILS.escapeHtml(h) + "</li>";
          })
          .join("");
        var bidangKey = exp.track === "hukum-manajemen" ? "hukum" : exp.track;
        return (
          '<section id="exp-' + window.DOM_UTILS.escapeHtml(exp.track) + '">' +
          '<h2 class="article-subheading">' + window.DOM_UTILS.escapeHtml(exp.trackTitle) + "</h2>" +
          '<div class="timeline-list">' +
          '<article class="timeline-item">' +
          '<div class="timeline-period">' + window.DOM_UTILS.escapeHtml(exp.period) + "</div>" +
          '<h3 class="timeline-role">' + window.DOM_UTILS.escapeHtml(exp.role) + "</h3>" +
          '<div class="timeline-org">' + window.DOM_UTILS.escapeHtml(exp.org) + "</div>" +
          "<p>" + window.DOM_UTILS.escapeHtml(exp.summary) + "</p>" +
          '<ul class="mt-12">' + bullets + "</ul>" +
          '<div class="mt-12"><a class="section-link" href="' + window.DOM_UTILS.escapeHtml(window.DOM_UTILS.withRoot("kolaborasi/index.html?bidang=" + encodeURIComponent(bidangKey))) + '">Ajukan Kerja Sama di Bidang Ini <i class="ph ph-arrow-right" aria-hidden="true"></i></a></div>' +
          "</article></div></section>"
        );
      })
      .join("");
  }
  function init() {
    renderEducation();
    renderExperiences();
  }
  return { init: init };
})();