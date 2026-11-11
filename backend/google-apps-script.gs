var DRIVE_SETTINGS = {
  LAMPIRAN_FILE_ID: "PASTE_PRIVATE_LAMPIRAN_DRIVE_FILE_ID",
  TEMP_SHARE_FOLDER_ID: "PASTE_PERSONAL_DRIVE_FOLDER_ID",
  OWNER_NOTIFICATION_EMAIL: "lukmanlooker00@gmail.com"
};
function doGet(e) {
  var action = e && e.parameter ? e.parameter.action : "ping";
  return jsonResponse({
    ok: true,
    service: "Personal Drive Access Bridge (Placeholder Ready)",
    action: action
  });
}
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents || "{}");
    var action = payload.action || "";
    if (action === "notifyNewRequest") {
      return handleNotifyNewRequest(payload);
    }
    if (action === "approveAndShareLampiran") {
      return handleApproveAndShare(payload);
    }
    if (action === "revokeLampiranAccess") {
      return handleRevokeAccess(payload);
    }
    return jsonResponse({ ok: false, error: "Aksi tidak dikenal." });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}
function handleNotifyNewRequest(payload) {
  if (DRIVE_SETTINGS.OWNER_NOTIFICATION_EMAIL.indexOf("@") !== -1) {
    var subject = "[Portal Pribadi] Permintaan Kolaborasi / Lampiran: " + (payload.code || "");
    var body =
      "Bidang: " + (payload.trackLabel || "-") + "\n" +
      "Pemohon: " + (payload.requesterName || "-") + "\n" +
      "Email: " + (payload.requesterEmail || "-") + "\n" +
      "Instansi: " + (payload.organization || "-") + "\n" +
      "Keperluan: " + (payload.purpose || "-") + "\n" +
      "Kode Tiket: " + (payload.code || "-") + "\n\n" +
      "Buka Portal Admin pada website pribadi Anda untuk menyetujui atau menolak permohonan.";
    MailApp.sendEmail(DRIVE_SETTINGS.OWNER_NOTIFICATION_EMAIL, subject, body);
  }
  return jsonResponse({ ok: true, notified: true });
}
function handleApproveAndShare(payload) {
  var requesterEmail = (payload.requesterEmail || "").trim();
  if (!requesterEmail) {
    return jsonResponse({ ok: false, error: "Email pemohon kosong." });
  }
  if (DRIVE_SETTINGS.LAMPIRAN_FILE_ID.indexOf("PASTE_") === 0) {
    return jsonResponse({ ok: false, error: "LAMPIRAN_FILE_ID belum diisi di Apps Script." });
  }
  var file = DriveApp.getFileById(DRIVE_SETTINGS.LAMPIRAN_FILE_ID);
  file.addViewer(requesterEmail);
  var shareUrl = file.getUrl();
  MailApp.sendEmail(
    requesterEmail,
    "Persetujuan Akses Dokumen Lampiran — Muhammad Lukman Hakim, S.H.",
    "Yth. " + (payload.requesterName || "Pemohon") + ",\n\n" +
      "Permohonan Anda dengan kode " + (payload.code || "-") + " untuk mengakses dokumen pendukung (Lampiran.pdf) telah disetujui.\n" +
      "Silakan akses melalui tautan Google Drive terproteksi berikut menggunakan akun Google (" + requesterEmail + "):\n" +
      shareUrl + "\n\n" +
      "Hormat kami,\nMuhammad Lukman Hakim, S.H."
  );
  return jsonResponse({ ok: true, sharedTo: requesterEmail, url: shareUrl });
}
function handleRevokeAccess(payload) {
  var requesterEmail = (payload.requesterEmail || "").trim();
  if (!requesterEmail || DRIVE_SETTINGS.LAMPIRAN_FILE_ID.indexOf("PASTE_") === 0) {
    return jsonResponse({ ok: false, error: "Konfigurasi atau email tidak valid." });
  }
  var file = DriveApp.getFileById(DRIVE_SETTINGS.LAMPIRAN_FILE_ID);
  file.removeViewer(requesterEmail);
  return jsonResponse({ ok: true, revoked: requesterEmail });
}
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
