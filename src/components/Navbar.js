import React, { useState } from "react";
import { useIslamicTime } from "../hooks/useIslamicTime";

const NAV = [
  {
    group: "القرآن الكريم",
    items: [
      { id: "quran", icon: "📖", label: "القرآن الكريم" },
      { id: "tafsir", icon: "📚", label: "تفسير القرآن" },
      { id: "translation", icon: "🌐", label: "ترجمة القرآن" },
      { id: "quran-search", icon: "🔎", label: "البحث في القرآن" },
    ],
  },
  {
    group: "الصلاة والعبادة",
    items: [
      { id: "prayer", icon: "🕌", label: "أوقات الصلاة" },
      { id: "qibla", icon: "🧭", label: "اتجاه القبلة" },
      { id: "adhkar", icon: "📿", label: "الأذكار" },
      { id: "tasbih", icon: "✨", label: "المسبحة الإلكترونية" },
    ],
  },
  {
    group: "الحديث النبوي",
    items: [
      { id: "bukhari", icon: "📜", label: "صحيح البخاري" },
      { id: "muslim", icon: "📜", label: "صحيح مسلم" },
      { id: "hadith-search", icon: "🔍", label: "البحث في الأحاديث" },
    ],
  },
  {
    group: "العلم والفقه",
    items: [
      { id: "fatwas", icon: "⚖️", label: "الفتاوى الإسلامية" },
      { id: "qa", icon: "❓", label: "سؤال وجواب" },
      { id: "aqeeda", icon: "🕋", label: "تعلم العقيدة" },
      { id: "fiqh", icon: "📋", label: "تعلم الفقه" },
    ],
  },
  {
    group: "السيرة والتاريخ",
    items: [
      { id: "seerah", icon: "🌙", label: "السيرة النبوية" },
      { id: "prophets", icon: "⭐", label: "قصص الأنبياء" },
      { id: "calendar", icon: "📅", label: "التقويم الهجري" },
      { id: "occasions", icon: "🎉", label: "المناسبات الإسلامية" },
    ],
  },
  {
    group: "المجتمع",
    items: [
      { id: "articles", icon: "✍️", label: "مقالات إسلامية" },
      { id: "forum", icon: "💬", label: "المنتدى" },
      { id: "duas", icon: "🤲", label: "مشاركة الأدعية" },
      { id: "favorites", icon: "❤️", label: "المفضلة" },
    ],
  },
  {
    group: "الخدمات",
    items: [
      { id: "dariftaa", icon: "🏛️", label: "دار الإفتاء المصرية" },
      { id: "donations", icon: "💝", label: "التبرعات الخيرية" },
      { id: "ai", icon: "🤖", label: "المساعد الإسلامي AI" },
    ],
  },
];

const COLORS = [
  { name: "green", bg: "#1a6b3a", label: "أخضر" },
  { name: "gold", bg: "#8b6914", label: "ذهبي" },
  { name: "blue", bg: "#1a4a8b", label: "أزرق" },
  { name: "teal", bg: "#0d6b6b", label: "فيروزي" },
  { name: "burgundy", bg: "#7a1a2a", label: "عنابي" },
];

export default function Navbar({
  currentPage,
  onNavigate,
  darkMode,
  themeColor,
  onToggleDark,
  onSetColor,
  notifCount,
  onToggleNotif,
}) {
  const { timeStr, gregStr, hijriStr, isRamadan } = useIslamicTime();
  const [mobileOpen, setMobileOpen] = useState(false);

  function nav(id) {
    onNavigate(id);
    setMobileOpen(false);
  }

  return (
    <>
      {/* ── TOPBAR ── */}
      <header className="topbar">
        <div className="topbar-start">
          <button
            className="menu-btn"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="القائمة"
          >
            <span />
            <span />
            <span />
          </button>
          <div className="brand-mini" onClick={() => nav("quran")}>
            <span className="brand-icon">☪</span>
            <div>
              <span className="brand-name">إسلامي</span>
              <span className="brand-sub">ISLAMIC</span>
            </div>
          </div>
        </div>

        <div className="topbar-center">
          <div className="live-date-row">
            <span className="live-greg">{gregStr}</span>
            <span className="live-sep">·</span>
            <span className="live-hijri">{hijriStr}</span>
            {isRamadan && <span className="ramadan-badge">🌙 رمضان مبارك</span>}
          </div>
          <div className="live-clock">{timeStr}</div>
        </div>

        <div className="topbar-end">
          <button
            className="icon-btn notif-wrap"
            onClick={onToggleNotif}
            title="الإشعارات"
          >
            🔔
            {notifCount > 0 && (
              <span className="notif-badge">{notifCount}</span>
            )}
          </button>
          <button
            className="icon-btn"
            onClick={() => nav("favorites")}
            title="المفضلة"
          >
            ⭐
          </button>
          <div className="color-dots">
            {COLORS.map((c) => (
              <button
                key={c.name}
                className={`cdot${themeColor === c.name ? " active" : ""}`}
                style={{ background: c.bg }}
                title={c.label}
                onClick={() => onSetColor(c.name)}
              />
            ))}
          </div>
          <button
            className="theme-btn"
            onClick={onToggleDark}
            title={darkMode ? "وضع النهار" : "وضع الليل"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* ── SIDEBAR ── */}
      <nav className={`sidebar${mobileOpen ? " open" : ""}`}>
        <div className="sb-head">
          <div className="sb-logo">
            <div className="sb-logo-icon">☪</div>
            <div>
              <span className="sb-logo-name">إسلامي</span>
              <span className="sb-logo-sub">ISLAMIC PLATFORM</span>
            </div>
          </div>
          <button className="sb-close" onClick={() => setMobileOpen(false)}>
            ✕
          </button>
        </div>

        {/* Live Date in Sidebar */}
        <div className="sb-date">
          <div className="sb-greg">{gregStr}</div>
          <div className="sb-hijri">{hijriStr}</div>
          <div className="sb-clock">{timeStr}</div>
        </div>

        <div className="nav-scroll">
          {NAV.map((group) => (
            <div key={group.group} className="nav-group">
              <span className="nav-group-label">{group.group}</span>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={`nav-btn${
                    currentPage === item.id ? " active" : ""
                  }`}
                  onClick={() => nav(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </nav>

      {mobileOpen && (
        <div className="nav-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
