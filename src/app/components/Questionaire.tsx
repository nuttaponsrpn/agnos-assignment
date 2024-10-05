"use client";

import QuestionaireDetail from "@/app/components/QuestionaireDetail";
import PatientList from "@/app/components/QuestionairePatientList";
import QuestionaireSummary from "@/app/components/QuestionaireSummary";
import { PatientInformation } from "@/app/types/PatientInformation";
import { useState } from "react";
import { DictionaryQuestionaire } from "../types/Dictionary";

type QuestionaireProps = {
  dictionary: DictionaryQuestionaire;
};

export default function Questionaire({ dictionary }: QuestionaireProps) {
  const [patientInfo, setPatientInfo] = useState<PatientInformation>();

  return (
    <div className={`h-full grid md:grid-cols-12 md:grid-rows-6 gap-3`}>
      {/* Patient List */}
      <div
        className={`
          col-start-1 md:row-span-6 col-span-12 md:col-start-1 md:col-span-3 xl:col-start-1 xl:col-span-2 max-h-96
          md:max-h-full
        `}
      >
        <PatientList dictionary={dictionary} onSelectPatient={setPatientInfo} />
      </div>

      {/* Questionaire */}
      <div
        className={`
          col-start-1 sm:row-span-1 md:row-span-6 col-span-12 md:col-start-4 md:col-span-3 xl:col-start-3 xl:col-span-2
        `}
      >
        <QuestionaireSummary dictionary={dictionary} painPoint={patientInfo?.painPoint} />
      </div>

      {/* Questionaire Detail */}
      <div
        className={`
          col-start-1 row-span-6 md:row-span-6 col-span-12 md:col-start-7 md:col-span-6 xl:col-start-5 xl:col-span-8
        `}
      >
        <QuestionaireDetail dictionary={dictionary} painPoint={patientInfo?.painPoint} />
      </div>
    </div>
  );
}
