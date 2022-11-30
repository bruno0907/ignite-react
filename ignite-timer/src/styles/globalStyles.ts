import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;    
  }

  body {
    background: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};  
    -webkit-font-smoothing: antialiased;
  }

  body, button, input, text-area {
    font-family: 'Robot', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  :focus {
    outline: 0;
    box-shadow: 0, 0, 0, ${(props) => props.theme["green-500"]};
  }
`
