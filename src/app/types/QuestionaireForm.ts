export interface QuestionairePictureLocation {
  name: string;
  highlight?: string;
  description?: string;
}

export interface QuestionairePictureBaseLocation {
  name: string;
  base: string;
}

export type AbdominalType = "epigastrium" | "luq" | "llq" | "suprapubic" | "rlq" | "ruq" | "umbilicus";

export type FingerType = "dip" | "pip" | "mcp";

export interface PainPoint {
  abdominal: AbdominalType[];
  finger: FingerType[];
}
