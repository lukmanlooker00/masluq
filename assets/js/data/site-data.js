window.SITE_DATA = {
  profile: {
    fullName: "Muhammad Lukman Hakim, S.H.",
    shortName: "Lukman Hakim",
    monogram: "MLH",
    tagline: "Sarjana Hukum • Pemilik Usaha • Pengembang Web",
    address: "Jl. Manyar II, Sidoarjo, Jawa Timur, Indonesia",
    phoneDisplay: "0812-1528-9095",
    phoneRaw: "081215289095",
    whatsappUrl: "https://wa.me/6281215289095",
    email: "lukmanlooker00@gmail.com",
    instagramHandle: "@lukman_looker",
    instagramUrl: "https://www.instagram.com/lukman_looker/",
    facebookName: "Muhammad Lukman Hakim",
    facebookUrl: "https://www.facebook.com/search/top?q=muhammad%20lukman%20hakim",
    portraitPath: "assets/img/profile/lukman-hakim.webp",
    logoPath: "assets/img/logo/logo.webp",
    cvPath: "assets/docs/Curriculum_Vitae.pdf",
    quote: "Setiap keperluan kerja sama sudah saya pisahkan pintunya, supaya Anda yang butuh travel, jasa website, maupun tenaga hukum atau manajemen bisa langsung berdiskusi sesuai tujuannya."
  },
  navigation: [
    { label: "Beranda", href: "index.html", key: "beranda" },
    {
      label: "Bidang & Karya",
      href: "karya/index.html",
      key: "karya",
      children: [
        { label: "Tour & Travel (Jakalelana.id)", href: "karya/index.html?track=travel" },
        { label: "Website & Digital (PT Sintara)", href: "karya/index.html?track=digital" },
        { label: "Hukum, QMR & Perkantoran", href: "karya/index.html?track=hukum-manajemen" },
        { label: "Lihat Semua Bidang", href: "karya/index.html" }
      ]
    },
    {
      label: "Profil",
      href: "profil/tentang.html",
      key: "profil",
      children: [
        { label: "Tentang & Pendidikan", href: "profil/tentang.html" },
        { label: "Pengalaman Kerja & Usaha", href: "profil/pengalaman.html" }
      ]
    },
    { label: "Antologi Puisi", href: "puisi/index.html", key: "puisi" },
    {
      label: "Kolaborasi & Dokumen",
      href: "kolaborasi/index.html",
      key: "kolaborasi",
      children: [
        { label: "Ajukan Kerja Sama / Izin Lampiran", href: "kolaborasi/index.html" },
        { label: "Unduh Curriculum Vitae (PDF)", href: "assets/docs/Curriculum_Vitae.pdf", external: true },
        { label: "Cek Status Permohonan", href: "kolaborasi/index.html#status-akses" }
      ]
    },
    { label: "Portal Admin", href: "admin/index.html", key: "admin" }
  ],
  heroSlides: [
    {
      image: "assets/img/banner/banner-profil.webp",
      alt: "Profil resmi Muhammad Lukman Hakim, S.H. Sarjana Hukum, Eks QMR Pelayaran, dan Fullstack Web Developer"
    },
    {
      image: "assets/img/banner/banner-usaha.webp",
      alt: "Unit usaha Jakalelana Tour & Travel dan PT Sintara Digital Nusantara sisitus.com"
    },
    {
      image: "assets/img/banner/banner-puisi.webp",
      alt: "Antologi Kegabutan yang Berujung Torehan Puisi dan portal permintaan dokumen"
    }
  ],
  tickerItems: [
    "Layanan tour & travel, paket wisata rombongan, dan sewa armada: Jakalelana.id",
    "Jasa pembuatan website perusahaan, sekolah, dan aplikasi web: PT Sintara Digital Nusantara (sisitus.com)",
    "Karier profesional bidang Hukum (S.H.), QMR Pelayaran, dan Administrasi Perkantoran",
    "CV terbuka untuk diunduh; akses berkas Lampiran.pdf (ijazah & sertifikat) diajukan lewat verifikasi email"
  ],
  quickRoutes: [
    {
      badge: "Bidang 01",
      icon: "ph-airplane-tilt",
      title: "Tour & Travel",
      entity: "Jakalelana.id",
      desc: "Paket wisata, kunjungan instansi & armada.",
      cta: "Lihat Layanan",
      href: "#jalur-travel"
    },
    {
      badge: "Bidang 02",
      icon: "ph-code",
      title: "Website & Sistem",
      entity: "PT Sintara (sisitus.com)",
      desc: "Pembuatan website, aplikasi & sistem kerja.",
      cta: "Lihat Jasa Web",
      href: "#jalur-digital"
    },
    {
      badge: "Bidang 03",
      icon: "ph-scales",
      title: "Hukum, QMR & Kantor",
      entity: "Sarjana Hukum • Eks QMR",
      desc: "Manajemen mutu, SOP, surat & arsip.",
      cta: "Lihat Kualifikasi",
      href: "#jalur-hukum-manajemen"
    },
    {
      badge: "Berkas",
      icon: "ph-file-pdf",
      title: "CV & Lampiran.pdf",
      entity: "Dokumen Pribadi",
      desc: "Unduh CV atau minta akses lampiran resmi.",
      cta: "Buka Berkas",
      href: "kolaborasi/index.html"
    }
  ],
  collaborationTracks: [
    {
      key: "travel",
      anchorId: "jalur-travel",
      badge: "Tour & Travel • Jakalelana.id",
      title: "Perjalanan Wisata & Transportasi — Jakalelana.id",
      entity: "Jakalelana Tour & Travel (jakalelana.id)",
      summary: "Urusan perjalanan wisata keluarga, study tour sekolah, kunjungan instansi, hingga sewa kendaraan saya kelola langsung lewat Jakalelana Tour & Travel.",
      points: [
        "Penyusunan rencana wisata keluarga, sekolah, dan rombongan instansi.",
        "Pengaturan transportasi dan koordinasi lapangan sesuai jadwal.",
        "Info paket dan pemesanan terhubung lewat situs jakalelana.id."
      ],
      image: "assets/img/karya/karya-jakalelana.webp",
      imageAlt: "Jakalelana Tour & Travel — jakalelana.id",
      primaryBtn: { label: "Buka Jakalelana.id", url: "https://jakalelana.id", external: true },
      secondaryBtn: { label: "Tanya Paket Travel", url: "kolaborasi/index.html?bidang=travel" },
      detailBtn: { label: "Detail Jakalelana", url: "karya/index.html?track=travel" }
    },
    {
      key: "digital",
      anchorId: "jalur-digital",
      badge: "Pembuatan Website & Sistem",
      title: "Website & Aplikasi Web — PT Sintara Digital Nusantara",
      entity: "PT Sintara Digital Nusantara (sisitus.com)",
      summary: "Kebutuhan pembuatan situs company profile perusahaan, web sekolah, portal organisasi, hingga sistem aplikasi berbasis web ditangani tim PT Sintara Digital Nusantara.",
      points: [
        "Pembuatan website resmi untuk usaha, sekolah, yayasan, dan kantor.",
        "Pengembangan aplikasi web fullstack, Firebase RTDB, serta formulir online.",
        "Penataan otomatisasi dokumen dengan Google Apps Script & Google Drive."
      ],
      image: "assets/img/karya/karya-sintara.webp",
      imageAlt: "PT Sintara Digital Nusantara — sisitus.com",
      primaryBtn: { label: "Buka Sisitus.com", url: "https://sisitus.com", external: true },
      secondaryBtn: { label: "Konsultasi Website", url: "kolaborasi/index.html?bidang=digital" },
      detailBtn: { label: "Portofolio Web", url: "karya/index.html?track=digital" }
    },
    {
      key: "hukum-manajemen",
      anchorId: "jalur-hukum-manajemen",
      badge: "Keahlian Hukum, QMR & Perkantoran",
      title: "Sarjana Hukum (S.H.), Manajemen Mutu (QMR) & Administrasi",
      entity: "Muhammad Lukman Hakim, S.H.",
      summary: "Terpisah dari unit usaha di atas, jalur ini memuat latar pendidikan S1 Hukum, pengalaman kerja sebagai QMR di perusahaan pelayaran, serta keahlian tata kelola administrasi kantor.",
      points: [
        "Berpengalaman sebagai Quality Management Representative (QMR) perusahaan pelayaran.",
        "Lulusan S1 Hukum Keluarga (S.H.), IAI Al-Qolam Malang pada Agustus 2023.",
        "Bersertifikat BNSP KKNI Level II Administrasi Perkantoran dan peserta kompetisi ISI Malang."
      ],
      image: "assets/img/karya/karya-pelayaran.webp",
      imageAlt: "Keahlian Hukum, Manajemen Mutu QMR, dan Administrasi Perkantoran",
      primaryBtn: { label: "Profil & Pendidikan", url: "profil/tentang.html", external: false },
      secondaryBtn: { label: "Unduh CV (PDF)", url: "assets/docs/Curriculum_Vitae.pdf", external: true },
      detailBtn: { label: "Ajukan Lampiran.pdf", url: "kolaborasi/index.html?bidang=hukum" }
    }
  ],
  experiences: [
    {
      track: "hukum-manajemen",
      trackTitle: "Pengalaman Manajemen Mutu, Perkantoran & Hukum",
      period: "Pengalaman Kerja",
      role: "Quality Management Representative (QMR)",
      org: "Perusahaan Pelayaran",
      summary: "Mengawal penerapan sistem manajemen mutu di perusahaan pelayaran, menertibkan berkas prosedur kerja kantor dan kapal, serta menyiapkan dokumen audit internal.",
      highlights: [
        "Menjaga keteraturan dokumen mutu dan arsip operasional divisi darat maupun armada.",
        "Menyiapkan kelengkapan audit internal dan mengawasi kepatuhan SOP perusahaan.",
        "Menyusun laporan evaluasi mutu kepada manajemen serta membantu berkas administrasi hukum."
      ]
    },
    {
      track: "travel",
      trackTitle: "Unit Usaha Tour & Travel",
      period: "Usaha Aktif",
      role: "Founder & Owner",
      org: "Jakalelana Tour & Travel (jakalelana.id)",
      summary: "Mendirikan dan mengelola usaha perjalanan wisata serta sewa transportasi. Menangani penyusunan rencana perjalanan, penjadwalan armada, serta komunikasi langsung dengan peserta tur.",
      highlights: [
        "Menyusun agenda perjalanan wisata keluarga, sekolah, dan rombongan instansi.",
        "Mengatur jadwal kendaraan operasional dan kerja sama mitra transportasi.",
        "Menangani informasi layanan serta pemesanan melalui situs jakalelana.id."
      ]
    },
    {
      track: "digital",
      trackTitle: "Unit Usaha Digital & Pembuatan Website",
      period: "Usaha Aktif",
      role: "Pemilik & Fullstack Web Developer",
      org: "PT Sintara Digital Nusantara (sisitus.com)",
      summary: "Menjalankan perusahaan pembuatan website dan sistem web untuk sekolah, perusahaan, dan pelaku usaha melalui layanan di sisitus.com.",
      highlights: [
        "Membangun situs web mulai dari rancangan tampilan sampai tayang online.",
        "Membuat sistem aplikasi web fullstack yang terhubung Firebase RTDB dan Google Apps Script.",
        "Menjaga struktur kode tetap ringan, teratur, dan mudah dirawat jangka panjang."
      ]
    }
  ],
  educationAndCerts: [
    {
      year: "2019 – 2023",
      title: "S1 Hukum Keluarga (Sarjana Hukum / S.H.)",
      institution: "Institut Agama Islam (IAI) Al-Qolam Malang",
      note: "Lulus pada Agustus 2023."
    },
    {
      year: "2016 – 2019",
      title: "Sekolah Menengah Kejuruan — Administrasi Perkantoran",
      institution: "SMK PGRI Sumbermanjing, Malang",
      note: "Mempelajari tata persuratan, pengarsipan, pembukuan dasar, dan aplikasi kantor."
    },
    {
      year: "2019 / 2021",
      title: "Sertifikasi Kompetensi KKNI Level II Otomatisasi & Tatakelola Perkantoran",
      institution: "Badan Nasional Sertifikasi Profesi (BNSP)",
      note: "Sertifikasi resmi bidang administrasi perkantoran."
    },
    {
      year: "2017",
      title: "Certificate of Competition — Indonesian Association of Secretaries & Administrative Professionals",
      institution: "Ikatan Sekretaris Indonesia (ISI) Cabang Malang",
      note: "Kompetisi mengetik cepat, telepon kantor, korespondensi, dan pengelolaan arsip."
    },
    {
      year: "2023",
      title: "Sertifikat TOEFL",
      institution: "Brighten English, Pare, Kediri",
      note: "Pengujian kemampuan bahasa Inggris."
    }
  ],
  portfolioItems: [
    {
      slug: "jakalelana-tour-travel",
      track: "travel",
      categoryLabel: "Tour & Travel • Jakalelana.id",
      date: "Aktif",
      title: "Jakalelana Tour & Travel — jakalelana.id",
      subtitle: "Paket perjalanan wisata, kunjungan rombongan instansi, dan sewa armada transportasi.",
      image: "assets/img/karya/karya-jakalelana.webp",
      externalUrl: "https://jakalelana.id",
      summary: "Unit usaha perjalanan wisata dan transportasi yang saya kelola langsung untuk melayani liburan keluarga, study tour, serta perjalanan dinas melalui jakalelana.id.",
      details: [
        "Diskusi dimulai dari penentuan kota tujuan, jumlah rombongan, susunan acara, dan pilihan kendaraan.",
        "Situs jakalelana.id menjadi pintu informasi paket serta kontak pemesanan langsung lewat WhatsApp pengelola.",
        "Mengutamakan ketepatan jadwal keberangkatan, kelayakan armada, dan rincian biaya yang jelas."
      ],
      stack: ["Tour & Travel", "Paket Rombongan", "Transportasi Wisata", "jakalelana.id"]
    },
    {
      slug: "sintara-digital-sisitus",
      track: "digital",
      categoryLabel: "Digital & Web • PT Sintara Digital",
      date: "Aktif",
      title: "PT Sintara Digital Nusantara — sisitus.com",
      subtitle: "Pembuatan website company profile, web sekolah, portal organisasi, dan aplikasi web.",
      image: "assets/img/karya/karya-sintara.webp",
      externalUrl: "https://sisitus.com",
      summary: "Perusahaan di balik layanan pembuatan situs web dan aplikasi web untuk mitra usaha maupun lembaga pendidikan di sisitus.com.",
      details: [
        "Menangani pembuatan website mulai dari penataan isi, tampilan desktop dan ponsel, sampai rilis online.",
        "Halaman dibuat ringan supaya cepat terbuka meski diakses menggunakan jaringan ponsel biasa.",
        "Membantu mitra merapikan formulir layanan maupun pencatatan administrasi harian lewat web."
      ],
      stack: ["PT Sintara Digital Nusantara", "Pembuatan Website", "Fullstack Web", "sisitus.com"]
    },
    {
      slug: "arsitektur-web-firebase-drive",
      track: "digital",
      categoryLabel: "Sistem Web • PT Sintara Digital",
      date: "Implementasi",
      title: "Portal Pengajuan Dokumen dengan Firebase RTDB & Drive Bridge",
      subtitle: "Pemisahan berkas publik dan dokumen privat berbasis persetujuan email.",
      image: "assets/img/karya/karya-fullstack.webp",
      externalUrl: "https://sisitus.com",
      summary: "Contoh modul web untuk menjaga dokumen pribadi tetap tertutup, di mana pemohon perlu mendaftarkan email dan menunggu izin pemilik.",
      details: [
        "Menyediakan formulir permintaan beserta kode tiket pengecekan tanpa harus menyewa server VPS terpisah.",
        "Memisahkan akses data pengunjung dari halaman persetujuan milik pemilik situs.",
        "Begitu permohonan disetujui di halaman admin, skrip Google Apps Script menyiapkan pembagian file di Google Drive."
      ],
      stack: ["HTML/CSS/JS", "Firebase RTDB", "Google Apps Script", "sisitus.com"]
    },
    {
      slug: "sistem-mutu-qmr-pelayaran",
      track: "hukum-manajemen",
      categoryLabel: "Manajemen Mutu • Eks QMR",
      date: "Pengalaman Kerja",
      title: "Quality Management Representative (QMR) Perusahaan Pelayaran",
      subtitle: "Pengawasan dokumen sistem mutu, ketertiban SOP, dan koordinasi audit internal.",
      image: "assets/img/karya/karya-pelayaran.webp",
      externalUrl: "",
      summary: "Pengalaman bekerja sebagai QMR di perusahaan pelayaran untuk menjaga kesesuaian dokumen operasional, ketertiban SOP, dan kesiapan audit.",
      details: [
        "Memastikan catatan prosedur kerja didokumentasikan dan dijalankan dengan tertib di kantor maupun armada.",
        "Menyiapkan berkas pemeriksaan menjelang jadwal audit serta mencatat perbaikan setelahnya.",
        "Relevan untuk perusahaan yang membutuhkan tenaga tata kelola mutu, administrasi dokumen, dan pengarsipan."
      ],
      stack: ["Quality Management (QMR)", "Audit Internal", "Pengendalian SOP", "Pelayaran"]
    },
    {
      slug: "latar-belakang-hukum-administrasi",
      track: "hukum-manajemen",
      categoryLabel: "Hukum & Perkantoran • S.H.",
      date: "Pendidikan & Sertifikasi",
      title: "Sarjana Hukum (S.H.) & Administrasi Perkantoran",
      subtitle: "Lulusan S1 Hukum Keluarga IAI Al-Qolam Malang & sertifikasi BNSP KKNI Level II.",
      image: "assets/img/karya/karya-hukum.webp",
      externalUrl: "",
      summary: "Latar belakang S1 Hukum Keluarga yang ditopang pendidikan SMK Administrasi Perkantoran, sertifikat BNSP KKNI Level II, serta pengalaman lomba sekretaris ISI Malang.",
      details: [
        "Siap ditempatkan pada bagian legal administratif, penyusunan surat dinas, pengarsipan, dan tata usaha kantor.",
        "Terbiasa menjaga kerapian catatan berkas maupun kepatuhan aturan organisasi.",
        "Salinan resmi ijazah S.H. dan sertifikat kompetensi di Lampiran.pdf bisa diminta aksesnya lewat form email."
      ],
      stack: ["Sarjana Hukum (S.H.)", "Surat Menyurat", "BNSP KKNI Level II", "ISI & TOEFL"]
    },
    {
      slug: "antologi-kegabutan-torehan-puisi",
      track: "literasi",
      categoryLabel: "Personal • Antologi Puisi",
      date: "2022–2023",
      title: "Antologi: Kegabutan yang Berujung Torehan Puisi",
      subtitle: "Enam naskah puisi pribadi yang ditulis sepanjang 2022–2023.",
      image: "assets/img/karya/karya-puisi.webp",
      externalUrl: "puisi/index.html",
      summary: "Kumpulan enam puisi pribadi tentang ibu, kerinduan, pesan kemerdekaan, kehidupan santri, dan kawan lama yang ditulis di waktu luang.",
      details: [
        "Disimpan pada menu Antologi Puisi tersendiri supaya tidak bercampur dengan informasi usaha maupun profil kerja.",
        "Keenam naskah disajikan utuh sesuai tulisan asli.",
        "Dapat dibaca kapan saja lewat menu Antologi Puisi."
      ],
      stack: ["Naskah Asli", "6 Judul Puisi", "2022–2023"]
    }
  ],
  collaborationOptions: [
    { value: "travel", label: "Tour & Travel (Jakalelana.id)" },
    { value: "digital", label: "Jasa Website & Sistem (PT Sintara / sisitus.com)" },
    { value: "hukum", label: "Kerja Sama / Lowongan Hukum (S.H.), QMR & Kantor" },
    { value: "lampiran", label: "Minta Akses Lampiran.pdf (Ijazah & Sertifikat Pribadi)" }
  ],
  galleryItems: [
    {
      image: "assets/img/karya/karya-jakalelana.webp",
      caption: "Jakalelana.id — Tour & Travel",
      href: "karya/index.html?track=travel"
    },
    {
      image: "assets/img/karya/karya-sintara.webp",
      caption: "PT Sintara Digital (sisitus.com) — Web & Sistem",
      href: "karya/index.html?track=digital"
    },
    {
      image: "assets/img/karya/karya-pelayaran.webp",
      caption: "Pengalaman QMR Perusahaan Pelayaran",
      href: "karya/index.html?track=hukum-manajemen"
    },
    {
      image: "assets/img/karya/karya-hukum.webp",
      caption: "Sarjana Hukum (S.H.) & Administrasi BNSP",
      href: "karya/index.html?track=hukum-manajemen"
    },
    {
      image: "assets/img/karya/karya-fullstack.webp",
      caption: "Fullstack Web & Integrasi Firebase / Drive",
      href: "karya/index.html?track=digital"
    },
    {
      image: "assets/img/karya/karya-puisi.webp",
      caption: "Tulisan Pribadi — Antologi Torehan Puisi",
      href: "puisi/index.html"
    }
  ],
  ecosystemLinks: [
    { label: "Tour & Travel: Jakalelana.id", url: "https://jakalelana.id" },
    { label: "Website & Sistem: PT Sintara (sisitus.com)", url: "https://sisitus.com" },
    { label: "Instagram @lukman_looker", url: "https://www.instagram.com/lukman_looker/" },
    { label: "Facebook Muhammad Lukman Hakim", url: "https://www.facebook.com/search/top?q=muhammad%20lukman%20hakim" },
    { label: "WhatsApp 0812-1528-9095", url: "https://wa.me/6281215289095" },
    { label: "Unduh Curriculum Vitae (PDF)", url: "assets/docs/Curriculum_Vitae.pdf" }
  ],
  poems: [
    {
      id: "ibuku-tercinta",
      title: "Ibuku tercinta",
      date: "03/03/2023",
      theme: "Keluarga & Bakti",
      content: "Dalam hampanya dunia penuh tipu\nBaru kusadari makna kasih sayang seorang ibu\nKasih sayang yg tak pernah layu\nMotivator dari luka yg berlika-liku\n\nIbu...\nIngin kukembali dimasa itu\nKetika peluk hangatmu tenangkan tangisku\nMenimang-nimang, sembari mengidungkan lagu\n\"tak lelo, lelo-lelo ledung, cup menengo ngger anakku\"\nBegitu merdu, begitu syahdu\nHingga kulelap tidur dipangkuanmu\n\nOh, ibu lihatlah...\nKeriput sudah kini wajahmu sembunyikan lelah\nPutih rambutmu merajut ribuan kisah\nRekah kulit kakimu menuntunku tentukan langkah\nMerabun netramu, namun takpernah henti kau tunjukkanku arah\n\nOh, ibuku tercinta...\nKelak, aku akan bersaksi dihadapan yang Maha Kuasa\nBahwa kaulah satu-satunya manusia\nYang benar-benar berjasa tiada hingga\n\nOh, Ibuku tercinta...\nTak perpernah luput disetiap penghujung doa\nRobbighfirli waliwalidayya, robbighfirli waliwalidayya\nSemoga engkau selalu dalam kasih sayang-Nya\nSeperti kasih sayangmu yang tak pernah sirna"
    },
    {
      id: "pengagum-rahasia",
      title: "Pengagum Rahasia",
      date: "15/12/2022",
      theme: "Rasa & Doa",
      content: "Tiap jumpa mata selalu terkesima\nTerpusat pada seorang wanita\nParas indah laksana purnama\nSelaras kelembutan hati perangainya\nSulit dipahami dan dimengerti, entahlah...\n\nAku, hanyalah orang waras yang tergila-gila\nHati yang tak tau apa-apa\nKerap kusalahkan dan ku tanya-tanya\nDari sekian milyat manusia\nMengapa harus luluh padanya, entahlah...\nSeolah karnanya semakin kupercaya\nBahwa sempurna itu memang ada\n\nOh tuhan tolonglah...\nIni tentang rasa\nSekiranya ku takmungkin bersamanya\nMatikan asmaraloka yang nian bergelora\n\nOh tuhan tolonglah...\nSangkaku menjauh adalah cara\nApadaya malah rindu yang kian membara\nLantas, rumus apa lagi yang harus kucoba\n\nOh tuhan tolonglah...\nSemakin ku terapung dalam khayalan cinta\nHaruskah aku menjadi pengagum rahasia\nLayaknya seorang Ali kepada Fatimah"
    },
    {
      id: "aku-ingin-mondok",
      title: "Aku ingin mondok",
      date: "22/10/2022",
      theme: "Pendidikan & Santri",
      content: "Tekad bulat tanpa ragu\nDisudut gerbang pintu\nKuletakkan ransel dan koper baju\nPelukan erat Ayah dan ibu\nMengiringi airmata yang meleleh haru\n\nAyah.. Ibu..\nTak usah kau khawatirkan anakmu\nBiarkan disini kuhabiskan masa mudaku\nMencari hakikat dan jati diri\nDisetiap butiran berkah yang kurengkuh\n\nAyah.. Ibu..\nTak usah kau khawatirkan anakmu\nBukankah kau pernah berpesan kala dulu\nJadilah orang yang bermanfaat\ndalam setiap langkah hidupmu\n\nAyah.. Ibu..\nTak usah kau khawatirkan anakmu\nBiarkan ia berjuang menuntut ilmu\nCukup doakan disetiap sujudmu\nSemoga aku kelak\nMampu mengankat derajatmu"
    },
    {
      id: "merdeka-atau-mati",
      title: "Merdeka atau mati",
      date: "17/08/2022",
      theme: "Kebangsaan",
      content: "Ratusan tahun tangisan ibu pertiwi\nTerinjak injak penindas negeri\nAlamnya digerogoti\nRakyatnya ditembak mati\n\nNamun pahlawan tak bergaji\nSemangat juang tak pernah henti\nSenjata bambu runcing dan nyali\nMenukar darah dengan hak asasi\nAllaahuakbarr.. Merdeka atau mati\n\nHingga maklumat proklamasi\nYang terbaca lantang dibawah merah putih\nPertanda merdeka telah kembali\nSeakan penderitaan itu berakhir disini\n\nOh pahlawan negeri\nTak ada kata selain terimakasih\nPerjuanganmu sangat berarti\nMaafkan kami generasi yang haha hihi\nWalau tak pernah rasakan peperangan yang amat ngeri\nSetidaknya kami berjanji\nWujudkan cita-cita bangsa yang hakiki\nMengisi hadiah kemerdekaan ini\nDengan senjata pena pendidikan yang sakti"
    },
    {
      id: "kawan-lama",
      title: "Kawan Lama",
      date: "31/7/2022",
      theme: "Persahabatan",
      content: "Sebuah pena sasak disakunya\nDitemani buku catatan kecil\nHingga selarut ini\nIa masih terjaga\nMenanti, dan terus menanti\n\nMerenung, termenung,\ndan bermurung disudut ruang\nDihabisi waktu tanpa warna\nMemejamkan mata\nuntuk lenyapkan hampa\nMemaksa hati serak berteriak\n\"don't cry.. don't cry.. \"\n\nTak mungkin ia beranjak\nSebab memang disanalah\ntempat mereka berbagi suka duka\nWalaupun kenyataanya..\nkini...\nAdakah cara melewati kesepian?\n\nOoh kawan...\nTak ada lagi dongeng\nataupun lawakan receh\nTak ada lagi secangkir kopi\nyang towaf dimulut-mulut slengekan\nsembari bercerita melewati waktu\n\nOh kawan...\nJika si waktu enggan berputar kembali\nBiarkan sempat yang akan menghampiri\nKarenanya mungkin,\nIa takkan lagi terpenjara\ndi jeruji kesepian"
    },
    {
      id: "puisi-singkat-cerita-lama",
      title: "Puisi singkat untuk cerita yang lama",
      date: "12/2/2022",
      theme: "Rindu & Komitmen",
      content: "Aku bertaruh\nPada maha rasa yang terbangun megah disukma\nDalam sunyi, nestapa dan baitan puisi rindu\nOh jarak...\nIzinkan kubersua walau sekejap\nOh waktu...\nPersilahkanku bersenandung cinta\nwalau sekecap\nOh semesta...\nSempatkan lagi menatap parasnya tanpa maya\nPintaku\nDalam hati yang paling sirri\nKasih...\nBuatlah yakin untuk melangkah pasti\nBerikan komitmen untuk terus menetap\nAgar ragu itu terlebur doa dan harap\nTakperlu curiga yang menghasut hati teguh\nCukup tunggu...\nBiarlah dalam jauhku memeluk bayangmu,\nyang hangat tercipta dari baranya rindu."
    }
  ]
};
