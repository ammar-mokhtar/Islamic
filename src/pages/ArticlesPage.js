import React, { useState } from "react";
import { ARTICLES } from "../data/islamicData";
import { showToast } from "../components/Toast";

const FULL_CONTENT = {
  1: `فضل تلاوة القرآن الكريم لا يُحصى، وقد وردت في ذلك أحاديث كثيرة:

قال ﷺ: «اقْرَؤُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ» رواه مسلم.

وقال ﷺ: «مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ وَالْحَسَنَةُ بِعَشْرِ أَمْثَالِهَا» رواه الترمذي.

**آداب تلاوة القرآن:**
- الطهارة وتطييب المكان والفم.
- الاستعاذة بالله من الشيطان قبل القراءة.
- الترتيل والتأني وعدم الإسراع.
- التدبر والتأمل في معاني الآيات.
- التخشع والبكاء أو التباكي.

**أفضل أوقات التلاوة:**
قيام الليل، ثم ما بعد صلاة الفجر، ثم بعد العصر.`,

  2: `رمضان شهر البركة والرحمة والمغفرة. الاستعداد الحقيقي له لا يقتصر على إعداد الطعام.

**الاستعداد الروحي:**
- الإكثار من الاستغفار والتوبة قبل رمضان.
- قراءة القرآن وإعداد خطة ختمة.
- صيام نوافل شعبان تهيؤاً للصيام.

**الاستعداد العلمي:**
- تعلّم أحكام الصيام والزكاة وصلاة التراويح.
- قراءة فضائل رمضان والأحاديث الواردة فيه.

**الاستعداد العملي:**
- وضع برنامج يومي متوازن للعبادة والعمل.
- التخطيط لإخراج زكاة الفطر والزكاة.`,
};

export default function ArticlesPage() {
  const [selected, setSelected] = useState(null);
  const [cat, setCat] = useState("الكل");

  const cats = ["الكل", ...new Set(ARTICLES.map((a) => a.cat))];
  const filtered =
    cat === "الكل" ? ARTICLES : ARTICLES.filter((a) => a.cat === cat);

  if (selected) {
    const article = ARTICLES.find((a) => a.id === selected);
    const content = FULL_CONTENT[article.id] || article.excerpt;
    return (
      <div className="page">
        <div className="hero">
          <div style={{ fontSize: 48 }}>{article.icon}</div>
          <h1 className="hero-title" style={{ fontSize: 22 }}>
            {article.title}
          </h1>
          <p className="hero-sub">{article.date}</p>
        </div>
        <div className="page-body">
          <button
            className="primary-btn"
            style={{ marginBottom: 20 }}
            onClick={() => setSelected(null)}
          >
            ← رجوع للمقالات
          </button>
          <div className="card" style={{ padding: 28 }}>
            <span
              className="badge"
              style={{ marginBottom: 12, display: "inline-block" }}
            >
              {article.cat}
            </span>
            {content.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 14,
                  color: "var(--t2)",
                  lineHeight: 2.1,
                  marginBottom: 14,
                  fontFamily: "var(--font-ar)",
                }}
              >
                {para.startsWith("•") ? (
                  <span
                    style={{
                      borderRight: "3px solid var(--g1)",
                      paddingRight: 12,
                      display: "block",
                    }}
                  >
                    {para}
                  </span>
                ) : para.startsWith("**") ? (
                  <strong style={{ color: "var(--g1)", fontSize: 15 }}>
                    {para.replace(/\*\*/g, "")}
                  </strong>
                ) : (
                  para
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="hero">
        <h1 className="hero-title">مقالات إسلامية</h1>
        <p className="hero-sub">محتوى إسلامي متنوع ومفيد</p>
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
            className={`filter-chip${cat === c ? " active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="page-body">
        <div className="articles-grid">
          {filtered.map((a, i) => (
            <div
              key={a.id}
              className="article-card"
              style={{ animationDelay: `${i * 0.07}s`, cursor: "pointer" }}
              onClick={() => setSelected(a.id)}
            >
              <div className="art-thumb">{a.icon}</div>
              <div className="art-body">
                <span className="art-cat">{a.cat}</span>
                <div className="art-title">{a.title}</div>
                <p className="art-excerpt">{a.excerpt.substring(0, 100)}...</p>
                <div className="art-date">📅 {a.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
