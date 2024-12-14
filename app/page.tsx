"use client";

import base58 from "bs58";
import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
    const [error, setError] = useState("");

    const generateNewKeypair = () => {
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
        } catch (err) {
            console.error(err);
            setError("Invalid keypair format. Please provide a valid private key.");
            setWalletInfo({});
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Solana Wallet Key Converter</CardTitle>
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
                                    <div className="space-y-2">
                                        <Label>Public Key</Label>
                                        <Input
                                            readOnly
                                            className="w-full"
                                            value={walletInfo.publicKey}
                                        />

                                        <Label>Private Key (Base58)</Label>
                                        <Textarea
                                            readOnly
                                            className="w-full"
                                            value={walletInfo.privateKey}
                                        />

                                        <Label>Private Key (JSON Array)</Label>
                                        <Textarea
                                            rows={4}
                                            readOnly
                                            className="w-full"
                                            value={walletInfo.privateKeyArray}
                                        />
                                    </div>
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

                                {error && (
                                    <div className="text-red-500 text-sm">
                                        {error}
                                    </div>
                                )}

                                <Button onClick={convertKeypair} className="w-full">
                                    Convert Keypair
                                </Button>

                                {walletInfo.publicKey && (
                                    <div className="space-y-2">
                                        <Label>Public Key</Label>
                                        <Input
                                            readOnly
                                            className="w-full"
                                            value={walletInfo.publicKey}
                                        />

                                        <Label>Private Key (Base58)</Label>
                                        <Textarea
                                            readOnly
                                            className="w-full"
                                            value={walletInfo.privateKey}
                                        />

                                        <Label>Private Key (JSON Array)</Label>
                                        <Textarea
                                            rows={4}
                                            readOnly
                                            className="w-full"
                                            value={walletInfo.privateKeyArray}
                                        />
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
