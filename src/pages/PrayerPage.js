import React, { useState } from "react";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { showToast } from "../components/Toast";

const PRAYERS = [
  { key: "Fajr", ar: "الفجر", en: "Fajr", icon: "🌅" },
  { key: "Sunrise", ar: "الشروق", en: "Sunrise", icon: "☀️" },
  { key: "Dhuhr", ar: "الظهر", en: "Dhuhr", icon: "🌞" },
  { key: "Asr", ar: "العصر", en: "Asr", icon: "🌤️" },
  { key: "Maghrib", ar: "المغرب", en: "Maghrib", icon: "🌇" },
  { key: "Isha", ar: "العشاء", en: "Isha", icon: "🌃" },
];

export default function PrayerPage() {
  const {
    times,
    location,
    loading,
    nextPrayer,
    currentPrayer,
    hijriStr,
    gregStr,
  } = usePrayerTimes();

  const [adhanEnabled, setAdhanEnabled] = useState({});
  const [adhanVoice, setAdhanVoice] = useState("makkah");

  const toggleAdhan = (key) => {
    setAdhanEnabled((prev) => {
      const newVal = !prev[key];
      const name = PRAYERS.find((p) => p.key === key)?.ar;
      showToast(newVal ? `✅ أذان ${name} مفعّل` : `❌ تم إيقاف الأذان`);
      return { ...prev, [key]: newVal };
    });
  };

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bas">الصَّلَاةُ عِمَادُ الدِّين</div>
        <h1 className="hero-title">أوقات الصلاة</h1>
        <p className="hero-sub">{location}</p>
        <div className="hero-live">
          <span className="hero-live-greg">{gregStr}</span>
          <span className="hero-live-sep">·</span>
          <span className="hero-live-hijri">{hijriStr}</span>
        </div>
      </div>

      <div className="date-bar">
        <span className="date-bar-greg">{gregStr}</span>
        <span className="date-bar-hijri">{hijriStr}</span>
      </div>

      {loading ? (
        <div className="loader-box" style={{ padding: 48 }}>
          <div className="spinner" />
          <p>جاري تحديد موقعك وتحميل أوقات الصلاة...</p>
        </div>
      ) : (
        <>
          <div className="prayers-grid">
            {PRAYERS.map((p, i) => (
              <div
                key={p.key}
                className={`prayer-card${
                  currentPrayer === p.key ? " now" : ""
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="pc-ar">{p.ar}</div>
                <div className="pc-en">{p.en}</div>
                <div className="pc-icon">{p.icon}</div>
                <div className="pc-time">{times?.[p.key] || "--:--"}</div>
                {p.key !== "Sunrise" ? (
                  <button
                    className={`adhan-btn${adhanEnabled[p.key] ? " on" : ""}`}
                    onClick={() => toggleAdhan(p.key)}
                  >
                    {adhanEnabled[p.key] ? "🔔 مفعّل" : "🔔 أذان"}
                  </button>
                ) : (
                  <span style={{ fontSize: 10, color: "var(--t3)" }}>—</span>
                )}
              </div>
            ))}
          </div>

          <div className="next-prayer-box">
            <div>
              <div className="npb-label">الصلاة القادمة</div>
              <div className="npb-name">{nextPrayer.name}</div>
            </div>
            <div className="npb-count">{nextPrayer.countdown}</div>
          </div>

          <div className="page-body">
            <div className="card" style={{ padding: 20 }}>
              <h4
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 14,
                  color: "var(--t1)",
                }}
              >
                ⚙️ إعدادات الأذان
              </h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <label
                  style={{ fontSize: 13, color: "var(--t2)", fontWeight: 600 }}
                >
                  صوت الأذان:
                </label>
                <select
                  value={adhanVoice}
                  onChange={(e) => {
                    setAdhanVoice(e.target.value);
                    showToast(
                      `✅ تم اختيار: ${e.target.selectedOptions[0].text}`
                    );
                  }}
                  style={{
                    flex: 1,
                    minWidth: 180,
                    padding: "9px 12px",
                    border: "1px solid var(--bdr)",
                    borderRadius: 8,
                    background: "var(--bg)",
                    color: "var(--t1)",
                    fontSize: 13,
                  }}
                >
                  <option value="makkah">أذان مكة المكرمة</option>
                  <option value="madinah">أذان المدينة المنورة</option>
                  <option value="egypt">الأذان المصري</option>
                  <option value="turkey">الأذان التركي</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
