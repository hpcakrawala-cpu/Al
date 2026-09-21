import React from "react";

// Official brand logo (PNG with transparent background)
export default function Logo({ size = 44, className = "" }) {
  return (
    <img
      src="/logo88.png"
      alt="PT Delapan Delapan Industri"
      style={{ height: size, width: "auto" }}
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  );
}
