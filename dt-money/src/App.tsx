import { ThemeProvider } from "styled-components";
import { TransactionsProvider } from "./contexts/Transactions";
import { TransactionsPage } from "./pages/Transactions";
import { GlobalStyle } from "./styles/globalStyle";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <TransactionsPage />
      </TransactionsProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
