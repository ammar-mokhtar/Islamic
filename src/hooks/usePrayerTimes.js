import { useState, useEffect, useCallback } from "react";
import {
  format12HourShort,
  dateToHijri,
  HIJRI_MONTHS,
  GREG_MONTHS,
  WEEK_DAYS,
} from "./useIslamicTime";

const PRAYER_NAMES = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};
const PRAYER_ORDER = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function parseTimeToDate(timeStr, refDate) {
  if (!timeStr) return null;
  const clean = timeStr.split(" ")[0];
  const [h, m] = clean.split(":").map(Number);
  const d = new Date(refDate);
  d.setHours(h, m, 0, 0);
  return d;
}

export function usePrayerTimes() {
  const [times, setTimes] = useState(null);
  const [location, setLocation] = useState("جاري تحديد موقعك...");
  const [loading, setLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState({
    name: "—",
    countdown: "--:--:--",
  });
  const [currentPrayer, setCurrentPrayer] = useState(null);

  const fetchTimes = useCallback(async (lat, lng) => {
    try {
      const now = new Date();
      const dateStr = `${now.getDate()}-${
        now.getMonth() + 1
      }-${now.getFullYear()}`;
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=4`
      );
      const data = await res.json();
      if (data.code === 200) {
        const raw = data.data.timings;
        const formatted = {};
        Object.entries(raw).forEach(([k, v]) => {
          formatted[k] = format12HourShort(v.split(" ")[0]);
          formatted[`_raw_${k}`] = v.split(" ")[0];
        });
        setTimes(formatted);
        setLoading(false);
      }
    } catch {
      const demo = {
        Fajr: "4:18 ص",
        Sunrise: "5:49 ص",
        Dhuhr: "12:04 م",
        Asr: "3:33 م",
        Maghrib: "6:19 م",
        Isha: "7:49 م",
        _raw_Fajr: "04:18",
        _raw_Sunrise: "05:49",
        _raw_Dhuhr: "12:04",
        _raw_Asr: "15:33",
        _raw_Maghrib: "18:19",
        _raw_Isha: "19:49",
      };
      setTimes(demo);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          fetchTimes(lat, lng);
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();
            const city = data.address?.city || data.address?.town || "";
            const country = data.address?.country || "";
            setLocation(`${city}، ${country}`);
          } catch {
            setLocation("موقعك الحالي");
          }
        },
        () => {
          setLocation("القاهرة، مصر (افتراضي)");
          fetchTimes(30.0444, 31.2357);
        },
        { timeout: 8000 }
      );
    } else {
      setLocation("القاهرة، مصر (افتراضي)");
      fetchTimes(30.0444, 31.2357);
    }
  }, [fetchTimes]);

  useEffect(() => {
    const tick = () => {
      if (!times) return;
      const now = new Date();
      let nextP = null;
      for (const k of PRAYER_ORDER) {
        const raw = times[`_raw_${k}`];
        if (!raw) continue;
        const t = parseTimeToDate(raw, now);
        if (t && t > now) {
          nextP = { key: k, time: t };
          break;
        }
      }
      if (!nextP) {
        const raw = times["_raw_Fajr"];
        if (raw) {
          const t = parseTimeToDate(raw, now);
          if (t) {
            t.setDate(t.getDate() + 1);
            nextP = { key: "Fajr", time: t };
          }
        }
      }
      if (nextP) {
        const diff = nextP.time - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setNextPrayer({
          name: PRAYER_NAMES[nextP.key] || nextP.key,
          countdown: `${String(h).padStart(2, "0")}:${String(m).padStart(
            2,
            "0"
          )}:${String(s).padStart(2, "0")}`,
        });
      }
      for (let i = 0; i < PRAYER_ORDER.length; i++) {
        const k = PRAYER_ORDER[i];
        const nk = PRAYER_ORDER[i + 1];
        const raw = times[`_raw_${k}`];
        if (!raw) continue;
        const start = parseTimeToDate(raw, now);
        const rawN = nk ? times[`_raw_${nk}`] : null;
        const end = rawN ? parseTimeToDate(rawN, now) : null;
        if (start && now >= start && (!end || now < end)) {
          setCurrentPrayer(k);
          break;
        }
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [times]);

  const now = new Date();
  const hijri = dateToHijri(now);
  const hijriStr = `${hijri.day} ${HIJRI_MONTHS[hijri.month - 1]} ${
    hijri.year
  } هـ`;
  const gregStr = `${WEEK_DAYS[now.getDay()]} ${now.getDate()} ${
    GREG_MONTHS[now.getMonth()]
  } ${now.getFullYear()}`;

  return {
    times,
    location,
    loading,
    nextPrayer,
    currentPrayer,
    hijriStr,
    gregStr,
    PRAYER_NAMES,
  };
}
