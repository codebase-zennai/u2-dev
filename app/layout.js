import "./globals.css";

export const metadata = {
  title: "Elysian Tennis Academy",
  description: "World-class tennis facilities and coaching for players of all levels",
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
