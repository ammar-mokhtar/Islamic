import React, { useState } from "react";
import { showToast } from "../components/Toast";

const CHARITIES = [
  {
    id: 1,
    name: "جمعية رسالة",
    country: "🇪🇬 مصر",
    icon: "🍞",
    color: "#e8f5e9",
    cats: ["إطعام", "أيتام"],
    desc: "تقديم وجبات غذائية للمحتاجين والأيتام والأسر الفقيرة في مصر.",
    phone: "19450",
    website: "https://www.resala.org",
  },
  {
    id: 2,
    name: "بنك الطعام المصري",
    country: "🇪🇬 مصر",
    icon: "🧺",
    color: "#fff3e0",
    cats: ["إطعام", "رمضان"],
    desc: "توفير الغذاء لمحدودي الدخل وتوزيع الكراتين خاصةً في رمضان.",
    phone: "19812",
    website: "https://www.egyptfoodbank.org",
  },
  {
    id: 3,
    name: "الهلال الأحمر المصري",
    country: "🇪🇬 مصر",
    icon: "🏥",
    color: "#fce4ec",
    cats: ["إغاثة", "طوارئ"],
    desc: "تقديم المساعدات الإنسانية والإغاثة العاجلة ودعم اللاجئين.",
    phone: "16021",
    website: "https://www.egyptianredcrescent.org",
  },
  {
    id: 4,
    name: "صندوق الزكاة المصري",
    country: "🇪🇬 مصر",
    icon: "💰",
    color: "#f3e5f5",
    cats: ["زكاة", "فقراء"],
    desc: "الهيئة الرسمية لجمع وتوزيع الزكاة في مصر على مستحقيها.",
    phone: "15999",
    website: "https://zakat.manpower.gov.eg",
  },
  {
    id: 5,
    name: "كفالة اليتيم",
    country: "🇪🇬 مصر",
    icon: "👶",
    color: "#e8f5e9",
    cats: ["أيتام", "تعليم"],
    desc: "برنامج كفالة الأيتام وتوفير التعليم والرعاية الصحية لهم.",
    phone: "01XXXXXXXX",
    website: "#",
  },
  {
    id: 6,
    name: "أطباء بلا حدود",
    country: "🌍 دولية",
    icon: "👩‍⚕️",
    color: "#e3f2fd",
    cats: ["طبي", "إغاثة"],
    desc: "تقديم الرعاية الطبية في مناطق النزاع والأزمات الإنسانية عالمياً.",
    phone: "",
    website: "https://www.msf.org/ar",
  },
];

const DONATION_TYPES = [
  { id: "zakat", label: "زكاة المال", icon: "💰" },
  { id: "sadaqa", label: "صدقة جارية", icon: "🌊" },
  { id: "kafala", label: "كفالة يتيم", icon: "👶" },
  { id: "quran", label: "طباعة مصاحف", icon: "📖" },
  { id: "masjid", label: "بناء مسجد", icon: "🕌" },
  { id: "iftar", label: "إفطار صائم", icon: "🌙" },
];

