import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { headers } from "next/headers";
import Image from "next/image";
import { getDictionary } from "./[lang]/dictionaries/dictionaries";
import { SUPPORT_LANG } from "./[lang]/dictionaries/localse";
import Header from "./components/Header";
import "./globals.css";
import theme from "./theme";
import { DictionaryMenu } from "./types/Dictionary";
import MedicalBG from "/public/assets/bg.webp";
import { Metadata } from "next";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Agnos Candidate Assignment",
  description:
    "This assignment using for testing at Agnos company to prove skill that meet business requirement satisfaction, code quality, and document clarity",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerLists = headers();
  const pathname = headerLists.get("pathname");
  const locale = (pathname?.match(/^\/([^\/]+)/)?.[1] as SUPPORT_LANG) || "th";
  const menu = (await getDictionary(locale)).menu as DictionaryMenu[];

  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="!px-0 flex flex-col h-[100vh] w-full">
              {/* Header */}
              <Header dictionary={menu} pathname={pathname} />

              {/* Children */}
              <main className="px-8 py-4 flex-1 relative md:overflow-hidden z-10">{children}</main>
            </div>

            {/* Background image */}
            <div className="absolute bottom-0 block w-full h-80 z-0">
              <div className="relative w-full h-full">
                <Image src={MedicalBG} alt="background" className="w-full h-80 relative z-0" />
              </div>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
