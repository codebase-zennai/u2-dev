import "./globals.css";

export const metadata = {
  title: "U2 Tours & Travels - Going Beyond Borders!",
  description: "Personalized travel services with 25+ years of experience. Malaysian tours, world tours, and transportation services tailored to your needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
