import Questionaire from "@/app/components/Questionaire";
import { DictionaryQuestionaire } from "@/app/types/Dictionary";
import { headers } from "next/headers";
import { getDictionary } from "../dictionaries/dictionaries";
import { SUPPORT_LANG } from "../dictionaries/localse";

export default async function Page() {
  const headerLists = headers();
  const pathname = headerLists.get("pathname");
  const locale = (pathname?.match(/^\/([^\/]+)/)?.[1] as SUPPORT_LANG) || "th";
  const dictionary = (await getDictionary(locale)).questionaire as DictionaryQuestionaire;

  return <Questionaire dictionary={dictionary} />;
}
