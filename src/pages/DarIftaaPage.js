import React, { useState } from "react";
import { showToast } from "../components/Toast";

const TOPICS = [
  "العبادات (صلاة — صيام — زكاة — حج)",
  "الأحوال الشخصية (زواج — طلاق — ميراث)",
  "المعاملات المالية والاقتصادية",
  "الفقه الطبي والمستحدثات",
  "القضايا الاجتماعية والأسرية",
  "أخرى",
];

export default function DarIftaaPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!name || !question) {
      showToast("⚠️ يرجى ملء الاسم والسؤال على الأقل", "error");
      return;
    }

    setSent(true);
    showToast("✅ تم إرسال سؤالك بنجاح. سيتم الرد في أقرب وقت.");
  };

  const CONTACT_INFO = [
    {
      icon: "📞",
      title: "الخط الساخن",
      info: "19485",
      sub: "متاح 24 ساعة طوال الأسبوع",
    },
    {
      icon: "🌐",
      title: "الموقع الرسمي",
      info: "dar-alifta.org",
      sub: "للاستفتاء الإلكتروني",
      link: "https://dar-alifta.org",
    },
    {
      icon: "📍",
      title: "العنوان",
      info: "القاهرة، مصر",
      sub: "مجمع التحرير — عابدين",
    },
    {
      icon: "📧",
      title: "البريد الإلكتروني",
      info: "fatwa@dar-alifta.org",
      sub: "للاستفسارات الرسمية",
    },
  ];

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-bas">
          وَمَا أَرْسَلْنَا مِن رَّسُولٍ إِلَّا لِيُطَاعَ بِإِذْنِ اللَّهِ
        </div>

        <h1 className="hero-title">دار الإفتاء المصرية</h1>

        <p className="hero-sub">تواصل مع العلماء واستفتِ في أمور دينك</p>
      </div>

      <div className="page-body">
        {/* About */}

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
                width: 64,
                height: 64,
                background: "var(--g1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
              }}
            >
              🏛️
            </div>

            <div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "var(--g1)",
                  marginBottom: 4,
                }}
              >
                دار الإفتاء المصرية
              </h2>

              <p style={{ fontSize: 12, color: "var(--t2)" }}>
                مؤسسة دينية رسمية تأسست عام 1895م
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: 13.5,
              color: "var(--t2)",
              lineHeight: 2,
              marginBottom: 20,
            }}
          >
            دار الإفتاء المصرية هي المرجعية الدينية الرسمية في مصر والعالم
            العربي للفتوى والإرشاد الديني. تضم نخبة من كبار العلماء المتخصصين في
            الفقه الإسلامي وعلوم الشريعة.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 12,
            }}
          >
            {CONTACT_INFO.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg2)",
                  borderRadius: "var(--rad-sm)",
                  padding: 14,
                }}
              >
                <div
                  style={{ fontSize: 11, color: "var(--t3)", marginBottom: 4 }}
                >
                  {item.icon} {item.title}
                </div>

                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--g1)",
                      display: "block",
                    }}
                  >
                    {item.info}
                  </a>
                ) : (
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--t1)",
                    }}
                  >
                    {item.info}
                  </div>
                )}

                <div style={{ fontSize: 11, color: "var(--t2)", marginTop: 4 }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}

        {sent ? (
          <div
            className="card"
            style={{
              padding: 40,
              textAlign: "center",
              background: "var(--bg2)",
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>

            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--g1)",
                marginBottom: 8,
              }}
            >
              تم إرسال سؤالك بنجاح!
            </h3>

            <p
              style={{
                fontSize: 14,
                color: "var(--t2)",
                lineHeight: 1.8,
                maxWidth: 400,
                margin: "0 auto 20px",
              }}
            >
              سيقوم فريق العلماء بمراجعة سؤالك والرد عليك في أقرب وقت.
            </p>

            <button
              className="primary-btn"
              onClick={() => {
                setSent(false);

                setName("");
                setPhone("");
                setEmail("");
                setTopic("");
                setQuestion("");
              }}
            >
              إرسال سؤال آخر
            </button>
          </div>
        ) : (
          <div className="card" style={{ padding: 24 }}>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--t1)",
                marginBottom: 20,
              }}
            >
              📝 استفتِ في مسألتك الدينية
            </h3>

            <textarea
              className="forum-textarea"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={5}
              placeholder="اكتب سؤالك..."
            />

            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 20,
                flexWrap: "wrap",
              }}
            >
              <button className="primary-btn" onClick={handleSubmit}>
                📤 إرسال السؤال
              </button>

              <a
                href="https://dar-alifta.org"
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

              <a
                href="tel:19485"
                className="primary-btn"
                style={{
                  background: "var(--bg2)",
                  color: "var(--g1)",
                  border: "1px solid var(--g1)",
                }}
              >
                📞 اتصل 19485
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
