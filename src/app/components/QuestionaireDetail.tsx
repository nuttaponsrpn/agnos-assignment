import { Card, Typography } from "@mui/material";
import { DictionaryQuestionaire } from "../types/Dictionary";
import { PainPoint } from "../types/QuestionaireForm";
import Abdominal from "./Abdominal";
import Finger from "./Finger";

type QuestionaireDetailProps = {
  dictionary: DictionaryQuestionaire;
  painPoint?: PainPoint;
};

export default function QuestionaireSummary({ dictionary, painPoint }: QuestionaireDetailProps) {
  return (
    <Card className="w-full h-full !overflow-y-auto !bg-transparent" elevation={2}>
      <Typography className="p-4 border-b-2 border-b-slate-200" variant="h5">
        {dictionary.painPointDiagram}
      </Typography>
      {/* <CardHeader title="Detail" /> */}
      {!!painPoint?.abdominal && (
        <div className="flex relative h-fit xl:flex-row flex-col xl:flex-1 xl:h-[calc(100%-100px)] xl:items-center">
          {/* Abdominal */}
          <div className="relative xl:absolute xl:left-[-20px]">
            <div className="h-[500px] xl:h-full">
              <Abdominal disable defaultPainPoint={painPoint?.abdominal} dictionary={dictionary} />
            </div>
          </div>

          {/* Finger */}
          <div className="relative xl:absolute xl:right-[-20px]">
            <div className="h-[500px] xl:h-full">
              <Finger disable defaultPainPoint={painPoint?.finger} dictionary={dictionary} />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
