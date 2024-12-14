import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Decrypt Solana Keypair",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(geistSans.variable, geistMono.variable, "antialiased select-none")}>
                <ThemeProvider
                    enableSystem
                    attribute="class"
                    defaultTheme="system"
                >
                    <main className="flex flex-col justify-between min-h-screen">
                        <Header />
                        {children}
                        <Footer />
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