export default function DonationsPage() {
  const [selected, setSelected] = useState(null);
  const [donType, setDonType] = useState("");
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState("الكل");
  const [showForm, setShowForm] = useState(false);

  const cats = ["الكل", "إطعام", "أيتام", "إغاثة", "طبي", "زكاة", "تعليم"];
  const filtered =
    filter === "الكل"
      ? CHARITIES
      : CHARITIES.filter((c) =>
          c.cats.some((cat) => cat.includes(filter.split(" ")[0]))
        );

  const handleDonate = () => {
    if (!amount) {
      showToast("⚠️ يرجى إدخال مبلغ التبرع", "error");
      return;
    }
    showToast("✅ سيتم توجيهك لصفحة التبرع — جزاك الله خيراً");
    const charity = CHARITIES.find((c) => c.id === selected);
    if (charity?.website && charity.website !== "#") {
      setTimeout(() => window.open(charity.website, "_blank"), 1000);
    }
  };

  if (selected) {
    const charity = CHARITIES.find((c) => c.id === selected);
    return (
      <div className="page">
        <div className="hero">
          <h1 className="hero-title">{charity.name}</h1>
          <p className="hero-sub">{charity.country}</p>
        </div>
        <div className="page-body">
          <button
            className="primary-btn"
            style={{ marginBottom: 20 }}
            onClick={() => {
              setSelected(null);
              setShowForm(false);
            }}
          >
            ← رجوع
          </button>

          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  background: charity.color,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  border: "2px solid var(--bdr)",
                  flexShrink: 0,
                }}
              >
                {charity.icon}
              </div>
              <div>
                <h2
                  style={{ fontSize: 22, fontWeight: 900, color: "var(--g1)" }}
                >
                  {charity.name}
                </h2>
                <p style={{ fontSize: 13, color: "var(--t2)" }}>
                  {charity.country}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginTop: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {charity.cats.map((cat) => (
                    <span key={cat} className="badge">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--t2)",
                lineHeight: 1.9,
                marginBottom: 20,
              }}
            >
              {charity.desc}
            </p>
            {charity.phone && (
              <div
                style={{
                  background: "var(--bg2)",
                  borderRadius: "var(--rad-sm)",
                  padding: 14,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{ fontSize: 11, color: "var(--t3)", marginBottom: 4 }}
                >
                  📞 الهاتف
                </div>
                <div
                  style={{ fontSize: 15, fontWeight: 700, color: "var(--t1)" }}
                >
                  {charity.phone}
                </div>
              </div>
            )}
          </div>

          {!showForm ? (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                className="primary-btn"
                style={{ fontSize: 15 }}
                onClick={() => setShowForm(true)}
              >
                💝 تبرع الآن
              </button>
              {charity.website && charity.website !== "#" && (
                <a
                  href={charity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-btn"
                  style={{
                    background: "var(--bg2)",
                    color: "var(--g1)",
                    border: "1px solid var(--g1)",
                  }}
                >
                  🌐 الموقع الرسمي
                </a>
              )}
            </div>
          ) : (
            <div className="card" style={{ padding: 24 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                💝 نموذج التبرع
              </h4>
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--t3)",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  نوع التبرع
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {DONATION_TYPES.map((dt) => (
                    <button
                      key={dt.id}
                      className={`filter-chip${
                        donType === dt.id ? " active" : ""
                      }`}
                      onClick={() => setDonType(dt.id)}
                    >
                      {dt.icon} {dt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--t3)",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  مبلغ التبرع (بالجنيه المصري)
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {[50, 100, 250, 500, 1000].map((a) => (
                    <button
                      key={a}
                      className={`filter-chip${
                        amount === String(a) ? " active" : ""
                      }`}
                      onClick={() => setAmount(String(a))}
                    >
                      {a} ج.م
                    </button>
                  ))}
                </div>
                <input
                  className="forum-input"
                  type="number"
                  placeholder="أو أدخل مبلغاً مخصصاً..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  dir="ltr"
                />
              </div>
              <button
                className="primary-btn"
                onClick={handleDonate}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 15,
                  padding: 14,
                }}
              >
                💝 تبرع بـ {amount || "..."} ج.م
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bas">
          ﴿مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ
          كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ﴾
        </div>
        <h1 className="hero-title">التبرعات الخيرية</h1>
        <p className="hero-sub">
          «الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ»
        </p>
      </div>

      <div
        style={{
          padding: "12px 20px",
          background: "var(--card)",
          borderBottom: "1px solid var(--bdr)",
          display: "flex",
          gap: 8,
          overflowX: "auto",
        }}
      >
        {cats.map((c) => (
          <button
            key={c}
            className={`filter-chip${filter === c ? " active" : ""}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="page-body">
        <div
          style={{
            background: "var(--bg2)",
            borderRadius: "var(--rad)",
            padding: 20,
            marginBottom: 20,
            textAlign: "center",
            border: "1px solid var(--bdr)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ar)",
              fontSize: 16,
              color: "var(--g1)",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            ﴿مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ
            كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ
            مِّئَةُ حَبَّةٍ﴾
          </p>
          <p style={{ fontSize: 12, color: "var(--t2)" }}>
            سورة البقرة — الآية 261
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {filtered.map((c, i) => (
            <div
              key={c.id}
              className="card"
              style={{
                cursor: "pointer",
                overflow: "hidden",
                animationDelay: `${i * 0.08}s`,
              }}
              onClick={() => setSelected(c.id)}
            >
              <div
                style={{
                  padding: "18px 18px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: c.color,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    border: "2px solid var(--bdr)",
                    flexShrink: 0,
                  }}
                >
                  {c.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "var(--t1)",
                    }}
                  >
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--t3)" }}>
                    {c.country}
                  </div>
                </div>
              </div>
              <div style={{ padding: "0 18px 16px" }}>
                <p
                  style={{
                    fontSize: 12.5,
                    color: "var(--t2)",
                    lineHeight: 1.7,
                    marginBottom: 10,
                  }}
                >
                  {c.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 5,
                    flexWrap: "wrap",
                    marginBottom: 12,
                  }}
                >
                  {c.cats.map((cat) => (
                    <span key={cat} className="badge" style={{ fontSize: 10 }}>
                      {cat}
                    </span>
                  ))}
                </div>
                <button
                  className="primary-btn"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    fontSize: 13,
                  }}
                >
                  💝 تبرع الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
