window.STORAGE_SERVICE = (function () {
  var LOCAL_KEY = "mlh_lampiran_requests_v1";
  var AUTH_KEY = "mlh_admin_session_v1";
  function generateCode() {
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var out = "LMP-";
    for (var i = 0; i < 6; i++) {
      out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return out;
  }
  function getLocalRequests() {
    try {
      var raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function saveLocalRequests(list) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  }
  function getSession() {
    try {
      var raw = sessionStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
  function setSession(sessionObj) {
    if (!sessionObj) {
      sessionStorage.removeItem(AUTH_KEY);
      return;
    }
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(sessionObj));
  }
  function notifyDriveBridge(action, payload) {
    if (!window.PERSONAL_BACKEND_HELPERS.isDriveConfigured()) {
      return Promise.resolve({ ok: true, mode: "placeholder" });
    }
    var url = window.PERSONAL_BACKEND_CONFIG.driveBridge.appsScriptUrl;
    var body = Object.assign({ action: action }, payload);
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body)
    })
      .then(function (res) {
        return res.json();
      })
      .catch(function (err) {
        return { ok: false, error: err.message };
      });
  }
  function submitRequest(input) {
    var record = {
      id: "req_" + Date.now(),
      code: generateCode(),
      track: (input.track || "lampiran").trim(),
      trackLabel: (input.trackLabel || "Permohonan Verifikasi Lampiran.pdf").trim(),
      requesterName: (input.requesterName || "").trim(),
      requesterEmail: (input.requesterEmail || "").trim().toLowerCase(),
      organization: (input.organization || "").trim(),
      purpose: (input.purpose || "").trim(),
      status: "pending",
      adminNote: "Menunggu peninjauan pemilik berkas.",
      shareUrl: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (window.PERSONAL_BACKEND_HELPERS.isFirebaseConfigured()) {
      var baseUrl = window.PERSONAL_BACKEND_CONFIG.firebase.databaseURL.replace(/\/$/, "");
      return fetch(baseUrl + "/attachment_requests/" + record.code + ".json", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      })
        .then(function (res) {
          if (!res.ok) {
            throw new Error("Gagal menyimpan permohonan ke Firebase RTDB.");
          }
          return notifyDriveBridge("notifyNewRequest", record);
        })
        .then(function () {
          return { ok: true, mode: "firebase", data: record };
        });
    }
    var list = getLocalRequests();
    list.unshift(record);
    saveLocalRequests(list);
    return Promise.resolve({ ok: true, mode: "placeholder", data: record });
  }
  function findRequestByCodeOrEmail(queryText) {
    var clean = (queryText || "").trim().toLowerCase();
    if (!clean) {
      return Promise.resolve([]);
    }
    if (window.PERSONAL_BACKEND_HELPERS.isFirebaseConfigured()) {
      var baseUrl = window.PERSONAL_BACKEND_CONFIG.firebase.databaseURL.replace(/\/$/, "");
      var directCode = clean.toUpperCase();
      return fetch(baseUrl + "/attachment_requests/" + encodeURIComponent(directCode) + ".json")
        .then(function (res) {
          return res.json();
        })
        .then(function (item) {
          return item ? [item] : [];
        });
    }
    var matches = getLocalRequests().filter(function (item) {
      return (
        item.code.toLowerCase() === clean ||
        item.requesterEmail.toLowerCase() === clean
      );
    });
    return Promise.resolve(matches);
  }
  function listAllRequests() {
    if (window.PERSONAL_BACKEND_HELPERS.isFirebaseConfigured()) {
      var session = getSession();
      var token = session && session.idToken ? "?auth=" + encodeURIComponent(session.idToken) : "";
      var baseUrl = window.PERSONAL_BACKEND_CONFIG.firebase.databaseURL.replace(/\/$/, "");
      return fetch(baseUrl + "/attachment_requests.json" + token)
        .then(function (res) {
          if (!res.ok) {
            throw new Error("Akses ditolak atau sesi admin habis.");
          }
          return res.json();
        })
        .then(function (obj) {
          if (!obj) {
            return [];
          }
          return Object.keys(obj)
            .map(function (k) {
              return obj[k];
            })
            .sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
        });
    }
    return Promise.resolve(getLocalRequests());
  }
  function updateRequestStatus(code, status, adminNote) {
    var patch = {
      status: status,
      adminNote: adminNote,
      updatedAt: new Date().toISOString()
    };
    if (window.PERSONAL_BACKEND_HELPERS.isFirebaseConfigured()) {
      var session = getSession();
      var token = session && session.idToken ? "?auth=" + encodeURIComponent(session.idToken) : "";
      var baseUrl = window.PERSONAL_BACKEND_CONFIG.firebase.databaseURL.replace(/\/$/, "");
      return fetch(baseUrl + "/attachment_requests/" + encodeURIComponent(code) + ".json" + token)
        .then(function (r) {
          return r.json();
        })
        .then(function (existing) {
          if (!existing) {
            throw new Error("Data permohonan tidak ditemukan.");
          }
          var bridgePromise = Promise.resolve({ ok: true });
          if (status === "approved") {
            bridgePromise = notifyDriveBridge("approveAndShareLampiran", existing);
          } else if (status === "rejected" || status === "revoked") {
            bridgePromise = notifyDriveBridge("revokeLampiranAccess", existing);
          }
          return bridgePromise.then(function (bridgeRes) {
            if (bridgeRes && bridgeRes.url) {
              patch.shareUrl = bridgeRes.url;
            }
            return fetch(baseUrl + "/attachment_requests/" + encodeURIComponent(code) + ".json" + token, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(patch)
            }).then(function () {
              return { ok: true, mode: "firebase", bridge: bridgeRes };
            });
          });
        });
    }
    var list = getLocalRequests();
    var updatedItem = null;
    list = list.map(function (item) {
      if (item.code === code) {
        updatedItem = Object.assign({}, item, patch, {
          shareUrl: status === "approved" ? "Akses disetujui pada Mode Simulasi Lokal (tautan Google Drive aktif setelah konfigurasi Apps Script)." : ""
        });
        return updatedItem;
      }
      return item;
    });
    saveLocalRequests(list);
    return Promise.resolve({ ok: Boolean(updatedItem), mode: "placeholder", data: updatedItem });
  }
  function signInAdmin(email, password) {
    if (window.PERSONAL_BACKEND_HELPERS.isFirebaseConfigured()) {
      var apiKey = window.PERSONAL_BACKEND_CONFIG.firebase.apiKey;
      return fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          encodeURIComponent(apiKey),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      )
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          if (data.error) {
            throw new Error(data.error.message || "Gagal login Firebase.");
          }
          var sess = {
            mode: "firebase",
            email: data.email,
            idToken: data.idToken
          };
          setSession(sess);
          return sess;
        });
    }
    var simSession = {
      mode: "placeholder",
      email: email || window.PERSONAL_BACKEND_CONFIG.adminAuth.defaultAdminEmail,
      idToken: ""
    };
    setSession(simSession);
    return Promise.resolve(simSession);
  }
  function signOutAdmin() {
    setSession(null);
  }
  return {
    submitRequest: submitRequest,
    findRequestByCodeOrEmail: findRequestByCodeOrEmail,
    listAllRequests: listAllRequests,
    updateRequestStatus: updateRequestStatus,
    signInAdmin: signInAdmin,
    signOutAdmin: signOutAdmin,
    getSession: getSession
  };
})();
