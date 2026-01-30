import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Engineering Portfolio",
  description: "Showcase of engineering projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
