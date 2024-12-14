"use client";

import base58 from "bs58";
import { toast } from "sonner";
import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { Copy, Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WalletConverter() {
    const [keypairInput, setKeypairInput] = useState("");
    const [walletInfo, setWalletInfo] = useState<{
        publicKey?: string;
        privateKey?: string;
        privateKeyArray?: string;
        balance?: string;
    }>({});
    const [, setError] = useState("");
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(field);
            toast.success("Copied to clipboard!");

            // Reset copied state after 2 seconds
            setTimeout(() => {
                setCopiedField(null);
            }, 2000);
        }).catch(err => {
            toast.error("Failed to copy");
            console.error("Copy failed", err);
        });
    };

    const generateNewKeypair = () => {
        try {
            const keypair = Keypair.generate();
            const publicKey = keypair.publicKey.toBase58();
            const privateKey = base58.encode(keypair.secretKey);
            const privateKeyArray = JSON.stringify(Array.from(keypair.secretKey));

            setWalletInfo({
                publicKey,
                privateKey,
                privateKeyArray
            });
            setKeypairInput("");
            setError("");
            toast.success("New keypair generated successfully!");
        } catch (err) {
            toast.error("Failed to generate keypair");
            console.error(err);
        }
    };

    const convertKeypair = () => {
        try {
            // Try to convert from different input formats
            let keypair: Keypair;

            // Try base58 private key
            try {
                const secretKey = base58.decode(keypairInput.trim());
                keypair = Keypair.fromSecretKey(secretKey);
            } catch {
                // If base58 fails, try direct secret key input
                const secretKey = new Uint8Array(JSON.parse(keypairInput));
                keypair = Keypair.fromSecretKey(secretKey);
            }

            const publicKey = keypair.publicKey.toBase58();
            const privateKey = base58.encode(keypair.secretKey);
            const privateKeyArray = JSON.stringify(Array.from(keypair.secretKey));

            setWalletInfo({
                publicKey,
                privateKey,
                privateKeyArray
            });
            setError("");
            toast.success("Keypair converted successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Invalid keypair format. Please provide a valid private key.");
            setWalletInfo({});
        }
    };

    const clearWalletInfo = () => {
        setWalletInfo({});
        setKeypairInput("");
        toast.success("Wallet information cleared!");
    };

    const renderCopyButton = (text: string, field: string) => (
        <Button
            size="icon"
            variant="outline"
            className="absolute top-1 right-1"
            onClick={() => copyToClipboard(text, field)}
        >
            {copiedField === field ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
    );

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Toaster richColors />
            <Card>
                <CardHeader>
                    <CardTitle>Decrypt Solana Keypair</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="generate" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="generate">Generate Keypair</TabsTrigger>
                            <TabsTrigger value="convert">Convert Keypair</TabsTrigger>
                        </TabsList>

                        <TabsContent value="generate">
                            <div className="space-y-4">
                                <Button onClick={generateNewKeypair} className="w-full">
                                    Generate New Keypair
                                </Button>

                                {walletInfo.publicKey && (
                                    <>
                                        <div className="space-y-2 relative">
                                            <Label className="font-semibold">Public Key</Label>
                                            <div className="relative">
                                                <Textarea
                                                    rows={2}
                                                    readOnly
                                                    className="w-full pr-10"
                                                    value={walletInfo.publicKey}
                                                />
                                                {renderCopyButton(walletInfo.publicKey, 'publicKey')}
                                            </div>

                                            <Label className="font-semibold">Private Key (Base58)</Label>
                                            <div className="relative">
                                                <Textarea
                                                    rows={2}
                                                    readOnly
                                                    className="w-full pr-10"
                                                    value={walletInfo.privateKey}
                                                />
                                                {renderCopyButton(walletInfo.privateKey!, 'privateKey')}
                                            </div>

                                            <Label className="font-semibold">Private Key (JSON Array)</Label>
                                            <div className="relative">
                                                <Textarea
                                                    rows={4}
                                                    readOnly
                                                    className="w-full pr-10"
                                                    value={walletInfo.privateKeyArray}
                                                />
                                                {renderCopyButton(walletInfo.privateKeyArray!, 'privateKeyArray')}
                                            </div>
                                        </div>
                                        <Button
                                            onClick={clearWalletInfo}
                                            variant="destructive"
                                            className="w-full mt-2"
                                        >
                                            <X className="mr-2 h-4 w-4" /> Clear Wallet Information
                                        </Button>
                                    </>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="convert">
                            <div className="space-y-4">
                                <Textarea
                                    rows={4}
                                    className="w-full"
                                    value={keypairInput}
                                    onChange={(e) => setKeypairInput(e.target.value)}
                                    placeholder="Enter your private key (Base58 or JSON array)"
                                />

                                <Button onClick={convertKeypair} className="w-full">
                                    Convert Keypair
                                </Button>

                                {walletInfo.publicKey && (
                                    <>
                                        <div className="space-y-2 relative">
                                            <Label className="font-semibold">Public Key</Label>
                                            <div className="relative">
                                                <Textarea
                                                    rows={2}
                                                    readOnly
                                                    className="w-full pr-10"
                                                    value={walletInfo.publicKey}
                                                />
                                                {renderCopyButton(walletInfo.publicKey, 'publicKey')}
                                            </div>

                                            <Label className="font-semibold">Private Key (Base58)</Label>
                                            <div className="relative">
                                                <Textarea
                                                    rows={2}
                                                    readOnly
                                                    className="w-full pr-10"
                                                    value={walletInfo.privateKey}
                                                />
                                                {renderCopyButton(walletInfo.privateKey!, 'privateKey')}
                                            </div>

                                            <Label className="font-semibold">Private Key (JSON Array)</Label>
                                            <div className="relative">
                                                <Textarea
                                                    rows={4}
                                                    readOnly
                                                    className="w-full pr-10"
                                                    value={walletInfo.privateKeyArray}
                                                />
                                                {renderCopyButton(walletInfo.privateKeyArray!, 'privateKeyArray')}
                                            </div>
                                        </div>
                                        <Button
                                            onClick={clearWalletInfo}
                                            variant="destructive"
                                            className="w-full mt-2"
                                        >
                                            <X className="mr-2 h-4 w-4" /> Clear Wallet Information
                                        </Button>
                                    </>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
