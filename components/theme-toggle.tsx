"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun02Icon, ComputerIcon, Moon02Icon } from "hugeicons-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Prevent flash of incorrect theme
    }

    return (
        <ToggleGroup
            type="single"
            variant="outline"
            className="scale-90 rounded-full border p-1"
            value={theme}
        >
            <ToggleGroupItem
                value="light"
                onClick={() => setTheme("light")}
                disabled={theme === "light"}
                className="rounded-full disabled:bg-accent disabled:opacity-100"
            >
                <span className="sr-only">Light Mode</span>
                <Sun02Icon className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="system"
                onClick={() => setTheme("system")}
                disabled={theme === "system"}
                className="rounded-full disabled:bg-accent disabled:opacity-100"
            >
                <span className="sr-only">System Mode</span>
                <ComputerIcon className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="dark"
                onClick={() => setTheme("dark")}
                disabled={theme === "dark"}
                className="rounded-full disabled:bg-accent disabled:opacity-100"
            >
                <span className="sr-only">Dark Mode</span>
                <Moon02Icon className="h-5 w-5" />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}