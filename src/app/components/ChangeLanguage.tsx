"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";
import { locales, SUPPORT_LANG } from "../[lang]/dictionaries/localse";

export default function ChangeLanguage({ pathname }: { pathname?: string | null }) {
  const locale = useMemo(() => (pathname?.match(/^\/([^\/]+)/)?.[1] as SUPPORT_LANG) || "th", [pathname]);
  const restPath = useMemo(() => pathname?.replace("/th", "").replace("/en", "") || "", [pathname]);
  const hasLocale = locales.includes(locale);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative">
      <div
        aria-haspopup="true"
        aria-owns={!!anchorEl ? "mouse-over-popover" : undefined}
        className="group flex gap-3 cursor-pointer items-center justify-center"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Image
          alt={`lanuage ${!hasLocale || locale === "th" ? "th" : "en"}`}
          className="aspect-square w-6 h-4"
          height={12}
          src={`/assets/${!hasLocale || locale === "th" ? "th" : "en"}.webp`}
          width={50}
        />

        <IconButton disableRipple className="!p-0 group-hover:rotate-180">
          <KeyboardArrowDownIcon style={{ fontSize: "1.75rem" }} />
        </IconButton>
      </div>

      {anchorEl && (
        <div
          className={`
            absolute w-[80px] p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800
            dark:border-gray-700
          `}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {locales.map((lng) => (
            <div className="last:pt-2" key={lng}>
              <a
                className={`flex gap-3`}
                href={`${lng === "th" ? (restPath ? "" : "/") : `/${lng}`}${restPath}`}
                key={lng}
              >
                <Image
                  priority
                  alt={`lanuage ${lng}`}
                  className="aspect-square w-6 h-4"
                  height={12}
                  src={`/assets/${lng}.webp`}
                  width={50}
                />
                {lng.toUpperCase()}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
