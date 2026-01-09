import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "CourseFlow",
  description: "Made by Rushil Sharma",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${GeistSans.className}  antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
