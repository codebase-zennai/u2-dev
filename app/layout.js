import { Caveat } from "next/font/google";
import "./globals.css";
import PreloaderWrapper from "@/components/layout/PreloaderWrapper";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata = {
  title: "U2 Travels & Tours - Going Beyond Borders!",
  description:
    "Personalized travel services with 25+ years of experience. Malaysian tours, world tours, and transportation services tailored to your needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={caveat.variable}>
        <PreloaderWrapper>{children}</PreloaderWrapper>
      </body>
    </html>
  );
}
