"use client";

import { Button, styled } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { DictionaryQuestionaire } from "../types/Dictionary";
import { FingerType, QuestionairePictureBaseLocation, QuestionairePictureLocation } from "../types/QuestionaireForm";

const fingerBase: Readonly<QuestionairePictureBaseLocation> = {
  name: "base",
  base: "default-finger",
};

const fingerPicture: Readonly<QuestionairePictureLocation[]> = [
  { name: "dip", highlight: "dip-highlight", description: "dip-active" },
  { name: "pip", highlight: "pip-highlight", description: "pip-active" },
  { name: "mcp", highlight: "mcp-highlight", description: "mcp-active" },
];

type FingerProps = {
  dictionary: DictionaryQuestionaire;
  defaultPainPoint?: FingerType[];
  disable?: boolean;
  onSubmit?: (painPoint: FingerType[]) => void;
  onClickBack?: () => void;
};

export default function Finger({
  dictionary,
  defaultPainPoint = [],
  disable = false,
  onSubmit,
  onClickBack,
}: FingerProps) {
  const [mouseOverPos, setMouseOverPos] = useState(-1);
  const [painPoint, setPainPoint] = useState<FingerType[]>(defaultPainPoint);
  const currentPainPoint = disable ? defaultPainPoint : painPoint;

  function handleSelection(name: FingerType) {
    if (disable) return;

    if (painPoint.includes(name)) {
      setPainPoint((prev) => prev.filter((pName) => pName !== name));
    } else {
      setPainPoint((prev) => [...prev, name]);
    }
  }

  function handleSelectAll() {
    if (disable) return;

    if (painPoint.length === 3) {
      setPainPoint([]);
    } else {
      setPainPoint(fingerPicture.map(({ name }) => name as FingerType));
    }
  }

  return (
    <>
      <div
        className={`
          flex flex-col items-center justify-center relative aspect-auto h-full w-full md:h-[432px] md:w-[500px]
        `}
      >
        {/* Dip selection */}
        <DipSection
          className={disable ? "!cursor-default" : ""}
          onClick={() => handleSelection("dip")}
          onMouseOut={() => setMouseOverPos(-1)}
          onMouseOver={() => setMouseOverPos(0)}
        />

        {/* Pip selection */}
        <PipSection
          className={disable ? "!cursor-default" : ""}
          onClick={() => handleSelection("pip")}
          onMouseOut={() => setMouseOverPos(-1)}
          onMouseOver={() => setMouseOverPos(1)}
        />

        {/* Mcp selection */}
        <McpSection
          className={disable ? "!cursor-default" : ""}
          onClick={() => handleSelection("mcp")}
          onMouseOut={() => setMouseOverPos(-1)}
          onMouseOver={() => setMouseOverPos(2)}
        />

        <AllButton
          className={`
            ${disable ? "!cursor-default" : ""}
          `}
          onClick={handleSelectAll}
          onMouseOut={() => setMouseOverPos(-1)}
          onMouseOver={() => setMouseOverPos(4)}
        />

        {/* Display image section */}
        <Image
          priority
          alt={fingerBase.name}
          className="absolute"
          height={418}
          src={`/images/finger/${fingerBase.base}.png`}
          style={{ objectFit: "contain" }}
          width={355}
        />

        <Image
          priority
          alt="others-highlight"
          height={418}
          quality={100}
          src={`/images/finger/others-highlight.png`}
          style={{ objectFit: "contain" }}
          width={355}
          className={`
            absolute z-30
            ${!disable && (mouseOverPos === 4 || currentPainPoint.length === 3) ? "inline" : "hidden"}
          `}
        />
        {!!fingerPicture.length &&
          fingerPicture.map(({ name, highlight, description }, index) => (
            <React.Fragment key={name}>
              <Image
                priority
                alt={name}
                height={418}
                quality={100}
                src={`/images/finger/${description}.png`}
                style={{ objectFit: "contain" }}
                width={355}
                className={`
                  absolute opacity-45
                  ${mouseOverPos === index ? "!opacity-100 z-20" : ""}
                  ${currentPainPoint.length === 3 ? "hidden" : "inline"}
                `}
              />
              <Image
                priority
                alt={name}
                height={418}
                quality={100}
                src={`/images/finger/${highlight}.png`}
                style={{ objectFit: "contain" }}
                width={355}
                className={`
                  absolute z-30
                  ${currentPainPoint.includes(name as FingerType) ? "inline" : "hidden"}
                `}
              />
            </React.Fragment>
          ))}
      </div>

      {!!onSubmit && (
        <div className="mt-auto  mr-[-15px] p-0.5 pb-1 justify-between flex w-full">
          <Button onClick={onClickBack}>{dictionary.back}</Button>
          <Button onClick={() => onSubmit(painPoint)}>{dictionary.save}</Button>
        </div>
      )}
    </>
  );
}

const DipSection = styled("div")`
  cursor: pointer;
  z-index: 40;
  position: relative;
  top: -94px;
  right: 12px;
  width: 7em;
  height: 2em;
  transform: rotate(-5deg);
  padding: 0;
  margin: 1em auto;
  border-radius: 10px;

  :after {
    content: " ";
    position: absolute;
    border-radius: 50%;
    left: -44px;
    top: 50px;
    width: 1.5em;
    height: 1.25em;
  }
`;

const PipSection = styled(DipSection)`
  top: -112px;
  right: 8px;
  width: 6.75em;
  height: 1.8em;
  transform: rotate(-5deg);

  :after {
    content: " ";
    left: -34px;
    top: 36px;
  }

  :before {
    content: " ";
    position: absolute;
    border-radius: 11px;
    right: -67px;
    top: 95px;
    width: 1.8em;
    height: 1.3em;
    transform: rotate(50deg);
  }
`;

const McpSection = styled(DipSection)`
  top: -111px;
  width: 9em;
  transform: rotate(-10deg);

  :after {
    content: none;
  }
  :before {
    content: " ";
    position: absolute;
    border-radius: 11px;
    right: -20px;
    top: 85px;
    width: 1.8em;
    height: 1.3em;
    transform: rotate(50deg);
  }
`;

const AllButton = styled("div")`
  z-index: 40;
  cursor: pointer;
  width: 246px;
  height: 36px;
  border-radius: 30px;
  position: absolute;
  margin-top: 370px;
  margin-right: 8px;
`;
