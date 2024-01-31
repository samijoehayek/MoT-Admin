import Navbar from "@/components/navbar/navbar";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center p-24">{children}</div>
      </body>
    </html>
  );
}
