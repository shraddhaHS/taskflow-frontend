import toast from "react-hot-toast";
import React from "react";

const DURATION = 3000;

function ToastContent({ message, isSuccess }) {
  return React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", width: "100%", gap: "4px" } },
    React.createElement(
      "span",
      { style: { fontSize: "13px", fontWeight: 500, color: "#fff" } },
      message
    ),
    React.createElement("div", {
      style: {
        height: "3px",
        borderRadius: "9999px",
        marginTop: "6px",
        background: isSuccess
          ? "linear-gradient(90deg, #34d399, #10b981)"
          : "linear-gradient(90deg, #f87171, #ef4444)",
        animation: `shrinkBar ${DURATION}ms linear forwards`,
      },
    })
  );
}

const toastStyle = (isSuccess) => ({
  style: {
    background: isSuccess ? "#065f46" : "#7f1d1d",
    color: "#fff",
    borderRadius: "10px",
    padding: "12px 16px",
    boxShadow: isSuccess
      ? "0 4px 20px rgba(16, 185, 129, 0.3)"
      : "0 4px 20px rgba(239, 68, 68, 0.3)",
    border: isSuccess ? "1px solid #10b981" : "1px solid #ef4444",
    minWidth: "280px",
  },
  duration: DURATION,
});

export function showApiToast({ flag, message }) {
  const isSuccess = flag === 1;
  const content = React.createElement(ToastContent, { message, isSuccess });

  if (isSuccess) {
    toast.success(content, toastStyle(true));
  } else {
    toast.error(content, toastStyle(false));
  }
}

export const shrinkBarKeyframe = `
  @keyframes shrinkBar {
    from { width: 100%; }
    to { width: 0%; }
  }
`;
