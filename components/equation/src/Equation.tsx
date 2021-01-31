import { renderToString } from 'katex'

interface Props {
  equation: string
  displayMode: boolean
}

export function Equation({ equation, displayMode }: Props) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: renderToString(equation, { displayMode }),
      }}
    />
  )
}
