interface TokensGridProps {
  tokens: Record<string, string>;
  hasRemValue: boolean;
}

import '../styles/tokens-grid.css'

export function TokensGrid({ tokens, hasRemValue = false }: TokensGridProps) {
  return (
    <table className="tokens-grid">
      <thead>
        <tr>
          <td>Name</td>
          <td>Value</td>
          {hasRemValue && <td>Pixels</td>}
        </tr>
      </thead>
      <tbody>
        {Object.entries(tokens).map(([ key, value ]) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
              {hasRemValue && <td>{Number(value.replace('rem', '')) * 16}px</td>}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}