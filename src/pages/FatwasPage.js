import React, { useState } from "react";
import { FATWAS } from "../data/islamicData";

const CATS = [
  "الكل",
  "الصلاة",
  "الصيام",
  "الزكاة",
  "الطهارة",
  "العبادات",
  "المعاملات",
];

export default function FatwasPage() {
  const [open, setOpen] = useState(null);
  const [cat, setCat] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = FATWAS.filter((f) => {
    const matchCat = cat === "الكل" || f.cat === cat;
    const matchSearch = !search || f.q.includes(search) || f.a.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div className="page">
      <div className="hero">
        <h1 className="hero-title">الفتاوى الإسلامية</h1>
        <p className="hero-sub">فتاوى علماء أهل السنة والجماعة</p>
      </div>

      <div
        style={{
          padding: "14px 20px",
          background: "var(--card)",
          borderBottom: "1px solid var(--bdr)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 12,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {CATS.map((c) => (
            <button
              key={c}
              className={`filter-chip${cat === c ? " active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="ابحث في الفتاوى..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <div className="page-body">
        {filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--t2)", padding: 40 }}>
            لم يُعثر على نتائج
          </p>
        )}
        {filtered.map((f, i) => (
          <div
            key={f.id}
            className="acc-card"
            style={{ marginBottom: 12, animationDelay: `${i * 0.07}s` }}
          >
            <div
              className="acc-q"
              onClick={() => setOpen(open === f.id ? null : f.id)}
            >
              <div>
                <span
                  className="badge"
                  style={{
                    marginLeft: 8,
                    marginBottom: 6,
                    display: "inline-block",
                  }}
                >
                  {f.cat}
                </span>
                <div style={{ fontWeight: 700, color: "var(--t1)" }}>{f.q}</div>
              </div>
              <span
                className="acc-toggle"
                style={{ transform: open === f.id ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </div>
            {open === f.id && (
              <div style={{ padding: "4px 18px 18px" }}>
                <p
                  style={{
                    lineHeight: 2,
                    marginBottom: 12,
                    fontSize: 13.5,
                    color: "var(--t2)",
                    fontFamily: "var(--font-ar)",
                  }}
                >
                  {f.a}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    paddingTop: 8,
                    borderTop: "1px solid var(--bdr)",
                  }}
                >
                  <span style={{ fontSize: 11, color: "var(--t3)" }}>
                    المصدر:
                  </span>
                  <span className="badge">{f.source}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        <div
          className="card"
          style={{
            padding: 20,
            marginTop: 24,
            background: "var(--bg2)",
            border: "1px solid var(--bdr)",
          }}
        >
          <h4
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--g1)",
              marginBottom: 8,
            }}
          >
            ⚠️ تنبيه مهم
          </h4>
          <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.9 }}>
            الفتاوى الواردة هنا للاستئناس والاطلاع. للفتاوى الشخصية يُرجى
            التواصل مع العلماء المعتمدين أو مراجعة دار الإفتاء المصرية على الرقم
            19485.
          </p>
        </div>
      </div>
    </div>
  );
}
