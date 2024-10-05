"use client";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { DictionaryQuestionaire } from "../types/Dictionary";
import { PatientInformation } from "../types/PatientInformation";
import QuestionaireDialog from "./QuestionaireDialog";

type QuestionairePatientListProps = {
  dictionary: DictionaryQuestionaire;
  onSelectPatient: (patientInfo: PatientInformation) => void;
};

export default function QuestionairePatientList({ dictionary, onSelectPatient }: QuestionairePatientListProps) {
  // State
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [patientList, setPatientList] = useState<PatientInformation[]>([]);

  useEffect(() => {
    const paitentInfoLS = window.localStorage.getItem("patientList");
    if (!paitentInfoLS) {
      setIsOpenDialog(true);
      return;
    }

    const parsePatientInfo: PatientInformation[] = JSON.parse(paitentInfoLS);
    if (!parsePatientInfo.length) return;

    setPatientList(parsePatientInfo);
    onSelectPatient(parsePatientInfo[0]);
  }, [onSelectPatient]);

  function saveQuestionaire(patientInfo: PatientInformation) {
    setIsOpenDialog(false);
    onSelectPatient(patientInfo);
    window.localStorage.setItem("patientList", JSON.stringify([...patientList, patientInfo]));

    if (patientList.find(({ name }) => name === patientInfo.name)) {
      setPatientList((prev) => prev.map((item) => (item.name === patientInfo.name ? { ...item, patientInfo } : item)));
    } else {
      setPatientList((prev) => [...prev, patientInfo]);
    }

    flushSync(() => {
      setSelectedIndex(patientList.length);
    });
  }

  function generateColor(str: string) {
    let hash = 0;
    str.split("").forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, "0");
    }
    return colour;
  }

  function selectPatient(index: number, patientInfo: PatientInformation) {
    setSelectedIndex(index);
    onSelectPatient(patientInfo);
  }

  return (
    <Card className="w-full h-full flex flex-col relative overflow-hidden" elevation={2}>
      <CardHeader className="border-b-2 border-b-slate-200 z-20" title={dictionary.patientList} />
      <List className="overflow-auto">
        {patientList.map(({ name, painPoint }, index) => (
          <ListItem disablePadding key={name}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => selectPatient(index, { name, painPoint })}
            >
              <ListItemIcon>
                <Avatar alt={name} sx={{ bgcolor: generateColor(name) }}>
                  {name.charAt(0)}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <CardActions
        disableSpacing
        className={`
          md:mt-auto z-30 bg-transparent mx-auto md:border-t-2 border-t-slate-200 w-full absolute md:relative
          !justify-end md:!justify-center mt-2
        `}
      >
        <Button aria-label="add new patient" className="flex gap-2 md:w-full" onClick={() => setIsOpenDialog(true)}>
          <AddCircleRoundedIcon color="primary" /> <span>{dictionary.addNewPatient}</span>
        </Button>
      </CardActions>
      {isOpenDialog && (
        <QuestionaireDialog
          dictionary={dictionary}
          open={true}
          onClose={() => setIsOpenDialog(false)}
          onSubmit={saveQuestionaire}
        />
      )}
    </Card>
  );
}
