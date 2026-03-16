import React from "react";
import { useIslamicTime } from "../hooks/useIslamicTime";

const QUICK_LINKS = [
  { id: "quran", label: "القرآن الكريم" },
  { id: "prayer", label: "أوقات الصلاة" },
  { id: "adhkar", label: "الأذكار" },
  { id: "tasbih", label: "المسبحة" },
  { id: "bukhari", label: "صحيح البخاري" },
  { id: "seerah", label: "السيرة النبوية" },
  { id: "dariftaa", label: "دار الإفتاء" },
  { id: "donations", label: "التبرعات" },
  { id: "ai", label: "المساعد AI" },
  { id: "calendar", label: "التقويم الهجري" },
];

export default function Footer({ onNavigate }) {
  const { timeStr, gregStr, hijriStr, year } = useIslamicTime();

  return (
    <footer className="app-footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <div className="footer-logo-row">
            <span className="footer-logo-icon">☪</span>
            <div>
              <span className="footer-logo-name">إسلامي</span>
              <span className="footer-logo-sub">ISLAMIC PLATFORM</span>
            </div>
          </div>
          <p className="footer-desc">
            منصتك الإسلامية الشاملة للقرآن الكريم والسنة النبوية والعلوم
            الإسلامية. بُنيت بحب لخدمة الأمة الإسلامية.
          </p>
          <div className="footer-basmala">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        </div>

        <div className="footer-links-col">
          <div className="footer-col-title">روابط سريعة</div>
          <div className="footer-links-grid">
            {QUICK_LINKS.map((l) => (
              <button
                key={l.id}
                className="footer-nav-link"
                onClick={() => onNavigate(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="footer-live-col">
          <div className="footer-col-title">الوقت الحالي</div>
          <div className="footer-clock">{timeStr}</div>
          <div className="footer-live-greg">{gregStr}</div>
          <div className="footer-live-hijri">{hijriStr}</div>
          <div className="footer-hadith-box">
            <div className="footer-hadith-text">
              «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ»
            </div>
            <span className="footer-hadith-ref">رواه البخاري — رقم 1</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} منصة إسلامي — جميع الحقوق محفوظة</span>
        <span className="footer-dev">
          تم العمل والتطوير من قبل{" "}
          <span className="footer-dev-name">عمار مختار | Ammar Mokhtar</span> ❤️
        </span>
      </div>
    </footer>
  );
}
