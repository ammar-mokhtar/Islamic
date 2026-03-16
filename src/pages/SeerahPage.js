import React, { useState } from "react";
import { SEERAH_CHAPTERS } from "../data/islamicData";

export default function SeerahPage() {
  const [active, setActive] = useState(null);

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bas">
          اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّد
        </div>
        <h1 className="hero-title">السيرة النبوية</h1>
        <p className="hero-sub">سيرة سيد الخلق محمد ﷺ</p>
      </div>

      <div className="page-body">
        <div
          style={{
            background: "linear-gradient(135deg,var(--g1),var(--g2))",
            borderRadius: "var(--rad)",
            padding: 24,
            marginBottom: 20,
            textAlign: "center",
            color: "white",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ar)",
              fontSize: 16,
              lineHeight: 2,
              color: "rgba(255,255,255,.9)",
            }}
          >
            ﴿لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن
            كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ وَذَكَرَ اللَّهَ
            كَثِيرًا﴾
          </p>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,.7)",
              marginTop: 6,
            }}
          >
            سورة الأحزاب — الآية 21
          </p>
        </div>

        {SEERAH_CHAPTERS.map((chapter, i) => (
          <div
            key={i}
            className="acc-card"
            style={{ marginBottom: 12, animationDelay: `${i * 0.08}s` }}
          >
            <div
              className="acc-q"
              onClick={() => setActive(active === i ? null : i)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 26 }}>{chapter.icon}</span>
                <span
                  style={{ fontWeight: 700, color: "var(--t1)", fontSize: 15 }}
                >
                  {chapter.title}
                </span>
              </div>
              <span
                className="acc-toggle"
                style={{ transform: active === i ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </div>
            {active === i && (
              <div style={{ padding: "8px 20px 20px" }}>
                {chapter.text.split("\n\n").map((para, j) => (
                  <p
                    key={j}
                    style={{
                      fontSize: 14,
                      color: "var(--t2)",
                      lineHeight: 2,
                      marginBottom: 12,
                      fontFamily: "var(--font-ar)",
                      ...(para.startsWith("•")
                        ? {
                            borderRight: "3px solid var(--g1)",
                            paddingRight: 12,
                          }
                        : {}),
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        <div
          className="card"
          style={{ padding: 20, marginTop: 8, background: "var(--bg2)" }}
        >
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-ar)",
              fontSize: 15,
              color: "var(--g1)",
              fontWeight: 700,
            }}
          >
            اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا
            صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ
            حَمِيدٌ مَجِيدٌ
          </p>
        </div>
      </div>
    </div>
  );
}
