import "server-only";

type SUPPORT_LANG = "th" | "en";

const dictionaries = {
  th: () => import("./th.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

export const getDictionary = async (locale: SUPPORT_LANG) =>
  dictionaries[["th", "en"].includes(locale) ? locale : "th"]();
