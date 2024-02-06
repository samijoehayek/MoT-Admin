'use client';
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
      <body>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <div>{children}</div>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
