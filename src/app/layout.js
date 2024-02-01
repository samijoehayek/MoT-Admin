'use client';
import Navbar from "@/components/navbar/navbar";
import "./globals.css";

import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";

export default function RootLayout({ children }, props) {
  const clientSideEmotionCache = createEmotionCache();
  const theme = createTheme();
  const { emotionCache = clientSideEmotionCache } = props;

  return (
    <html lang="en">
      <body className="min-h-screen">
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            {/* <Navbar /> */}
            <div className="min-h-screen flex justify-center items-center p-24">{children}</div>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
