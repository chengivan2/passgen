import "./globals.css";

export const metadata = {
  title: "PassGen",
  description: "Next Gen secure password generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
