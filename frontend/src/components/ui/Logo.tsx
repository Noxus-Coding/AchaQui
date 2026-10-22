import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
}

export function Logo({
  variant = "default",
  size = "md",
  clickable = true,
}: LogoProps) {
  const sizes = {
    sm: {
      icon: 16,
      container: "h-8 w-8",
      text: "text-lg",
    },
    md: {
      icon: 22,
      container: "h-10 w-10",
      text: "text-2xl",
    },
    lg: {
      icon: 28,
      container: "h-12 w-12",
      text: "text-3xl",
    },
  };

  const currentSize = sizes[size];

  const content = (
    <div className="inline-flex items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-xl ${currentSize.container} ${
          variant === "light"
            ? "bg-white/15 text-white"
            : "bg-achaqui-green text-white"
        }`}
      >
        <MapPin size={currentSize.icon} />
      </div>

      <span
        className={`font-bold ${currentSize.text} ${
          variant === "light"
            ? "text-white"
            : "text-achaqui-text"
        }`}
      >
        Acha<span className="text-achaqui-orange">Qui</span>
      </span>
    </div>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link to="/" aria-label="AchaQui — Página inicial">
      {content}
    </Link>
  );
}