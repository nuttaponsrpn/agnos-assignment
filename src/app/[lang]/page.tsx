"use client";

import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const countdown = useRef(10);
  const [displayCountdown, setDisplaycountdown] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown.current === 0) {
        window.location.href += "/questionaire";
        return;
      }

      countdown.current -= 1;
      setDisplaycountdown(countdown.current);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className={`
        grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20
        font-[family-name:var(--font-geist-sans)]
      `}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="!pb-20">
          <Button
            variant="text"
            onClick={() => {
              window.location.href += "/questionaire";
            }}
            disableElevation
          >
            <Image src="/assets/logo.webp" height={57} width={152} alt="Logo" />
          </Button>
          <Typography variant="h5"> Countdown : {displayCountdown}</Typography>
        </div>
      </main>
    </div>
  );
}
