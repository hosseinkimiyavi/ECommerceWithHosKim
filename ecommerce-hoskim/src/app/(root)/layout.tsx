import Header from "@/components/shared/header";
import Footer from "@/components/shared/header/footer";
import React from "react";



export default async function RootLayout({
    children,
}: {
    children:React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1 flex-col p-4">{children}</main>
            <Footer />
        </div>
    )
    
}