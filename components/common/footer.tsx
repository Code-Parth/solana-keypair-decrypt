"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon, TwitterIcon } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-secondary/10 border-t py-4 mt-4">
            <div className="w-full max-w-[95vw] mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-md text-muted-foreground">
                        Solana Keypair Decryptor — {new Date().getFullYear()}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            rel="noopener noreferrer"
                            className="flex text-md items-center hover:text-primary transition-colors"
                            onClick={() => { window.open("https://github.com/Code-Parth/solana-keypair-decrypt/blob/main/privacy-policy.md", "_blank"); }}
                        >
                            Privacy Policy
                        </Button>
                        <Button
                            variant="outline"
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-primary transition-colors"
                            onClick={() => { window.open("https://github.com/Code-Parth/solana-keypair-decrypt", "_blank"); }}
                        >
                            <GithubIcon className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-primary transition-colors"
                            onClick={() => { window.open("https://x.com/Code_Parth", "_blank"); }}
                        >
                            <TwitterIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
