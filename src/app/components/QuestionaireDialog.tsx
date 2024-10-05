"use client";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { PatientInformation } from "../types/PatientInformation";
import Abdominal from "./Abdominal";
import Finger from "./Finger";
import { DictionaryQuestionaire } from "../types/Dictionary";
import { AbdominalType, FingerType } from "../types/QuestionaireForm";

type QuestionaireDialogProps = {
  dictionary: DictionaryQuestionaire;
  open: boolean;
  onSubmit: (patientInfo: PatientInformation) => void;
  onClose: () => void;
};
export default function QuestionaireDialog({ dictionary, open, onClose, onSubmit }: QuestionaireDialogProps) {
  const theme = useTheme();
  const isBpBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  // State
  const [isTouch, setIsTouch] = useState(false);
  const [isConfirmName, setIsConfirmName] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>();
  const [step, setStep] = useState(0);
  const [patientInfo, setPatientInfo] = useState<PatientInformation>({
    name: "",
    painPoint: {
      abdominal: [],
      finger: [],
    },
  });

  function saveAbdominal(painPoint: AbdominalType[]) {
    if (!isConfirmName) {
      setIsTouch(true);
      setAlertMessage(dictionary.pleaseConfirmName);
      return;
    }

    setPatientInfo((prev) => ({
      ...prev,
      painPoint: { ...prev.painPoint, abdominal: painPoint },
    }));
    setStep((prev) => prev + 1);
  }

  function saveFinger(painPoint: FingerType[]) {
    const updatedPatientInfo = {
      ...patientInfo,
      painPoint: { ...patientInfo.painPoint, finger: painPoint },
    };
    setPatientInfo(updatedPatientInfo);
    onSubmit(updatedPatientInfo);
  }

  function handleConfirmName() {
    if (!patientInfo.name.trim()) return;

    setIsConfirmName(true);
    setAlertMessage("");
  }

  return (
    <Dialog
      open={open}
      aria-labelledby="add-patient-info-dialog"
      aria-describedby="patient-detail-contain-pain-location-of-abdominal-and-finger-area"
      scroll="paper"
      fullScreen={isBpBelowMd}>
      <DialogTitle id="questionaire-title-dialog" className="flex items-center justify-between gap-3 !pr-2">
        <div className="mt-auto">
          <span>{dictionary.patientInformation}</span>

          {!!isConfirmName && (
            <span className="pl-2">
              <span className="h-fit pr-3">{patientInfo.name}</span>
              <IconButton className="!p-0" onClick={() => setIsConfirmName(false)}>
                <BorderColorRoundedIcon color="success" />
              </IconButton>
            </span>
          )}
        </div>

        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent className="!py-0 flex flex-col items-center justify-center min-w-[420px] overflow-hidden">
        <div className="flex gap-3 mr-auto">
          {!isConfirmName && (
            <React.Fragment>
              <TextField
                id="patient-name"
                placeholder={dictionary.pleaseEnterName}
                variant="standard"
                value={patientInfo.name}
                error={isTouch && !patientInfo.name.trim()}
                helperText={isTouch && !patientInfo.name.trim() ? "Name can't be blank" : ""}
                onBlur={() => setIsTouch(true)}
                onChange={(val) =>
                  setPatientInfo((prev) => ({
                    ...prev,
                    name: val.target.value,
                  }))
                }
              />
              <Button className="!p-0 h-fit" onClick={handleConfirmName}>
                {dictionary.confirm}
              </Button>
            </React.Fragment>
          )}
        </div>

        {step === 0 && <Abdominal dictionary={dictionary} onSubmit={saveAbdominal} />}
        {step === 1 && <Finger dictionary={dictionary} onSubmit={saveFinger} onClickBack={() => setStep(0)} />}

        {alertMessage && (
          <Alert className="w-full p-3 absolute bottom-0" severity="error">
            {alertMessage}
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
