import { ThemeProvider } from "styled-components";
import { TransactionsPage } from "./pages/Transactions";
import { GlobalStyle } from "./styles/globalStyle";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsPage />
      <GlobalStyle />
    </ThemeProvider>
  )
}
