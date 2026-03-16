import React, { useState, useRef, useEffect } from "react";
import {
  SURAHS,
  ADHKAR,
  PROPHETS,
  OCCASIONS,
  DEFAULT_FORUM_POSTS,
  DEFAULT_DUAS,
} from "../data/islamicData";
import { dateToHijri, HIJRI_MONTHS } from "../hooks/useIslamicTime";
import { showToast } from "../components/Toast";

// ══════════════════════════════════════════
//  SHARED HERO
// ══════════════════════════════════════════
function Hero({ title, sub, bas }) {
  return (
    <div className="hero">
      {bas && <div className="hero-bas">{bas}</div>}
      <h1 className="hero-title">{title}</h1>
      {sub && <p className="hero-sub">{sub}</p>}
    </div>
  );
}

// ══════════════════════════════════════════
//  LOCAL HADITH DATA
// ══════════════════════════════════════════
const HADITHS_BUK = [
  {
    a: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    e: "Actions are judged by intentions, and every person will have what they intended.",
    r: "عمر بن الخطاب ؓ",
    n: 1,
  },
  {
    a: "الدِّينُ النَّصِيحَةُ",
    e: "Religion is sincerity and well-wishing.",
    r: "تميم الداري ؓ",
    n: 55,
  },
  {
    a: "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
    e: "Whoever Allah intends good for, He gives him understanding of the religion.",
    r: "معاوية ؓ",
    n: 71,
  },
  {
    a: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    e: "The best of you are those who learn the Quran and teach it.",
    r: "عثمان بن عفان ؓ",
    n: 5027,
  },
  {
    a: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    e: "A Muslim is one from whose tongue and hands Muslims are safe.",
    r: "عبدالله بن عمرو ؓ",
    n: 10,
  },
  {
    a: "لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    e: "None of you believes until he loves for his brother what he loves for himself.",
    r: "أنس بن مالك ؓ",
    n: 13,
  },
  {
    a: "إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ فِي الأَمْرِ كُلِّهِ",
    e: "Allah is gentle and loves gentleness in all things.",
    r: "عائشة ؓ",
    n: 6927,
  },
  {
    a: "بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الأَخْلَاقِ",
    e: "I was sent to perfect good character.",
    r: "أبو هريرة ؓ",
    n: 273,
  },
];

const HADITHS_MUS = [
  {
    a: "بُنِيَ الإِسْلامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لا إِلَهَ إِلا اللَّهُ وَأَنَّ مُحَمَّداً رَسُولُ اللَّهِ",
    e: "Islam is built on five pillars: the testimony that there is no deity worthy of worship except Allah and that Muhammad is His Messenger, establishing the prayer, paying the zakat, making the pilgrimage, and fasting Ramadan.",
    r: "ابن عمر ؓ",
    n: 16,
  },
  {
    a: "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا",
    e: "The most complete of the believers in faith is the one with the best character.",
    r: "أبو هريرة ؓ",
    n: 934,
  },
  {
    a: "لا تَدْخُلُوا الْجَنَّةَ حَتَّى تُؤْمِنُوا وَلا تُؤْمِنُوا حَتَّى تَحَابُّوا",
    e: "You will not enter Paradise until you believe, and you will not believe until you love one another.",
    r: "أبو هريرة ؓ",
    n: 54,
  },
  {
    a: "مَنْ صَلَّى عَلَيَّ وَاحِدَةً صَلَّى اللَّهُ عَلَيْهِ عَشْرًا",
    e: "Whoever sends one blessing upon me, Allah sends ten blessings upon him.",
    r: "أبو هريرة ؓ",
    n: 408,
  },
  {
    a: "الطَّهُورُ شَطْرُ الإِيمَانِ",
    e: "Cleanliness is half of faith.",
    r: "أبو مالك الأشعري ؓ",
    n: 223,
  },
  {
    a: "كُلُّ مَعْرُوفٍ صَدَقَةٌ",
    e: "Every act of kindness is charity.",
    r: "جابر بن عبدالله ؓ",
    n: 1005,
  },
];

// ══════════════════════════════════════════
//  QA DATA
// ══════════════════════════════════════════
const QA_DATA = [
  {
    q: "ما أركان الإسلام الخمسة؟",
    a: "أركان الإسلام: 1) شهادة أن لا إله إلا الله وأن محمداً رسول الله. 2) إقام الصلاة. 3) إيتاء الزكاة. 4) صوم رمضان. 5) حج البيت لمن استطاع. رواه البخاري ومسلم عن ابن عمر رضي الله عنهما.",
  },
  {
    q: "ما أركان الإيمان الستة؟",
    a: "أركان الإيمان: الإيمان بالله، وبالملائكة الكرام، وبالكتب السماوية المنزّلة، وبالرسل الكرام، وباليوم الآخر، وبالقدر خيره وشره. جاءت في حديث جبريل المشهور رواه مسلم.",
  },
  {
    q: "كم عدد سور القرآن الكريم وآياته؟",
    a: "القرآن الكريم يتكون من 114 سورة و6236 آية. مقسّم إلى 30 جزءاً و60 حزباً. نزل على النبي ﷺ على مدى 23 سنة تقريباً.",
  },
  {
    q: "ما الفرق بين الإسلام والإيمان والإحسان؟",
    a: "الإسلام: الاستسلام لله بالتوحيد والانقياد. الإيمان: التصديق القلبي والإقرار اللساني والعمل. الإحسان: أن تعبد الله كأنك تراه، فإن لم تكن تراه فإنه يراك. هذه مراتب الدين الثلاث من حديث جبريل.",
  },
  {
    q: "ما شروط صحة الصلاة؟",
    a: "شروط صحة الصلاة: الإسلام، التمييز، الطهارة من الحدثين، ستر العورة، استقبال القبلة، دخول الوقت، النية. وهي شروط يجب توافرها لصحة الصلاة.",
  },
  {
    q: "ما نصاب الزكاة في النقود؟",
    a: "نصاب الزكاة في النقود يساوي 85 غراماً من الذهب الخالص أو 595 غراماً من الفضة الخالصة. ونسبة الزكاة 2.5% من إجمالي المبلغ بعد حولان الحول الهجري.",
  },
];

