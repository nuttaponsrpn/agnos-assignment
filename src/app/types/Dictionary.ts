export interface DictionaryMenu {
  no: number;
  title: string;
  subtitle: Subtitle[];
  link?: string;
}

interface Subtitle {
  title: string;
  link: string;
}

export interface DictionaryQuestionaire {
  patientList: string;
  summary: string;
  painPointDiagram: string;
  abdominal: string;
  finger: string;
  addNewPatient: string;
  noProblemFound: string;

  patientInformation: string;
  confirm: string;
  next: string;
  back: string;
  save: string;
  pleaseEnterName: string;
  pleaseConfirmName: string;

  epigastrium: string;
  luq: string;
  llq: string;
  suprapubic: string;
  rlq: string;
  ruq: string;
  umbilicus: string;

  pip: string;
  dip: string;
  mcp: string;
}
