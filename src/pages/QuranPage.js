import React, { useState, useEffect, useRef } from "react";
import { SURAHS } from "../data/islamicData";
import { showToast } from "../components/Toast";

export default function QuranPage() {
  const [surahNum, setSurahNum] = useState("");
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("arabic");

  const [reciters, setReciters] = useState([]);
  const [reciter, setReciter] = useState(null);

  const [audioSrc, setAudioSrc] = useState("");
  const [surahData, setSurahData] = useState(null);

  const audioRef = useRef(null);

  // 🔥 تحميل القرّاء من API
  useEffect(() => {
    fetch("https://mp3quran.net/api/v3/reciters")
      .then((res) => res.json())
      .then((data) => {
        setReciters(data.reciters);
      })
      .catch(() => {
        showToast("❌ فشل تحميل القرّاء");
      });
  }, []);

  // 🔥 تحميل السورة
  const loadSurah = async (num) => {
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

        if (reciter) {
          const server = reciter.moshaf[0].server;
          const url =
            server + String(num).padStart(3, "0") + ".mp3";
          setAudioSrc(url);
        }
      } else {
        throw new Error();
      }
    } catch {
      setError("تعذّر تحميل السورة. تحقق من الإنترنت.");
    }

    setLoading(false);
  };

  // 🔥 تشغيل الصوت تلقائي
  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();

      audioRef.current.play().catch(() => {
        showToast("اضغط تشغيل الصوت ▶️");
      });
    }
  }, [audioSrc]);

  // 🔥 اختيار سورة
  const handleSurahChange = (e) => {
    const value = e.target.value;
    setSurahNum(value);
    loadSurah(value);
  };

  // 🔥 اختيار قارئ
  const handleReciterChange = (e) => {
    const selected = reciters.find(
      (r) => r.id === parseInt(e.target.value)
    );

    setReciter(selected);

    if (surahNum && selected) {
      const server = selected.moshaf[0].server;
      const url =
        server + String(surahNum).padStart(3, "0") + ".mp3";
      setAudioSrc(url);
    }
  };

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bas">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <h1 className="hero-title">القرآن الكريم</h1>
        <p className="hero-sub">كلام الله المنزّل على سيدنا محمد ﷺ</p>
      </div>

      <div className="quran-controls">
        {/* السورة */}
        <div className="ctrl-group">
          <label>اختر السورة</label>
          <select value={surahNum} onChange={handleSurahChange}>
            <option value="">— اختر سورة —</option>
            {SURAHS.map((s) => (
              <option key={s.n} value={s.n}>
                {s.n}. سورة {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* العرض */}
        <div className="ctrl-group">
          <label>طريقة العرض</label>
          <div className="view-toggle">
            <button
              className={`vt-btn${view === "arabic" ? " active" : ""}`}
              onClick={() => setView("arabic")}
            >
              عربي
            </button>
          </div>
        </div>

        {/* القارئ */}
        <div className="ctrl-group">
          <label>القارئ</label>
          <select onChange={handleReciterChange}>
            <option>اختر قارئ</option>
            {reciters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* معلومات السورة */}
      {surahData && (
        <div className="surah-info-bar">
          <span>سورة {surahData.name}</span>
          <span>{surahData.v} آية</span>
        </div>
      )}

      {/* الصوت */}
      {audioSrc && (
        <div className="audio-bar">
          <audio ref={audioRef} controls />
        </div>
      )}

      {/* المحتوى */}
      <div className="page-body">
        {loading && <p>جاري التحميل...</p>}
        {error && <p>{error}</p>}

        {verses.map((v) => (
          <div key={v.number} className="verse-card">
            <div>{v.numberInSurah}</div>

            {view === "arabic" && <div>{v.text}</div>}

            <button
              onClick={() => {
                navigator.clipboard?.writeText(v.text);
                showToast("تم النسخ");
              }}
            >
              نسخ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
