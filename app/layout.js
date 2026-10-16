import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Anton, Montserrat } from "next/font/google";

import MuiProvider from "../components/MuiProvider";

import AnnouncementBar from "../components/navbar/AnnouncementBar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "CHŌYIFY — Wear Your Story",
  description:
    "CHŌYIFY — Contemporary fashion. Wear your story.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${montserrat.variable}`}
    >
      <body>
        <AppRouterCacheProvider>
          <MuiProvider>

            {/* GLOBAL HEADER */}
            <AnnouncementBar />
            <Navbar />

            {/* PAGE CONTENT */}
            {children}

            {/* GLOBAL FOOTER */}
            <Footer />

          </MuiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}