(function () {
  function bootPage(page) {
    if (page === "home" && window.PAGE_HOME) {
      window.PAGE_HOME.init();
    } else if (page === "profil" && window.PAGE_PROFIL) {
      window.PAGE_PROFIL.init();
    } else if (page === "karya" && window.PAGE_KARYA) {
      window.PAGE_KARYA.init();
    } else if (page === "puisi" && window.PAGE_PUISI) {
      window.PAGE_PUISI.init();
    } else if (page === "kolaborasi" && window.PAGE_KOLABORASI) {
      window.PAGE_KOLABORASI.init();
    } else if (page === "admin" && window.PAGE_ADMIN) {
      window.PAGE_ADMIN.init();
    }
  }
  function boot() {
    var page = document.body.getAttribute("data-page") || "";
    bootPage(page);
    window.LAYOUT_CORE.init();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();