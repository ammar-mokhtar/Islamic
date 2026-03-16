import React, { useState } from "react";
import { AQEEDA_TOPICS } from "../data/islamicData";

export default function AqeedaPage() {
  const [active, setActive] = useState(null);

  return (
    <div className="page">
      <div className="hero">
        <h1 className="hero-title">تعلم العقيدة</h1>
        <p className="hero-sub">أركان الإيمان وأصول العقيدة الإسلامية</p>
      </div>

      <div className="page-body">
        <div
          style={{
            background: "var(--bg2)",
            borderRadius: "var(--rad)",
            padding: 20,
            marginBottom: 20,
            border: "1px solid var(--bdr)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ar)",
              fontSize: 15,
              color: "var(--g1)",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            قال النبي ﷺ: «الإِيمَانُ أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ
            وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الآخِرِ وَتُؤْمِنَ بِالْقَدَرِ
            خَيْرِهِ وَشَرِّهِ»
          </p>
          <p style={{ fontSize: 12, color: "var(--t2)" }}>
            رواه مسلم في صحيحه — حديث جبريل
          </p>
        </div>

        {AQEEDA_TOPICS.map((topic, i) => (
          <div
            key={i}
            className="acc-card"
            style={{ marginBottom: 12, animationDelay: `${i * 0.1}s` }}
          >
            <div
              className="acc-q"
              onClick={() => setActive(active === i ? null : i)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>{topic.icon}</span>
                <span style={{ fontWeight: 700, color: "var(--t1)" }}>
                  {topic.title}
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
                {topic.content.split("\n\n").map((para, j) => {
                  if (para.startsWith("**")) {
                    const parts = para.split("**");
                    return (
                      <div key={j} style={{ marginBottom: 12 }}>
                        {parts.map((part, k) =>
                          k % 2 === 1 ? (
                            <strong
                              key={k}
                              style={{ color: "var(--g1)", fontSize: 14 }}
                            >
                              {part}
                            </strong>
                          ) : (
                            <span
                              key={k}
                              style={{
                                fontSize: 13.5,
                                color: "var(--t2)",
                                lineHeight: 2,
                              }}
                            >
                              {part}
                            </span>
                          )
                        )}
                      </div>
                    );
                  }
                  return (
                    <p
                      key={j}
                      style={{
                        fontSize: 13.5,
                        color: "var(--t2)",
                        lineHeight: 2,
                        marginBottom: 12,
                        fontFamily: "var(--font-ar)",
                      }}
                    >
                      {para}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
