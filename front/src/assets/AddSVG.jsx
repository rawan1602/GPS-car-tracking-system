import React from "react";

export default function AddSVG() {
  return (
    <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_566_183)">
        <circle cx="26" cy="25" r="19" fill="#1F1E22" />
        <circle cx="26" cy="25" r="18.5" stroke="url(#paint0_linear_566_183)" />
      </g>
      <g filter="url(#filter1_i_566_183)">
        <path d="M23.6577 31.5245V17.7184H28.7293V31.5245H23.6577ZM19.0088 27.0164V22.2265H33.3783V27.0164H19.0088Z" fill="#00ABCB" />
      </g>
      <defs>
        <filter
          id="filter0_d_566_183"
          x="0.0487809"
          y="0.902439"
          width="51.9024"
          height="51.9024"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1.85366" />
          <feGaussianBlur stdDeviation="3.47561" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_566_183" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_566_183" result="shape" />
        </filter>
        <filter id="filter1_i_566_183" x="19.0088" y="17.7184" width="14.3695" height="15.6597" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1.85366" />
          <feGaussianBlur stdDeviation="0.926829" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.201667 0 0 0 0 0.201667 0 0 0 0 0.201667 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_566_183" />
        </filter>
        <linearGradient id="paint0_linear_566_183" x1="8.09615" y1="13.9167" x2="37.8531" y2="22.8694" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1CDCFF" />
          <stop offset="1" stopColor="#003682" />
        </linearGradient>
      </defs>
    </svg>
  );
}
