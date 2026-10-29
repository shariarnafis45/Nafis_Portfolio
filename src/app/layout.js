import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import { Providers } from "@/provider/ThemeProvider";
import Footer from "@/components/shared/Footer";
import ContactDock from "@/components/ui/ContactDock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shariar Nafis | Junior Full Stack Developer",
  description:
    "Portfolio of Shariar Nafis, a Junior Full Stack Developer building MERN and Next.js web apps. Open to junior roles and freelance projects.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#0A0A0A] focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] dark:focus:bg-white dark:focus:text-[#0A0A0A] dark:focus:ring-emerald-600 dark:focus:ring-offset-white"
          >
            Skip to main content
          </a>
          <NavBar />
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <ContactDock />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
