import "./globals.css";
import { Inter } from 'next/font/google';
import ThemeProvider from "./ThemeProvider";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "SecPassGen",
  description: "Secure Next Gen password generator",
  openGraph: {
    images: [
      "https://res.cloudinary.com/doqbnfais/image/upload/v1755585047/projectsAssets/Logos/SecrePassGen_Logo_dvsbrl.png"
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
