import { useState, useEffect } from "react";

function gregorianToJD(y, m, d) {
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    d +
    B -
    1524.5
  );
}

function jdToHijri(jd) {
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const ll = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - ll) / 5316) * Math.floor((50 * ll) / 17719) +
    Math.floor(ll / 5670) * Math.floor((43 * ll) / 15238);
  const lll =
    ll -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const month = Math.floor((24 * lll) / 709);
  const day = lll - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { year, month: month || 1, day: day || 1 };
}

export function dateToHijri(date) {
  const jd = gregorianToJD(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return jdToHijri(jd);
}

export const HIJRI_MONTHS = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الثاني",
  "جمادى الأولى",
  "جمادى الثانية",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

export const GREG_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export const WEEK_DAYS = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

export function format12Hour(date) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const period = hours >= 12 ? "م" : "ص";
  hours = hours % 12 || 12;
  return `${hours}:${minutes}:${seconds} ${period}`;
}

export function format12HourShort(timeStr) {
  if (!timeStr) return "--:--";
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "م" : "ص";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export function useIslamicTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hijri = dateToHijri(now);
  const timeStr = format12Hour(now);
  const weekDay = WEEK_DAYS[now.getDay()];
  const gregStr = `${weekDay} ${now.getDate()} ${
    GREG_MONTHS[now.getMonth()]
  } ${now.getFullYear()}`;
  const hijriStr = `${hijri.day} ${HIJRI_MONTHS[hijri.month - 1]} ${
    hijri.year
  } هـ`;
  const isRamadan = hijri.month === 9;

  return {
    now,
    timeStr,
    weekDay,
    gregStr,
    hijriStr,
    hijri,
    hijriMonth: HIJRI_MONTHS[hijri.month - 1],
    isRamadan,
    year: now.getFullYear(),
  };
}
