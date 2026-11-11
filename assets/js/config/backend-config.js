window.PERSONAL_BACKEND_CONFIG = {
  projectLabel: "PERSONAL_LUKMAN_HAKIM_ISOLATED",
  firebase: {
    apiKey: "PASTE_PERSONAL_FIREBASE_API_KEY",
    authDomain: "YOUR_PERSONAL_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PERSONAL_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PERSONAL_PROJECT",
    storageBucket: "YOUR_PERSONAL_PROJECT.appspot.com",
    messagingSenderId: "PASTE_PERSONAL_MESSAGING_SENDER_ID",
    appId: "PASTE_PERSONAL_APP_ID"
  },
  driveBridge: {
    appsScriptUrl: "PASTE_PERSONAL_GAS_WEBAPP_URL",
    lampiranFileId: "PASTE_PRIVATE_LAMPIRAN_DRIVE_FILE_ID",
    lampiranFolderId: "PASTE_PERSONAL_DRIVE_FOLDER_ID"
  },
  adminAuth: {
    defaultAdminEmail: "lukmanlooker00@gmail.com"
  }
};
window.PERSONAL_BACKEND_HELPERS = {
  isFirebaseConfigured: function () {
    var cfg = window.PERSONAL_BACKEND_CONFIG.firebase;
    return Boolean(
      cfg &&
      cfg.databaseURL &&
      cfg.databaseURL.indexOf("YOUR_PERSONAL_PROJECT") === -1 &&
      cfg.apiKey &&
      cfg.apiKey.indexOf("PASTE_") === -1
    );
  },
  isDriveConfigured: function () {
    var drv = window.PERSONAL_BACKEND_CONFIG.driveBridge;
    return Boolean(
      drv &&
      drv.appsScriptUrl &&
      drv.appsScriptUrl.indexOf("PASTE_") === -1 &&
      drv.lampiranFileId &&
      drv.lampiranFileId.indexOf("PASTE_") === -1
    );
  }
};
