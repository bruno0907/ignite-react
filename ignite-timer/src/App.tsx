import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { CyclesProvider } from "./contexts/CyclesContext"
import { Router } from "./Router"
import { GlobalStyles } from "./styles/globalStyles"
import { defaultTheme } from "./styles/themes/default"

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App
