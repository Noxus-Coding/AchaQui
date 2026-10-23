
export function RegionalArt() {
  return (
    <svg
      viewBox="0 0 600 520"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Ilustração inspirada nos monólitos de Quixadá"
    >
      <defs>
        <linearGradient id="landing-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9CB7D" />
          <stop offset="100%" stopColor="#F9E5B9" />
        </linearGradient>
      </defs>

      <rect width="600" height="520" fill="url(#landing-sky)" />

      <circle
        cx="490"
        cy="110"
        r="55"
        fill="#FFE5A0"
        opacity="0.9"
      />

      <path
        d="M70 365
           C40 300 100 263 148 225
           C200 185 215 120 285 150
           C335 175 310 230 300 275
           C290 320 350 330 370 365 Z"
        fill="#884A30"
      />

      <path
        d="M310 365
           C305 325 345 290 380 270
           C413 245 425 198 477 203
           C544 208 530 279 525 310
           C520 339 564 345 580 365 Z"
        fill="#754430"
      />

      <path
        d="M205 170 C240 155 276 175 290 205"
        fill="none"
        stroke="#C98A52"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.8"
      />

      <path
        d="M0 345 Q100 310 180 350 T360 352 T600 330
           V520 H0 Z"
        fill="#C88D52"
      />

      <path
        d="M0 395 Q95 370 185 400 T365 410 T600 390
           V520 H0 Z"
        fill="#E3B074"
      />

      <path
        d="M0 425 Q90 390 190 435 T390 438 T600 405
           V520 H0 Z"
        fill="#76845A"
      />

      <path
        d="M0 468 Q100 430 220 475 T440 465 T600 440
           V520 H0 Z"
        fill="#4F6E4C"
      />

      <path
        d="M0 505 Q160 470 290 500 T600 480
           V520 H0 Z"
        fill="#38583E"
      />

      <g stroke="#375E42" strokeWidth="6" fill="none">
        <path d="M38 470 V423 M38 447 L15 432 M38 438 L58 415" />
        <path d="M558 457 V410 M558 434 L535 420 M558 429 L580 403" />
      </g>
    </svg>
  );
}
