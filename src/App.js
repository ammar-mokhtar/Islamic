import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import QuranPage from "./pages/QuranPage";
import PrayerPage from "./pages/PrayerPage";
import FatwasPage from "./pages/FatwasPage";
import AqeedaPage from "./pages/AqeedaPage";
import SeerahPage from "./pages/SeerahPage";
import ArticlesPage from "./pages/ArticlesPage";
import DarIftaaPage from "./pages/DarIftaaPage";
import DonationsPage from "./pages/DonationsPage";
import {
  TafsirPage,
  TranslationPage,
  QuranSearchPage,
  AdhkarPage,
  TasbihPage,
  BukhariPage,
  MuslimPage,
  HadithSearchPage,
  QAPage,
  FiqhPage,
  ProphetsPage,
  QiblaPage,
  CalendarPage,
  OccasionsPage,
  ForumPage,
  DuasPage,
  FavoritesPage,
  AIPage,
} from "./pages/AllOtherPages";

const THEME_VARS = {
  green: { g1: "#1a6b3a", g2: "#0f4022", g3: "#2a8a4e" },
  gold: { g1: "#8b6914", g2: "#5c450d", g3: "#b8860b" },
  blue: { g1: "#1a4a8b", g2: "#0f2d5c", g3: "#2a5fb8" },
  teal: { g1: "#0d6b6b", g2: "#074545", g3: "#168888" },
  burgundy: { g1: "#7a1a2a", g2: "#4a0f1a", g3: "#a02238" },
};

export default function App() {
  const [page, setPage] = useState("quran");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("dark") === "true"
  );
  const [themeColor, setThemeColor] = useState(
    () => localStorage.getItem("theme") || "green"
  );
  const [notifOpen, setNotifOpen] = useState(false);
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  useEffect(() => {
    const vars = THEME_VARS[themeColor] || THEME_VARS.green;
    const root = document.documentElement;
    root.style.setProperty("--g1", vars.g1);
    root.style.setProperty("--g2", vars.g2);
    root.style.setProperty("--g3", vars.g3);
    localStorage.setItem("theme", themeColor);
  }, [themeColor]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const navigate = (id) => {
    setPage(id);
    setNotifOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeFav = (idx) => {
    setFavorites((f) => f.filter((_, i) => i !== idx));
  };

  function renderPage() {
    switch (page) {
      case "quran":
        return <QuranPage />;
      case "tafsir":
        return <TafsirPage />;
      case "translation":
        return <TranslationPage />;
      case "quran-search":
        return <QuranSearchPage />;
      case "prayer":
        return <PrayerPage />;
      case "qibla":
        return <QiblaPage />;
      case "adhkar":
        return <AdhkarPage />;
      case "tasbih":
        return <TasbihPage />;
      case "bukhari":
        return <BukhariPage />;
      case "muslim":
        return <MuslimPage />;
      case "hadith-search":
        return <HadithSearchPage />;
      case "fatwas":
        return <FatwasPage />;
      case "qa":
        return <QAPage />;
      case "aqeeda":
        return <AqeedaPage />;
      case "fiqh":
        return <FiqhPage />;
      case "seerah":
        return <SeerahPage />;
      case "prophets":
        return <ProphetsPage />;
      case "calendar":
        return <CalendarPage />;
      case "occasions":
        return <OccasionsPage />;
      case "articles":
        return <ArticlesPage />;
      case "forum":
        return <ForumPage />;
      case "duas":
        return <DuasPage />;
      case "favorites":
        return <FavoritesPage favorites={favorites} onRemove={removeFav} />;
      case "dariftaa":
        return <DarIftaaPage />;
      case "donations":
        return <DonationsPage />;
      case "ai":
        return <AIPage />;
      default:
        return <QuranPage />;
    }
  }

  return (
    <div className="app-root">
      <Navbar
        currentPage={page}
        onNavigate={navigate}
        darkMode={darkMode}
        themeColor={themeColor}
        onToggleDark={() => setDarkMode((d) => !d)}
        onSetColor={setThemeColor}
        notifCount={3}
        onToggleNotif={() => setNotifOpen((o) => !o)}
      />

      {notifOpen && (
        <div className="notif-panel open">
          <div className="notif-header">
            <h3>الإشعارات</h3>
            <button onClick={() => setNotifOpen(false)}>✕</button>
          </div>
          {[
            {
              i: "🕌",
              t: "وقت صلاة العصر",
              p: "حان الآن وقت صلاة العصر",
              time: "منذ 5 دقائق",
              unread: true,
            },
            {
              i: "📖",
              t: "ورد القرآن اليومي",
              p: "لم تقرأ وردك اليومي بعد",
              time: "منذ ساعة",
              unread: true,
            },
            {
              i: "🌙",
              t: "أذكار المساء",
              p: "تذكر أذكار المساء",
              time: "اليوم",
              unread: false,
            },
          ].map((n, i) => (
            <div key={i} className={`notif-item${n.unread ? " unread" : ""}`}>
              <span className="notif-icon">{n.i}</span>
              <div>
                <strong>{n.t}</strong>
                <p>{n.p}</p>
                <span className="notif-time">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="main-content">
        {renderPage()}
        <Footer onNavigate={navigate} />
      </div>

      <Toast />
    </div>
  );
}
