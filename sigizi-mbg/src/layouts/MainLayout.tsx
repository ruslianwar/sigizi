// File: src/layouts/MainLayout.tsx
import { useState } from "react";
import { ROLES } from "../utils/constants";

// Definisi data yang diterima (Props) dari App.tsx
interface Props {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
  user: any; // Menerima data user yang sedang login
  onLogout: () => void; // Menerima fungsi logout
}

export default function MainLayout({
  children,
  activePage,
  setActivePage,
  user,
  onLogout,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);

  // Fungsi pembuat inisial nama jika avatar tidak tersedia (Siti Rahayu -> SR)
  const getAvatar = (nama: string) => {
    if (!nama) return "?";
    return nama
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  // Cek apakah user yang login adalah admin (untuk menyembunyikan/menampilkan menu)
  //const isAdmin = user?.role === "admin";
  // Cek apakah user yang login adalah admin atau superadmin
  const isAdmin = user?.role === "superadmin" || user?.role === "admin";
  // Daftar Menu Navigasi
  const menus = [
    {
      section: "Utama",
      items: [{ id: "dashboard", icon: "📊", label: "Dashboard" }],
    },
    {
      section: "Gizi & Menu",
      items: [
        { id: "fnca", icon: "🔬", label: "FNCA Kalkulator" },
        { id: "cycle_menu", icon: "🥗", label: "Cycle Menu" },
        { id: "target_gizi", icon: "🎯", label: "Target & AKG" },
      ],
    },
    {
      section: "Operasional",
      items: [
        { id: "supplychain", icon: "🏪", label: "Supply Chain" },
        { id: "inventaris", icon: "📦", label: "Inventaris/Stok" },
        { id: "distribusi", icon: "🚚", label: "Distribusi" },
        { id: "qc", icon: "🧪", label: "QC & Organoleptik" },
      ],
    },
    {
      section: "Quality & Kesehatan",
      items: [{ id: "antropometri", icon: "📏", label: "Antropometri" }],
    },
    {
      section: "Data & Laporan",
      items: [
        { id: "sekolah", icon: "🏫", label: "Data Sekolah" },
        { id: "laporan", icon: "📈", label: "Laporan & Export" },
        // Menu Manajemen User hanya akan muncul jika yang login adalah admin
        ...(isAdmin
          ? [{ id: "users", icon: "👥", label: "Manajemen User" }]
          : []),
      ],
    },
  ];

  const sidebarWidth = collapsed ? 64 : 256;

  return (
    <div className="app">
      {/* Tombol Buka/Tutup Sidebar */}
      <button
        className="toggle-btn"
        style={{ left: collapsed ? 16 : sidebarWidth - 18 }}
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Buka Sidebar" : "Tutup Sidebar"}
      >
        {collapsed ? "›" : "‹"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? "col" : ""}`}>
        <div className="sb-logo">
          <div className="sb-logo-icon">🥗</div>
          <div style={{ overflow: "hidden" }}>
            <div className="sb-logo-text">SiGizi MBG</div>
            <div className="sb-logo-sub">Kab. Sleman Reg</div>
          </div>
        </div>

        {/* Bagian Profil User Dinamis */}
        <div className="sb-user">
          <div
            className="sb-av"
            style={{ background: user?.color || "#40916c" }}
          >
            {user?.avatar || getAvatar(user?.nama)}
          </div>
          <div className="sb-user-info">
            <div className="sb-user-name">
              {(user?.nama || "Pengguna").split(",")[0]}
            </div>
            <div className="sb-user-role">
              {ROLES[user?.role]?.label || "User"}
            </div>
          </div>
        </div>

        <nav className="sb-nav">
          {menus.map((sec, si) => (
            <div key={si}>
              <div className="sb-section">{sec.section}</div>
              {sec.items.map((m) => (
                <div
                  key={m.id}
                  className={`sb-item ${activePage === m.id ? "active" : ""}`}
                  onClick={() => setActivePage(m.id)}
                  title={collapsed ? m.label : ""}
                >
                  <span className="sb-item-icon">{m.icon}</span>
                  <span className="sb-item-label">{m.label}</span>
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Tombol Logout */}
        <div
          className="sb-bottom"
          style={{
            padding: "12px",
            borderTop: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <button
            className="sb-logout"
            onClick={onLogout}
            title={collapsed ? "Keluar" : ""}
          >
            <span>⬅</span>
            <span className="sb-logout-t">Keluar</span>
          </button>
        </div>
      </div>

      {/* Area Konten Utama */}
      <main className="main" style={{ marginLeft: sidebarWidth }}>
        {children}
      </main>
    </div>
  );
}
