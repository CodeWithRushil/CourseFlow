import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "CourseFlow",
  description:
    "An AI-powered learning platform that helps you create custom learning paths and structured courses in minutes.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  category: "Education",
  authors: [{ name: "Rushil Sharma" }],
  creator: "Rushil Sharma",
  publisher: "CourseFlow",
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
