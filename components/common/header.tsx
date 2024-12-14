"use client";

import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
    return (
        <header className="w-full bg-secondary/20 border-b">
            <div className="py-4 w-full max-w-[95vw] mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="select-none flex">
                        <h1 className="text-2xl">Decrypt Solana Keypair</h1>
                    </Link>

                    <div className="flex space-x-4 items-center">
                        <div className="max-sm:hidden sm:hidden md:block lg:block xl:block 2xl:block">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}