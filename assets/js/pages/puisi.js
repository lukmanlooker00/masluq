window.PAGE_PUISI = (function () {
  function openPoemModal(poem) {
    var titleEl = document.getElementById("poem-modal-title");
    var metaEl = document.getElementById("poem-modal-meta");
    var bodyEl = document.getElementById("poem-modal-content");
    if (!titleEl || !metaEl || !bodyEl) {
      return;
    }
    titleEl.textContent = poem.title;
    metaEl.textContent = "Tanggal Tulis: " + poem.date + " • Tema: " + poem.theme + " • Oleh Muhammad Lukman Hakim";
    bodyEl.textContent = poem.content;
    window.LAYOUT_CORE.openModal("poem-modal");
  }
  function init() {
    var grid = document.getElementById("anthology-grid");
    if (!grid) {
      return;
    }
    var poems = window.SITE_DATA.poems;
    grid.innerHTML = poems
      .map(function (poem) {
        var preview = poem.content.split("\n").slice(0, 4).join("\n");
        return (
          '<article class="poem-card" id="' + window.DOM_UTILS.escapeHtml(poem.id) + '">' +
          '<div class="card-meta"><span class="poem-date">' + window.DOM_UTILS.escapeHtml(poem.date) + '</span><span class="pill-tag pill-tag-gold">' + window.DOM_UTILS.escapeHtml(poem.theme) + "</span></div>" +
          '<h3 class="poem-title">' + window.DOM_UTILS.escapeHtml(poem.title) + "</h3>" +
          '<div class="poem-excerpt">' + window.DOM_UTILS.escapeHtml(preview) + "\n...</div>" +
          '<div class="mt-12"><button type="button" class="btn btn-primary btn-sm" data-poem-id="' + window.DOM_UTILS.escapeHtml(poem.id) + '">Baca Utuh</button></div>' +
          "</article>"
        );
      })
      .join("");
    grid.querySelectorAll("[data-poem-id]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-poem-id");
        var found = poems.find(function (p) {
          return p.id === id;
        });
        if (found) {
          openPoemModal(found);
        }
      });
    });
    if (window.location.hash) {
      var hashId = window.location.hash.replace(/^#/, "");
      var targetPoem = poems.find(function (p) {
        return p.id === hashId;
      });
      if (targetPoem) {
        openPoemModal(targetPoem);
      }
    }
  }
  return { init: init };
})();
