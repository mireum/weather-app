// import { Inter } from "next/font/google";
import "../styles/globals.css";
import AuthSession from "./AuthSession";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "그날그날",
  openGraph: {
    description: "Generated by create next app",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <AuthSession>
        <body style={{backgroundColor:'#e4eaf2'}}>{children}</body>
      </AuthSession>
    </html>
  );
}
