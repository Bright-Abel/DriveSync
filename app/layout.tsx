import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ReactToast";
import { Providers } from "@/providers/ThemeProvider";
import ReduxProvider from "@/providers/redux-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DriveSync",
  description:
    "DriveSync - A cloud-based document storage platform, similar to Google Drive, that allows users to securely upload, manage, and access their documents from anywhere. Built with Next.js, Appwrite, and Tailwind CSS, it ensures a seamless and intuitive experience",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-poppins antialiased container h-full bg-white dark:bg-dark_1-200`}
      >
        <Providers>
          <ReduxProvider>
            <ToastProvider>{children}</ToastProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
