import { Suspense } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learn",
  description: "For learning purposes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative container py-5">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
