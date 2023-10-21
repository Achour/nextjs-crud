import { Suspense } from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learn",
  description: "For learning purposes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback="Loading....">
          <div className="container py-5">
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  );
}
