import Navbar from "@/components/Navbar";
import "./global.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar /> 
        <Toaster position="top-right" /> 
        {children}
        <Footer />
      </body>
    </html>
  );
}