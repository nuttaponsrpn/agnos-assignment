import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { DictionaryQuestionaire } from "../types/Dictionary";
import { PainPoint } from "../types/QuestionaireForm";

type QuestionaireSummaryProps = {
  dictionary: DictionaryQuestionaire;
  painPoint?: PainPoint;
};
export default function QuestionaireSummary({ dictionary, painPoint }: QuestionaireSummaryProps) {
  return (
    <Card className="w-full h-full !bg-transparent" elevation={2}>
      <CardHeader title={dictionary.summary} className="border-b-2 border-b-slate-200" />

      {!!painPoint && (
        <CardContent className="flex flex-row md:flex-col gap-12">
          <div>
            <Typography variant="h5">{dictionary.abdominal}</Typography>
            <ul>
              {!!painPoint.abdominal.length ? (
                painPoint.abdominal.map((item) => <li key={item}>- {dictionary[item]}</li>)
              ) : (
                <li>- {dictionary.noProblemFound}</li>
              )}
            </ul>
          </div>

          <div>
            <Typography variant="h5">{dictionary.finger}</Typography>
            <ul>
              {!!painPoint?.finger.length ? (
                painPoint.finger.map((item) => <li key={item}>- {dictionary[item]}</li>)
              ) : (
                <li>- {dictionary.noProblemFound}</li>
              )}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
