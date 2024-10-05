"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DictionaryMenu } from "../types/Dictionary";
import ChangeLanguage from "./ChangeLanguage";
import { StyledMenu } from "./HeaderStyled";

type HeaderProps = {
  dictionary: DictionaryMenu[];
  pathname?: string | null;
};

export default function Header({ dictionary, pathname }: HeaderProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const theme = useTheme();
  const isBpUpXl = useMediaQuery(theme.breakpoints.up(1380));

  useEffect(() => {
    if (isBpUpXl) {
      setIsOpenMenu(false);
    }
  }, [isBpUpXl]);

  return (
    <header className="p-0 xl:px-8 bg-white xl:bg-[#c6dcff] shadow-md">
      <section
        className={`${isOpenMenu ? "h-screen" : ""}
          w-full flex flex-col items-center pt-4 z-[99] pb-4 xl:h-fit xl:relative bg-white xl:bg-transparent
        `}
      >
        <nav className="relative z-50 flex w-full items-center justify-between gap-6">
          <Image priority alt="logo" height={57} src="/assets/logo.webp" width={152} />

          <StyledMenu className={!isBpUpXl && !isOpenMenu ? "hidden" : "block"}>
            <div
              className={`
                col-xs-12 col-sm-10 col-md-8 col-lg-6 header-nav xl:border-none border border-b-gray-500 rounded-md z-20
              `}
            >
              {isOpenMenu && (
                <div className="flex w-full bg-white">
                  <IconButton className="!m-2 !ml-auto" onClick={() => setIsOpenMenu(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </div>
              )}
              <ul className="m-4 shadow-md xl:m-0 xl:shadow-none xl:block">
                {dictionary.map(({ no, title, subtitle, link }) => (
                  <li
                    key={no}
                    className={`
                      flex flex-col items-center gap-1 relative p-2 whitespace-nowrap xl:flex-row-reverse group
                      transition-all
                    `}
                  >
                    {subtitle.length > 0 && (
                      <div>
                        <IconButton disableRipple className={`!p-0 group-hover:rotate-180`}>
                          <KeyboardArrowDownIcon style={{ fontSize: "1.75rem" }} />
                        </IconButton>
                      </div>
                    )}
                    <a
                      href={link || "#"}
                      title={title}
                      className={`
                        header-nav-link header-nav-top-link before:h-0 before:block before:content-[attr(title)]
                        before:font-bold before:overflow-hidden before:invisible
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {title}
                    </a>
                    <ul
                      className={`
                        rounded-md group-hover:mb-4 xl:group-hover:mb-0
                        ${
                          !!subtitle.length
                            ? `
                              group-hover:py-3 group-hover:isolate group-hover:aspect-videogroup-hover:rounded-xl
                              group-hover:bg-white/20 group-hover:shadow-md group-hover:ring-1 group-hover:ring-black/5
                              group-hover:backdrop-blur-lg
                            `
                            : "mb-2"
                        }
                      `}
                    >
                      {subtitle.map(({ title: subTitle, link: subLink }) => (
                        <li className="border-b border-solid" key={subTitle}>
                          <a
                            href={subLink || "#"}
                            target="_blank"
                            title={subTitle}
                            className={`
                              header-nav-link header-nav-sub-link before:h-0 before:block before:content-[attr(title)]
                              before:font-bold before:overflow-hidden before:invisible !w-fit
                            `}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {subTitle}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </StyledMenu>

          <div className="flex gap-3">
            <ChangeLanguage pathname={pathname} />

            <IconButton
              disableRipple
              className={`!p-0 xl:!hidden z-10 !mx-3`}
              color="primary"
              onClick={() => setIsOpenMenu((prev) => !prev)}
            >
              <MenuRoundedIcon className="aspect-square !text-3xl " />
            </IconButton>
          </div>
        </nav>
      </section>
    </header>
  );
}