// ══════════════════════════════════════════
//  FIQH DATA
// ══════════════════════════════════════════
const FIQH_DATA = [
  {
    q: "فقه الطهارة — الوضوء والغسل",
    icon: "💧",
    a: "الطهارة شرط لصحة الصلاة. فروض الوضوء: النية، غسل الوجه، غسل اليدين إلى المرفقين، مسح الرأس، غسل الرجلين إلى الكعبين، الترتيب، الموالاة. نواقض الوضوء: البول والغائط والريح وزوال العقل والنوم الثقيل.",
  },
  {
    q: "فقه الصلاة — الأركان والشروط",
    icon: "🕌",
    a: "الصلوات الخمس: الفجر ركعتان، الظهر أربع، العصر أربع، المغرب ثلاث، العشاء أربع. أركانها: تكبيرة الإحرام، القيام، قراءة الفاتحة، الركوع، الرفع منه، السجود، الجلوس بين السجدتين، التشهد الأخير، التسليم.",
  },
  {
    q: "فقه الزكاة — النصاب والمقدار",
    icon: "💰",
    a: "الزكاة ركن الإسلام الثالث. تجب في النقود عند بلوغ النصاب (85 غ ذهب) وحولان الحول. نسبتها 2.5%. وفي الزروع العشر أو نصف العشر. مصارفها ثمانية أصناف ذكرها الله في سورة التوبة الآية 60.",
  },
  {
    q: "فقه الصيام — شروطه ومفسداته",
    icon: "🌙",
    a: "الصيام: الإمساك عن الطعام والشراب والجماع من الفجر الصادق إلى غروب الشمس مع النية. مفسداته: الأكل والشرب والجماع عمداً، والتقيؤ عمداً. رخص الإفطار: السفر، المرض الشديد، الحمل والرضاعة مع القضاء.",
  },
  {
    q: "فقه الحج — الأركان والواجبات",
    icon: "🕋",
    a: "أركان الحج: الإحرام، الوقوف بعرفة (أعظم الأركان)، طواف الإفاضة، السعي بين الصفا والمروة. واجباته: الإحرام من الميقات، المبيت بمزدلفة، المبيت بمنى ليالي التشريق، رمي الجمرات، حلق الرأس أو تقصيره.",
  },
];

