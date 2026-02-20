import type { Metadata } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";

export const metadata: Metadata = {
    title: "PropertyHub — Rental Property Management",
    description: "Comprehensive property management dashboard for owners and managers",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body id="__next">
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
