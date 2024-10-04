"use client";

import { Button, styled } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { DictionaryQuestionaire } from "../types/Dictionary";
import { AbdominalType, QuestionairePictureBaseLocation, QuestionairePictureLocation } from "../types/QuestionaireForm";

const abdominalBase: Readonly<QuestionairePictureBaseLocation> = { name: "base", base: "default-abs" };

const abdominalPicture: Readonly<QuestionairePictureLocation[]> = [
  { name: "epigastrium", highlight: "epigastrium-highlight", description: "epigastrium-active" },
  { name: "luq", highlight: "luq-highlight", description: "luq-active" },
  { name: "llq", highlight: "llq-highlight", description: "llq-active" },
  { name: "suprapubic", highlight: "suprapubic-highlight", description: "suprapubic-active" },
  { name: "rlq", highlight: "rlq-highlight", description: "rlq-active" },
  { name: "ruq", highlight: "ruq-highlight", description: "ruq-active" },
  { name: "umbilicus", highlight: "umbilicus-highlight", description: "umbilicus-active" },
];

type AbdominalProps = {
  dictionary: DictionaryQuestionaire;
  defaultPainPoint?: AbdominalType[];
  disable?: boolean;
  onSubmit?: (painPoint: AbdominalType[]) => void;
};

export default function Abdominal({ dictionary, defaultPainPoint = [], disable = false, onSubmit }: AbdominalProps) {
  const [mouseOverPos, setMouseOverPos] = useState(-1);
  const [painPoint, setPainPoint] = useState<AbdominalType[]>(defaultPainPoint);
  const currentPainPoint = disable ? defaultPainPoint : painPoint;

  function handleSelection(name: AbdominalType) {
    if (disable) return;

    if (painPoint.includes(name)) {
      setPainPoint((prev) => prev.filter((pName) => pName !== name));
    } else {
      setPainPoint((prev) => [...prev, name]);
    }
  }

  function handleSelectAll() {
    if (disable) return;

    if (painPoint.length === 7) {
      setPainPoint([]);
    } else {
      setPainPoint(abdominalPicture.map(({ name }) => name as AbdominalType));
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center relative aspect-auto h-full w-full md:h-[432px] md:w-[500px]">
        {/* Body-pain part selection */}
        <CircleCenter
          className={disable ? "!cursor-default" : ""}
          onMouseOver={() => setMouseOverPos(6)}
          onMouseOut={() => setMouseOverPos(-1)}
          onClick={() => handleSelection("umbilicus")}
        />
        <CircleSection>
          <ul className="circle">
            {["epigastrium", "luq", "llq", "suprapubic", "rlq", "ruq"].map((name, index) => (
              <li key={name + index} className={disable ? "!cursor-default" : ""}>
                <div
                  className="text"
                  onMouseOver={() => setMouseOverPos(index)}
                  onMouseOut={() => setMouseOverPos(-1)}
                  onClick={() => handleSelection(name as AbdominalType)}
                  id={`${name}selection`}
                />
              </li>
            ))}
          </ul>
        </CircleSection>

        <AllButton
          className={disable ? "!cursor-default" : ""}
          onMouseOver={() => setMouseOverPos(7)}
          onMouseOut={() => setMouseOverPos(-1)}
          onClick={handleSelectAll}
        />

        {/* Display image section */}
        <Image
          src={`/images/abdominal/${abdominalBase.base}.png`}
          priority
          alt={abdominalBase.name}
          className="absolute"
          style={{ objectFit: "contain" }}
          width={355}
          height={418}
        />

        <Image
          src={`/images/abdominal/all-over-highlight.png`}
          priority
          alt="all-over-highlight"
          className={`absolute z-30 
            ${(!disable && mouseOverPos === 7) || currentPainPoint.length === 7 ? "inline" : "hidden"}`}
          quality={100}
          style={{ objectFit: "contain" }}
          width={355}
          height={418}
        />
        {!!abdominalPicture.length &&
          abdominalPicture.map(({ name, highlight, description }, index) => (
            <React.Fragment key={name}>
              <Image
                src={`/images/abdominal/${description}.png`}
                priority
                alt={name}
                quality={100}
                className={`absolute opacity-45 
                      ${mouseOverPos === index ? "!opacity-100 z-20" : ""}
                      ${currentPainPoint.length === 7 ? "hidden" : "inline"}
                  `}
                style={{ objectFit: "contain" }}
                width={355}
                height={418}
              />
              <Image
                src={`/images/abdominal/${highlight}.png`}
                priority
                alt={name}
                className={`absolute z-30 ${currentPainPoint.includes(name as AbdominalType) ? "inline" : "hidden"}`}
                quality={100}
                style={{ objectFit: "contain" }}
                width={355}
                height={418}
              />
            </React.Fragment>
          ))}
      </div>

      {!!onSubmit && (
        <div className="mt-auto ml-auto mr-[-15px] p-0.5 pb-1 z-10">
          <Button onClick={() => onSubmit(painPoint)}>{dictionary.next}</Button>
        </div>
      )}
    </>
  );
}

const CircleCenter = styled("div")`
  z-index: 50;
  cursor: pointer;
  position: relative;
  padding: 0;
  margin: 1em auto;
  width: 2.5em;
  height: 2.5em;
  top: 11px;
  right: 7px;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
`;

const CircleSection = styled("div")`
  z-index: 40;
  position: absolute;

  .circle {
    position: relative;
    padding: 0;
    margin: 1em auto;
    width: 10em;
    height: 10em;
    top: 11px;
    right: 7px;
    border-radius: 50%;
    list-style: none;
    overflow: hidden;
  }
  li {
    cursor: pointer;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    transform-origin: 0% 100%;
  }
  .text {
    position: absolute;
    left: -100%;
    width: 300%;
    height: 200%;
    text-align: center;
    -webkit-transform: skewY(60deg) rotate(15deg);
    -ms-transform: skewY(60deg) rotate(15deg);
    transform: skewY(60deg) rotate(15deg);
    padding-top: 20px;
  }

  li:first-child {
    -webkit-transform: rotate(-24deg) skewY(-41deg);
    -ms-transform: rotate(-24deg) skewY(-41deg);
    transform: rotate(-24deg) skewY(-41deg);
  }
  li:nth-child(2) {
    -webkit-transform: rotate(32deg) skewY(-34deg);
    -ms-transform: rotate(32deg) skewY(-34deg);
    transform: rotate(32deg) skewY(-34deg);
  }
  li:nth-child(3) {
    -webkit-transform: rotate(96deg) skewY(-37deg);
    -ms-transform: rotate(96deg) skewY(-37deg);
    transform: rotate(96deg) skewY(-37deg);
  }
  li:nth-child(4) {
    -webkit-transform: rotate(157deg) skewY(-46deg);
    -ms-transform: rotate(157deg) skewY(-46deg);
    transform: rotate(157deg) skewY(-46deg);
  }
  li:nth-child(5) {
    -webkit-transform: rotate(207deg) skewY(-34deg);
    -ms-transform: rotate(207deg) skewY(-34deg);
    transform: rotate(207deg) skewY(-34deg);
  }
  li:nth-child(6) {
    -webkit-transform: rotate(271deg) skewY(-31deg);
    -ms-transform: rotate(271deg) skewY(-31deg);
    transform: rotate(271deg) skewY(-31deg);
  }
`;

const AllButton = styled("div")`
  z-index: 40;
  cursor: pointer;
  width: 115px;
  height: 36px;
  border-radius: 30px;
  position: absolute;
  margin-top: 348px;
  margin-right: 14px;
`;
