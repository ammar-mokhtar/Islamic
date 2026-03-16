import React, { useState, useEffect } from "react";

let toastFn = null;

export function showToast(msg, type = "success") {
  if (toastFn) toastFn(msg, type);
}

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastFn = (msg, type) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, msg, type }]);
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        3200
      );
    };
    return () => {
      toastFn = null;
    };
  }, []);

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background: t.type === "error" ? "#c62828" : "var(--g1)",
            color: "white",
            padding: "11px 24px",
            borderRadius: 24,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: "0 4px 20px rgba(0,0,0,.2)",
            animation: "toastIn .3s ease",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-ui)",
          }}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}
