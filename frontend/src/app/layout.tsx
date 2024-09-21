"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body className={` flex`}>
 
  
        { pathName != "/auth/login" && pathName !="/auth/signup" && pathName != "signup" &&  <Sidebar />}

        <div className="flex flex-col flex-grow h-full bg-gray-100">

          { pathName != "/auth/login" && pathName !="/auth/signup" && pathName != "signup" &&  <Navbar />}

          <main className="flex-grow p-4">
            {children}
          </main>
        </div>
      
      </body>
    </html>
  );
}