// ══════════════════════════════════════════
//  TAFSIR PAGE
// ══════════════════════════════════════════
export function TafsirPage() {
  const [num, setNum] = useState("");
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTafsir = async (n) => {
    if (!n) return;
    setNum(n);
    setLoading(true);
    setVerses([]);
    try {
      const [rAr, rTaf] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${n}/ar.alquran`),
        fetch(`https://api.alquran.cloud/v1/surah/${n}/ar.muyassar`),
      ]);
      const [dAr, dTaf] = await Promise.all([rAr.json(), rTaf.json()]);
      if (dAr.code === 200) {
        setVerses(
          dAr.data.ayahs.map((v, i) => ({
            ...v,
            taf: dTaf.data?.ayahs?.[i]?.text || "",
          }))
        );
      }
    } catch {
      showToast("تعذّر التحميل. تحقق من الاتصال.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <Hero title="تفسير القرآن الكريم" sub="التفسير الميسّر للآيات الكريمة" />
      <div className="quran-controls">
        <div className="ctrl-group" style={{ maxWidth: 400 }}>
          <label>اختر السورة</label>
          <select value={num} onChange={(e) => loadTafsir(e.target.value)}>
            <option value="">— اختر سورة —</option>
            {SURAHS.map((s) => (
              <option key={s.n} value={s.n}>
                {s.n}. سورة {s.name} ({s.v} آية)
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="page-body">
        {loading && (
          <div className="loader-box">
            <div className="spinner" />
            <p>جاري تحميل التفسير...</p>
          </div>
        )}
        {!loading && !verses.length && !num && (
          <div className="empty-state">
            <div style={{ fontSize: 64 }}>📚</div>
            <h3>اختر سورة لعرض التفسير</h3>
            <p>سيظهر لك النص العربي مع التفسير الميسّر لكل آية</p>
          </div>
        )}
        {verses.map((v) => (
          <div key={v.number} className="verse-card">
            <div className="verse-num">{v.numberInSurah}</div>
            <div className="verse-ar">{v.text}</div>
            {v.taf && (
              <div
                style={{
                  fontSize: 13,
                  color: "var(--t2)",
                  background: "var(--bg2)",
                  padding: 12,
                  borderRadius: 8,
                  borderRight: "4px solid var(--g1)",
                  lineHeight: 1.9,
                  marginTop: 10,
                }}
              >
                {v.taf}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  TRANSLATION PAGE
// ══════════════════════════════════════════
export function TranslationPage() {
  const [num, setNum] = useState("");
  const [lang, setLang] = useState("en.sahih");
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTranslation = async (n, l) => {
    if (!n || !l) return;
    setLoading(true);
    setVerses([]);
    try {
      const [rAr, rTr] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${n}/ar.alquran`),
        fetch(`https://api.alquran.cloud/v1/surah/${n}/${l}`),
      ]);
      const [dAr, dTr] = await Promise.all([rAr.json(), rTr.json()]);
      if (dAr.code === 200) {
        setVerses(
          dAr.data.ayahs.map((v, i) => ({
            ...v,
            tr: dTr.data?.ayahs?.[i]?.text || "",
          }))
        );
      }
    } catch {
      showToast("تعذّر التحميل. تحقق من الاتصال.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <Hero
        title="ترجمة القرآن الكريم"
        sub="ترجمات معاني القرآن الكريم بعدة لغات"
      />
      <div className="quran-controls">
        <div className="ctrl-group">
          <label>اختر السورة</label>
          <select
            value={num}
            onChange={(e) => {
              setNum(e.target.value);
              loadTranslation(e.target.value, lang);
            }}
          >
            <option value="">— اختر سورة —</option>
            {SURAHS.map((s) => (
              <option key={s.n} value={s.n}>
                {s.n}. {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ctrl-group">
          <label>اختر اللغة</label>
          <select
            value={lang}
            onChange={(e) => {
              setLang(e.target.value);
              loadTranslation(num, e.target.value);
            }}
          >
            <option value="en.sahih">الإنجليزية — Sahih International</option>
            <option value="fr.hamidullah">الفرنسية — Hamidullah</option>
            <option value="tr.diyanet">التركية — Diyanet</option>
            <option value="ur.jalandhry">الأردية — Jalandhry</option>
          </select>
        </div>
      </div>
      <div className="page-body">
        {loading && (
          <div className="loader-box">
            <div className="spinner" />
            <p>جاري تحميل الترجمة...</p>
          </div>
        )}
        {!loading && !verses.length && (
          <div className="empty-state">
            <div style={{ fontSize: 64 }}>🌐</div>
            <h3>اختر السورة واللغة</h3>
            <p>ستظهر الآيات العربية مع ترجمتها</p>
          </div>
        )}
        {verses.map((v) => (
          <div key={v.number} className="verse-card">
            <div className="verse-num">{v.numberInSurah}</div>
            <div className="verse-ar">{v.text}</div>
            <div className="verse-tr">{v.tr}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  QURAN SEARCH PAGE
// ══════════════════════════════════════════
export function QuranSearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = async () => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    setResults([]);
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/ar`
      );
      const data = await res.json();
      if (data.code === 200) setResults(data.data.matches || []);
    } catch {
      showToast("حدث خطأ في البحث. تحقق من الاتصال.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <Hero
        title="البحث في القرآن الكريم"
        sub="ابحث في آيات كتاب الله العزيز"
      />
      <div className="page-body">
        <div className="search-bar">
          <input
            className="search-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث في آيات القرآن الكريم..."
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
          />
          <button className="primary-btn" onClick={doSearch}>
            🔍 بحث
          </button>
        </div>
        {loading && (
          <div className="loader-box">
            <div className="spinner" />
          </div>
        )}
        {!loading && searched && results.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--t2)", padding: 32 }}>
            لم يُعثر على نتائج للبحث عن «{q}»
          </p>
        )}
        {!loading && results.length > 0 && (
          <p style={{ color: "var(--t2)", marginBottom: 14, fontSize: 13 }}>
            وُجد {results.length} نتيجة
          </p>
        )}
        {results.slice(0, 25).map((m, i) => (
          <div key={i} className="verse-card">
            <div
              style={{
                fontSize: 12,
                color: "var(--g1)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              سورة {m.surah?.name} — آية {m.numberInSurah}
            </div>
            <div className="verse-ar">{m.text}</div>
            <div className="verse-actions">
              <button
                className="small-btn"
                onClick={() => {
                  navigator.clipboard?.writeText(m.text);
                  showToast("📋 تم النسخ");
                }}
              >
                📋 نسخ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  ADHKAR PAGE
// ══════════════════════════════════════════
export function AdhkarPage() {
  const [tab, setTab] = useState("morning");

  const TABS = [
    { id: "morning", label: "☀️ أذكار الصباح" },
    { id: "evening", label: "🌙 أذكار المساء" },
    { id: "sleep", label: "😴 أذكار النوم" },
    { id: "afterprayer", label: "🕌 بعد الصلاة" },
  ];

  return (
    <div className="page">
      <Hero title="الأذكار" sub="حصن المسلم اليومي" />
      <div className="adhkar-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`atab${tab === t.id ? " active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="page-body">
        {(ADHKAR[tab] || []).map((d, i) => (
          <div
            key={i}
            className="dhikr-card"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="dhikr-ar">{d.text}</div>
            <div className="dhikr-tr">{d.tr}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span className="badge">🔢 {d.count}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  className="small-btn"
                  onClick={() => {
                    navigator.clipboard?.writeText(d.text);
                    showToast("📋 تم النسخ");
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
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  TASBIH PAGE
// ══════════════════════════════════════════
export function TasbihPage() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(33);
  const [daily, setDaily] = useState(0);
  const [text, setText] = useState("سُبْحَانَ اللَّه");

  const OPTS = [
    "سُبْحَانَ اللَّه",
    "الْحَمْدُ لِلَّه",
    "اللَّهُ أَكْبَر",
    "لَا إِلَهَ إِلَّا اللَّه",
  ];

  const circ = 2 * Math.PI * 70;
  const offset = circ - circ * (count / goal);

  const tap = () => {
    const nc = count >= goal ? 0 : count + 1;
    setCount(nc);
    setDaily((d) => d + 1);
    if (navigator.vibrate) navigator.vibrate(30);
    if (nc === goal) showToast(`🎉 أتممت ${goal} مرة! الله يقبل منك`);
  };

  return (
    <div className="page">
      <Hero title="المسبحة الإلكترونية" sub="سبّح بحمد ربك" />
      <div className="tasbih-wrap">
        <div className="tsb-opts">
          {OPTS.map((o) => (
            <button
              key={o}
              className={`tsb-opt${text === o ? " active" : ""}`}
              onClick={() => {
                setText(o);
                setCount(0);
              }}
            >
              {o}
            </button>
          ))}
        </div>
        <div className="ring-wrap">
          <svg
            viewBox="0 0 160 160"
            width="160"
            height="160"
            style={{
              position: "absolute",
              inset: 0,
              transform: "rotate(-90deg)",
            }}
          >
            <circle className="ring-bg" cx="80" cy="80" r="70" />
            <circle
              className="ring-fill"
              cx="80"
              cy="80"
              r="70"
              style={{
                strokeDasharray: circ,
                strokeDashoffset: offset,
                transition: "stroke-dashoffset .4s ease",
              }}
            />
          </svg>
          <div className="ring-inner">
            <div className="ring-text">{text}</div>
            <div className="ring-count">{count}</div>
            <div className="ring-goal">/ {goal}</div>
          </div>
        </div>
        <button className="tsb-btn" onClick={tap}>
          اضغط للتسبيح
        </button>
        <div className="tsb-controls">
          {[33, 100, 500, 1000].map((g) => (
            <button
              key={g}
              className="tsb-ctrl"
              onClick={() => {
                setGoal(g);
                setCount(0);
                showToast(`تم ضبط الهدف: ${g} مرة`);
              }}
            >
              {g}
            </button>
          ))}
          <button
            className="tsb-ctrl reset"
            onClick={() => {
              setCount(0);
              showToast("🔄 تم إعادة التعيين");
            }}
          >
            إعادة تعيين
          </button>
        </div>
        <p className="tsb-daily">
          إجمالي اليوم: <strong>{daily}</strong> تسبيحة
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  HADITH SHARED CARD
// ══════════════════════════════════════════
function HadithCard({ hadith, collection }) {
  return (
    <div className="hadith-card">
      <div className="hadith-ar">{hadith.a}</div>
      <div className="hadith-en">{hadith.e}</div>
      <div className="hadith-tags">
        <span className="badge">📖 {hadith.r}</span>
        <span className="badge">🔢 رقم {hadith.n}</span>
        <span className="badge">📚 {collection}</span>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button
          className="small-btn"
          onClick={() => {
            navigator.clipboard?.writeText(hadith.a);
            showToast("📋 تم نسخ الحديث");
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
  );
}

// ══════════════════════════════════════════
//  BUKHARI PAGE
// ══════════════════════════════════════════
export function BukhariPage() {
  const [idx, setIdx] = useState(0);

  return (
    <div className="page">
      <Hero title="صحيح البخاري" sub="أصح كتب الحديث النبوي الشريف" />
      <div className="page-body">
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <button
            className="primary-btn"
            onClick={() =>
              setIdx(Math.floor(Math.random() * HADITHS_BUK.length))
            }
          >
            🎲 حديث عشوائي
          </button>
        </div>
        <HadithCard hadith={HADITHS_BUK[idx]} collection="البخاري" />
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <button
            className="small-btn"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
          >
            ← السابق
          </button>
          <span
            style={{ fontSize: 12, color: "var(--t2)", padding: "5px 12px" }}
          >
            {idx + 1} / {HADITHS_BUK.length}
          </span>
          <button
            className="small-btn"
            onClick={() =>
              setIdx((i) => Math.min(HADITHS_BUK.length - 1, i + 1))
            }
          >
            التالي →
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  MUSLIM PAGE
// ══════════════════════════════════════════
export function MuslimPage() {
  const [idx, setIdx] = useState(0);

  return (
    <div className="page">
      <Hero title="صحيح مسلم" sub="ثاني أصح كتب الحديث النبوي الشريف" />
      <div className="page-body">
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <button
            className="primary-btn"
            onClick={() =>
              setIdx(Math.floor(Math.random() * HADITHS_MUS.length))
            }
          >
            🎲 حديث عشوائي
          </button>
        </div>
        <HadithCard hadith={HADITHS_MUS[idx]} collection="مسلم" />
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <button
            className="small-btn"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
          >
            ← السابق
          </button>
          <span
            style={{ fontSize: 12, color: "var(--t2)", padding: "5px 12px" }}
          >
            {idx + 1} / {HADITHS_MUS.length}
          </span>
          <button
            className="small-btn"
            onClick={() =>
              setIdx((i) => Math.min(HADITHS_MUS.length - 1, i + 1))
            }
          >
            التالي →
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  HADITH SEARCH PAGE
// ══════════════════════════════════════════
export function HadithSearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);

  const ALL = [
    ...HADITHS_BUK.map((h) => ({ ...h, col: "البخاري" })),
    ...HADITHS_MUS.map((h) => ({ ...h, col: "مسلم" })),
  ];

  const doSearch = () => {
    if (!q.trim()) return;
    setResults(
      ALL.filter(
        (h) =>
          h.a.includes(q) ||
          h.e.toLowerCase().includes(q.toLowerCase()) ||
          h.r.includes(q)
      )
    );
  };

  return (
    <div className="page">
      <Hero title="البحث في الأحاديث" sub="ابحث في كنوز السنة النبوية" />
      <div className="page-body">
        <div className="search-bar">
          <input
            className="search-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن حديث نبوي شريف..."
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
          />
          <button className="primary-btn" onClick={doSearch}>
            🔍 بحث
          </button>
        </div>
        {results.length > 0 && (
          <p style={{ color: "var(--t2)", marginBottom: 14, fontSize: 13 }}>
            وُجد {results.length} نتيجة
          </p>
        )}
        {results.map((h, i) => (
          <div key={i} className="hadith-card" style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 12,
                color: "var(--g1)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {h.col} — رقم {h.n} — الراوي: {h.r}
            </div>
            <div className="hadith-ar">{h.a}</div>
            <div className="hadith-en">{h.e}</div>
          </div>
        ))}
        {results.length === 0 && q && (
          <p style={{ textAlign: "center", color: "var(--t2)", padding: 32 }}>
            لم يُعثر على نتائج
          </p>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  QA PAGE
// ══════════════════════════════════════════
export function QAPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="page">
      <Hero title="سؤال وجواب" sub="أسئلة وأجوبة في الدين الإسلامي" />
      <div className="page-body">
        {QA_DATA.map((item, i) => (
          <div
            key={i}
            className="acc-card"
            style={{ marginBottom: 12, animationDelay: `${i * 0.07}s` }}
          >
            <div
              className="acc-q"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span style={{ fontWeight: 700, color: "var(--t1)" }}>
                {item.q}
              </span>
              <span
                className="acc-toggle"
                style={{ transform: open === i ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </div>
            {open === i && (
              <div
                style={{
                  padding: "8px 18px 18px",
                  fontSize: 13.5,
                  color: "var(--t2)",
                  lineHeight: 2,
                  fontFamily: "var(--font-ar)",
                }}
              >
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  FIQH PAGE
// ══════════════════════════════════════════
export function FiqhPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="page">
      <Hero title="تعلم الفقه" sub="فقه العبادات والمعاملات الإسلامية" />
      <div className="page-body">
        {FIQH_DATA.map((f, i) => (
          <div key={i} className="acc-card" style={{ marginBottom: 12 }}>
            <div
              className="acc-q"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{f.icon}</span>
                <span style={{ fontWeight: 700, color: "var(--t1)" }}>
                  {f.q}
                </span>
              </div>
              <span
                className="acc-toggle"
                style={{ transform: open === i ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </div>
            {open === i && (
              <div
                style={{
                  padding: "8px 18px 18px",
                  fontSize: 13.5,
                  color: "var(--t2)",
                  lineHeight: 2,
                  fontFamily: "var(--font-ar)",
                }}
              >
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  PROPHETS PAGE
// ══════════════════════════════════════════
export function ProphetsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="page">
      <Hero title="قصص الأنبياء" sub="قصص أنبياء الله ورسله عليهم السلام" />
      <div className="page-body">
        <div className="prophets-grid">
          {PROPHETS.map((p, i) => (
            <div
              key={i}
              className="prophet-btn"
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => setSelected(selected?.name === p.name ? null : p)}
            >
              <span className="pb-icon">{p.icon}</span>
              <span className="pb-name">{p.name}</span>
              <span style={{ fontSize: 10, color: "var(--t3)", marginTop: 2 }}>
                {p.title}
              </span>
            </div>
          ))}
        </div>
        {selected && (
          <div
            className="card"
            style={{ padding: 24, marginTop: 16, animation: "fadeUp .3s ease" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 36 }}>{selected.icon}</span>
              <div style={{ flex: 1 }}>
                <h2
                  style={{ fontSize: 22, fontWeight: 900, color: "var(--g1)" }}
                >
                  {selected.name} عليه السلام
                </h2>
                <p style={{ fontSize: 13, color: "var(--t2)" }}>
                  {selected.title}
                </p>
              </div>
              <button className="small-btn" onClick={() => setSelected(null)}>
                ✕ إغلاق
              </button>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--t2)",
                lineHeight: 2.1,
                fontFamily: "var(--font-ar)",
              }}
            >
              {selected.story}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  QIBLA PAGE
// ══════════════════════════════════════════
export function QiblaPage() {
  const [degree, setDegree] = useState(null);
  const [dist, setDist] = useState(null);
  const [loading, setLoading] = useState(false);

  const findQibla = () => {
    if (!navigator.geolocation) {
      showToast("المتصفح لا يدعم تحديد الموقع", "error");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const KAABA_LAT = 21.4225;
        const KAABA_LNG = 39.8262;
        const mLat = (KAABA_LAT * Math.PI) / 180;
        const mLng = (KAABA_LNG * Math.PI) / 180;
        const uLat = (lat * Math.PI) / 180;
        const uLng = (lng * Math.PI) / 180;
        const y = Math.sin(mLng - uLng) * Math.cos(mLat);
        const x =
          Math.cos(uLat) * Math.sin(mLat) -
          Math.sin(uLat) * Math.cos(mLat) * Math.cos(mLng - uLng);
        const deg = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
        const R = 6371;
        const dLat = ((KAABA_LAT - lat) * Math.PI) / 180;
        const dLng = ((KAABA_LNG - lng) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos((lat * Math.PI) / 180) *
            Math.cos((KAABA_LAT * Math.PI) / 180) *
            Math.sin(dLng / 2) ** 2;
        setDegree(Math.round(deg));
        setDist(Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))));
        setLoading(false);
        showToast("✅ تم تحديد اتجاه القبلة");
      },
      () => {
        showToast("تعذّر تحديد موقعك. تحقق من إذن الموقع.", "error");
        setLoading(false);
      }
    );
  };

  return (
    <div className="page">
      <Hero title="اتجاه القبلة" sub="نحو الكعبة المشرفة 🕋" />
      <div className="qibla-wrap">
        <div className="compass">
          <span className="compass-dir c-n">N</span>
          <span className="compass-dir c-s">S</span>
          <span className="compass-dir c-e">E</span>
          <span className="compass-dir c-w">W</span>
          <div className="needle">
            <div className="needle-n" />
            <div className="needle-s" />
          </div>
          {degree !== null && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transformOrigin: "50% 100%",
                transform: `translateX(-50%) translateY(-90%) rotate(${degree}deg)`,
                transition: "transform .5s ease",
              }}
            >
              <span style={{ fontSize: 22 }}>🕋</span>
              <div
                style={{
                  width: 3,
                  height: 46,
                  background: "var(--g1)",
                  marginTop: 3,
                }}
              />
            </div>
          )}
        </div>
        {degree !== null ? (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--g1)",
                marginBottom: 4,
              }}
            >
              {degree}° — اتجاه القبلة
            </div>
            <p style={{ fontSize: 13, color: "var(--t2)" }}>
              المسافة إلى مكة المكرمة:{" "}
              <strong>{dist?.toLocaleString()} كم</strong>
            </p>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: "var(--t2)", textAlign: "center" }}>
            اضغط الزر لتحديد اتجاه القبلة من موقعك الحالي
          </p>
        )}
        <button
          className="primary-btn"
          style={{ fontSize: 15, padding: "13px 32px" }}
          onClick={findQibla}
          disabled={loading}
        >
          {loading ? "⏳ جاري التحديد..." : "🧭 تحديد اتجاه القبلة"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  CALENDAR PAGE
// ══════════════════════════════════════════
export function CalendarPage() {
  const now = new Date();
  const todayH = dateToHijri(now);
  const [calM, setCalM] = useState(todayH.month);
  const [calY, setCalY] = useState(todayH.year);

  const WEEK_DAYS_SHORT = [
    "الأح",
    "الإث",
    "الثل",
    "الأر",
    "الخم",
    "الجم",
    "السب",
  ];
  const EVENT_DAYS = { 9: [1, 27], 10: [1], 12: [10, 12], 1: [10] };
  const start = (calM + 2) % 7;

  const ISLAMIC_EVENTS = [
    { d: "1 محرم", n: "رأس السنة الهجرية" },
    { d: "10 محرم", n: "يوم عاشوراء المبارك" },
    { d: "12 ربيع الأول", n: "المولد النبوي الشريف" },
    { d: "27 رجب", n: "الإسراء والمعراج" },
    { d: "1 رمضان", n: "بداية شهر رمضان المبارك" },
    { d: "27 رمضان", n: "ليلة القدر المرتقبة" },
    { d: "1 شوال", n: "عيد الفطر المبارك" },
    { d: "9 ذو الحجة", n: "يوم عرفة المبارك" },
    { d: "10 ذو الحجة", n: "عيد الأضحى المبارك" },
  ];

  const prevMonth = () => {
    if (calM === 1) {
      setCalM(12);
      setCalY((y) => y - 1);
    } else setCalM((m) => m - 1);
  };
  const nextMonth = () => {
    if (calM === 12) {
      setCalM(1);
      setCalY((y) => y + 1);
    } else setCalM((m) => m + 1);
  };

  return (
    <div className="page">
      <Hero title="التقويم الهجري" sub="التقويم الإسلامي القمري" />
      <div className="page-body">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <button className="primary-btn" onClick={prevMonth}>
            ◀ السابق
          </button>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--g1)",
              fontFamily: "var(--font-ar)",
            }}
          >
            {HIJRI_MONTHS[calM - 1]} {calY} هـ
          </h2>
          <button className="primary-btn" onClick={nextMonth}>
            التالي ▶
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: 5,
            marginBottom: 20,
          }}
        >
          {WEEK_DAYS_SHORT.map((d) => (
            <div
              key={d}
              style={{
                background: "var(--g1)",
                color: "white",
                padding: "7px 3px",
                textAlign: "center",
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 8,
              }}
            >
              {d}
            </div>
          ))}
          {Array.from({ length: start }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: 30 }).map((_, i) => {
            const d = i + 1;
            const isToday =
              d === todayH.day && calM === todayH.month && calY === todayH.year;
            const isEvent = EVENT_DAYS[calM]?.includes(d);
            return (
              <div
                key={d}
                style={{
                  background: isToday
                    ? "var(--g1)"
                    : isEvent
                    ? "#fefde8"
                    : "var(--card)",
                  color: isToday ? "white" : "var(--t1)",
                  border: `1px solid ${
                    isToday
                      ? "var(--g1)"
                      : isEvent
                      ? "var(--gold)"
                      : "var(--bdr)"
                  }`,
                  borderRadius: 6,
                  padding: "6px 3px",
                  textAlign: "center",
                  fontSize: 12,
                  minHeight: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: isToday ? 700 : 400,
                }}
              >
                {d}
              </div>
            );
          })}
        </div>

        <h4
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--t1)",
            marginBottom: 12,
          }}
        >
          📅 المناسبات الإسلامية
        </h4>
        {ISLAMIC_EVENTS.map((e) => (
          <div
            key={e.d}
            style={{
              display: "flex",
              gap: 12,
              padding: "10px 14px",
              background: "var(--card)",
              border: "1px solid var(--bdr)",
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "var(--gold)",
                fontWeight: 700,
                minWidth: 100,
              }}
            >
              📅 {e.d}
            </span>
            <span style={{ fontSize: 13, color: "var(--t1)" }}>{e.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  OCCASIONS PAGE
// ══════════════════════════════════════════
export function OccasionsPage() {
  return (
    <div className="page">
      <Hero
        title="المناسبات الإسلامية"
        sub="أبرز الأعياد والمناسبات الإسلامية"
      />
      <div className="page-body">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
            gap: 16,
          }}
        >
          {OCCASIONS.map((o, i) => (
            <div
              key={i}
              className="card"
              style={{
                overflow: "hidden",
                animation: `fadeUp .4s ease ${i * 0.08}s both`,
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg,var(--g1),var(--g3))",
                  padding: 28,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 44, marginBottom: 10 }}>{o.icon}</div>
                <div
                  style={{
                    color: "white",
                    fontFamily: "var(--font-ar)",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {o.name}
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--t2)",
                    lineHeight: 1.8,
                    marginBottom: 8,
                  }}
                >
                  {o.desc}
                </p>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--gold)",
                    fontWeight: 700,
                  }}
                >
                  📅 {o.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  FORUM PAGE
// ══════════════════════════════════════════
export function ForumPage() {
  const [posts, setPosts] = useState(DEFAULT_FORUM_POSTS);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = () => {
    if (!title.trim() || !content.trim()) {
      showToast("⚠️ يرجى ملء جميع الحقول", "error");
      return;
    }
    setPosts((p) => [
      {
        id: Date.now(),
        title,
        content,
        time: "الآن",
        likes: 0,
        replies: 0,
      },
      ...p,
    ]);
    setTitle("");
    setContent("");
    showToast("✅ تم نشر الموضوع بنجاح");
  };

  return (
    <div className="page">
      <Hero title="المنتدى الإسلامي" sub="تواصل مع إخوانك المسلمين" />
      <div className="page-body">
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--bdr)",
            borderRadius: "var(--rad)",
            padding: 18,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <input
            className="forum-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان الموضوع..."
          />
          <textarea
            className="forum-textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب موضوعك هنا..."
          />
          <button
            className="primary-btn"
            style={{ alignSelf: "flex-end" }}
            onClick={submit}
          >
            📝 نشر الموضوع
          </button>
        </div>

        {posts.map((p) => (
          <div
            key={p.id}
            className="card"
            style={{ padding: 18, marginBottom: 12 }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "var(--t1)",
                marginBottom: 7,
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--t2)",
                lineHeight: 1.8,
                fontFamily: "var(--font-ar)",
                marginBottom: 10,
              }}
            >
              {p.content}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 11,
                color: "var(--t3)",
              }}
            >
              <span>{p.time}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  className="small-btn"
                  onClick={() => showToast("👍 شكراً على تفاعلك!")}
                >
                  👍 {p.likes}
                </button>
                <button className="small-btn">💬 {p.replies} ردود</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  DUAS PAGE
// ══════════════════════════════════════════
export function DuasPage() {
  const [duas, setDuas] = useState(DEFAULT_DUAS);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = () => {
    if (!title.trim() || !content.trim()) {
      showToast("⚠️ يرجى ملء جميع الحقول", "error");
      return;
    }
    setDuas((d) => [
      {
        id: Date.now(),
        title,
        content,
        time: "الآن",
        likes: 0,
      },
      ...d,
    ]);
    setTitle("");
    setContent("");
    showToast("✅ تم مشاركة الدعاء");
  };

  return (
    <div className="page">
      <Hero title="مشاركة الأدعية" sub="شارك إخوانك بأجمل الأدعية" />
      <div className="page-body">
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--bdr)",
            borderRadius: "var(--rad)",
            padding: 18,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <input
            className="forum-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان الدعاء..."
          />
          <textarea
            className="forum-textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب الدعاء هنا..."
          />
          <button
            className="primary-btn"
            style={{ alignSelf: "flex-end" }}
            onClick={submit}
          >
            🤲 مشاركة الدعاء
          </button>
        </div>

        {duas.map((d) => (
          <div
            key={d.id}
            className="card"
            style={{ padding: 18, marginBottom: 12 }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "var(--g1)",
                marginBottom: 7,
              }}
            >
              🤲 {d.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-ar)",
                fontSize: 14,
                color: "var(--t1)",
                lineHeight: 2,
                marginBottom: 10,
              }}
            >
              {d.content}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "var(--t3)",
              }}
            >
              <span>{d.time}</span>
              <button
                className="small-btn"
                onClick={() => showToast("❤️ أعجبني!")}
              >
                ❤️ {d.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  FAVORITES PAGE
// ══════════════════════════════════════════
export function FavoritesPage({ favorites, onRemove }) {
  const ICONS = { verse: "📖", hadith: "📜", dhikr: "📿" };

  return (
    <div className="page">
      <Hero title="المفضلة" sub="محتواك المحفوظ" />
      <div className="page-body">
        {!favorites.length && (
          <div className="empty-state">
            <div style={{ fontSize: 64 }}>❤️</div>
            <h3>لا يوجد محتوى محفوظ</h3>
            <p>
              احفظ الآيات والأحاديث والأذكار من الصفحات المختلفة بالضغط على زر
              ⭐ حفظ
            </p>
          </div>
        )}
        {favorites.map((f, i) => (
          <div
            key={i}
            className="card"
            style={{
              padding: 16,
              marginBottom: 10,
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: 24, flexShrink: 0 }}>
              {ICONS[f.type] || "⭐"}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--t1)",
                  marginBottom: 4,
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ar)",
                  fontSize: 13,
                  color: "var(--t2)",
                  lineHeight: 1.9,
                }}
              >
                {f.text}
              </div>
            </div>
            <button
              style={{ fontSize: 18, color: "var(--t3)", flexShrink: 0 }}
              onClick={() => onRemove(i)}
              title="حذف من المفضلة"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  AI PAGE
// ══════════════════════════════════════════
export function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "السلام عليكم ورحمة الله وبركاته! أنا مساعدك الإسلامي الذكي. يمكنني الإجابة على أسئلتك حول القرآن الكريم والسنة النبوية والفقه والسيرة النبوية وسائر العلوم الإسلامية.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const SUGGESTIONS = [
    "ما هي أركان الإسلام الخمسة؟",
    "ما فضل قراءة القرآن الكريم؟",
    "كيف أؤدي صلاة الفجر صحيحة؟",
    "ما شروط الصيام ومفسداته؟",
    "ما نصاب الزكاة وكيف تُحسب؟",
  ];

  const FALLBACKS = {
    أركان:
      "أركان الإسلام خمسة: شهادة التوحيد، إقام الصلاة، إيتاء الزكاة، صوم رمضان، حج البيت لمن استطاع. رواه البخاري ومسلم عن ابن عمر.",
    قرآن: "قال ﷺ: من قرأ حرفاً من كتاب الله فله حسنة والحسنة بعشر أمثالها. لا أقول الم حرف، ألف حرف ولام حرف وميم حرف. رواه الترمذي وصحّحه.",
    فجر: "صلاة الفجر ركعتان. وقتها من طلوع الفجر الصادق إلى شروق الشمس. يُستحب قراءة سورة الكافرون في الركعة الأولى والإخلاص في الثانية بعد الفاتحة.",
    صيام: "الصيام الإمساك عن الطعام والشراب والجماع من طلوع الفجر الصادق إلى غروب الشمس مع النية. رخص الإفطار: السفر والمرض والحمل والرضاعة والشيخوخة.",
    زكاة: "نصاب الزكاة في النقود 85 غراماً من الذهب الخالص. نسبتها 2.5% من إجمالي المبلغ بعد حولان الحول الهجري. مصارفها 8 أصناف ذكرها الله في سورة التوبة.",
    توحيد:
      "التوحيد ثلاثة أقسام: توحيد الربوبية (إفراد الله بالخلق والرزق)، توحيد الألوهية (إفراد الله بالعبادة)، توحيد الأسماء والصفات (إثبات أسمائه وصفاته بلا تشبيه).",
    حج: "أركان الحج: الإحرام، الوقوف بعرفة، طواف الإفاضة، السعي. واجباته: الإحرام من الميقات، المبيت بمزدلفة ومنى، رمي الجمرات، الحلق أو التقصير.",
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (msg) => {
    if (!msg?.trim() || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: msg }]);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "أنت مساعد إسلامي متخصص ومتعلم. تجيب على الأسئلة الإسلامية بشكل مختصر وواضح مبني على الكتاب والسنة. تستشهد بالآيات والأحاديث. لغتك العربية الفصحى الرصينة. لا تتجاوز 200 كلمة في الإجابة.",
          messages: messages
            .filter((m) => m.role !== "ai")
            .concat({ role: "user", content: msg })
            .map((m) => ({
              role: m.role === "ai" ? "assistant" : "user",
              content: m.text,
            })),
        }),
      });
      const data = await res.json();
      const reply =
        data.content?.[0]?.text || "عذراً، حدث خطأ. يرجى المحاولة مجدداً.";
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    } catch {
      const found = Object.entries(FALLBACKS).find(([k]) => msg.includes(k));
      const reply = found
        ? found[1]
        : "جزاك الله خيراً على سؤالك. يُستحسن مراجعة العلماء الثقات وكتب الفقه المعتمدة للإجابة التفصيلية على مسألتك.";
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bas">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <h1 className="hero-title">المساعد الإسلامي 🤖</h1>
        <p className="hero-sub">مساعدك الذكي للإجابة على أسئلتك الإسلامية</p>
      </div>

      <div className="ai-layout">
        {/* Chat Messages */}
        <div className="ai-chat" ref={chatRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`ai-msg${m.role === "user" ? " user" : ""}`}
            >
              <div className={`ai-ava${m.role === "user" ? " user" : ""}`}>
                {m.role === "user" ? "👤" : "🤖"}
              </div>
              <div className={`ai-bubble${m.role === "user" ? " user" : ""}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="ai-msg">
              <div className="ai-ava">🤖</div>
              <div className="ai-bubble">
                <span className="typing-dot" />
                <span
                  className="typing-dot"
                  style={{ animationDelay: ".2s" }}
                />
                <span
                  className="typing-dot"
                  style={{ animationDelay: ".4s" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div
          style={{
            display: "flex",
            gap: 7,
            flexWrap: "wrap",
            padding: "8px 0",
          }}
        >
          {SUGGESTIONS.map((s) => (
            <button key={s} className="ai-sug" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div
          style={{
            display: "flex",
            gap: 8,
            border: "1px solid var(--bdr)",
            borderTop: "none",
            borderRadius: "0 0 var(--rad) var(--rad)",
            padding: 10,
            background: "var(--card)",
          }}
        >
          <textarea
            className="ai-input"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اسأل سؤالك الإسلامي هنا... (Enter للإرسال)"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
          />
          <button
            className="ai-send"
            onClick={() => sendMessage(input)}
            disabled={loading}
          >
            إرسال ✈️
          </button>
        </div>
      </div>
    </div>
  );
}
