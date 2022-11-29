import { ThemeProvider } from 'styled-components'
import { ButtonContainer } from './components/Button/styles'
import { GlobalStyles } from './styles/globalStyles'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <p>Hello</p>
      <ButtonContainer>Click me!</ButtonContainer>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App
