import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import Image from 'next/image'
import taskmasterLogo from '@/public/taskmaster-logo.png'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  title: "TaskMaster App",
  description: "Master Your Tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebas.variable}`}
      >
        <UserProvider>
          <header>
            <Image src={taskmasterLogo} alt='taskmaster-logo'/>
            <h1>Task Master</h1>
          </header>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
