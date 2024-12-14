import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
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
    description: "Solana Keypair Decryptor is a secure, client-side web application designed to help you generate and convert Solana wallet keypairs easily and safely. With a user-friendly interface, you can generate new keypairs or convert existing private keys between different formats.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* google Analytics */}
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-STJSQYCPW6"></Script>
                <Script id="google-analytics">
                    {
                        `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-STJSQYCPW6');
                        `
                    }
                </Script>
            </head>
            <body className={cn(geistSans.variable, geistMono.variable, "antialiased select-none")}>
                <ThemeProvider
                    enableSystem
                    attribute="class"
                    defaultTheme="light"
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
