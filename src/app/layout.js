import "./globals.css";
import ThemeProvider from "./ThemeProvider";

export const metadata = {
  title: "PassGen",
  description: "Next Gen secure password generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
