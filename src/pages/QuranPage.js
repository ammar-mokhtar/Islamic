import React, { useState, useCallback } from "react";
import { SURAHS, RECITERS } from "../data/islamicData";
import { showToast } from "../components/Toast";

export default function QuranPage() {
  const [surahNum, setSurahNum] = useState("");
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("arabic");
  const [reciter, setReciter] = useState("alafasy");
  const [audioSrc, setAudioSrc] = useState("");
  const [surahData, setSurahData] = useState(null);

  const loadSurah = useCallback(
    async (num) => {
      if (!num) return;
      setLoading(true);
      setError("");
      setVerses([]);
      const info = SURAHS.find((s) => s.n === parseInt(num));
      setSurahData(info);
      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/surah/${num}/ar.alquran`
        );
        const data = await res.json();
        if (data.code === 200) {
          setVerses(data.data.ayahs);
          setAudioSrc(
            `https://cdn.islamic.network/quran/audio-surah/128/${reciter}/${num}.mp3`
          );
        } else throw new Error();
      } catch {
        setError("تعذّر تحميل السورة. تحقق من الاتصال بالإنترنت.");
      }
      setLoading(false);
    },
    [reciter]
  );

  const handleSurahChange = (e) => {
    setSurahNum(e.target.value);
    loadSurah(e.target.value);
  };

  const handleReciterChange = (e) => {
    setReciter(e.target.value);
    if (surahNum) {
      setAudioSrc(
        `https://cdn.islamic.network/quran/audio-surah/128/${e.target.value}/${surahNum}.mp3`
      );
    }
  };

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bas">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <h1 className="hero-title">القرآن الكريم</h1>
        <p className="hero-sub">كلام الله المنزّل على سيدنا محمد ﷺ</p>
        <div className="hero-orn">❁ ✦ ❁</div>
      </div>

      <div className="quran-controls">
        <div className="ctrl-group">
          <label>اختر السورة</label>
          <select value={surahNum} onChange={handleSurahChange}>
            <option value="">— اختر سورة —</option>
            {SURAHS.map((s) => (
              <option key={s.n} value={s.n}>
                {s.n}. سورة {s.name} ({s.v} آية)
              </option>
            ))}
          </select>
        </div>
        <div className="ctrl-group">
          <label>طريقة العرض</label>
          <div className="view-toggle">
            {[
              ["arabic", "عربي"],
              ["translation", "ترجمة"],
              ["both", "كلاهما"],
            ].map(([v, l]) => (
              <button
                key={v}
                className={`vt-btn${view === v ? " active" : ""}`}
                onClick={() => setView(v)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="ctrl-group">
          <label>القارئ</label>
          <select value={reciter} onChange={handleReciterChange}>
            {RECITERS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {surahData && (
        <div className="surah-info-bar">
          <span className="surah-name-big">سورة {surahData.name}</span>
          <span className="badge">{surahData.t}</span>
          <span className="badge">{surahData.v} آية</span>
        </div>
      )}

      {audioSrc && (
        <div className="audio-bar">
          <audio src={audioSrc} controls key={audioSrc} />
          <span style={{ color: "white", fontSize: 12 }}>
            {surahData?.name} — {RECITERS.find((r) => r.id === reciter)?.name}
          </span>
        </div>
      )}

      <div className="page-body">
        {loading && (
          <div className="loader-box">
            <div className="spinner" />
            <p>جاري تحميل الآيات...</p>
          </div>
        )}
        {error && <p className="error-msg">{error}</p>}
        {!loading && !error && verses.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: 64 }}>📖</div>
            <h3>اختر سورة لعرض الآيات</h3>
            <p>
              يمكنك الاختيار من القائمة أعلاه لعرض آيات أي سورة من سور القرآن
              الكريم الـ 114
            </p>
          </div>
        )}
        {verses.map((v, i) => (
          <div
            key={v.number}
            className="verse-card"
            style={{ animationDelay: `${Math.min(i * 0.04, 1)}s` }}
          >
            <div className="verse-num">{v.numberInSurah}</div>
            {(view === "arabic" || view === "both") && (
              <div className="verse-ar">{v.text}</div>
            )}
            <div className="verse-actions">
              <button
                className="small-btn"
                onClick={() => {
                  navigator.clipboard?.writeText(v.text);
                  showToast("📋 تم نسخ الآية");
                }}
              >
                📋 نسخ
              </button>
              <button
                className="small-btn"
                onClick={() => showToast("⭐ تم الحفظ في المفضلة")}
              >
                ⭐ حفظ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
