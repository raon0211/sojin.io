import { NotionText } from '@sojin/notion'
import { Fragment } from 'react'
import { LazyEquation } from './Equation'
import { Code } from '@sojin-components/post'

interface Props {
  texts: NotionText[]
}

export default function NotionTextRenderer({ texts }: Props) {
  return (
    <>
      {texts.map((text, index) => {
        switch (text.type) {
          case 'plain': {
            return <Fragment key={index}>{text.value}</Fragment>
          }
          case 'link': {
            return (
              <a key={index} href={text.href} rel="noreferer noopener">
                {text.value}
              </a>
            )
          }
          case 'italic': {
            // In our blog, we use italic text to denote superscripts
            return <sup key={index}>{text.value}</sup>
          }
          case 'bold': {
            return <b key={index}>{text.value}</b>
          }
          case 'underline': {
            return <u key={index}>{text.value}</u>
          }
          case 'code': {
            return <Code key={index}>{text.value}</Code>
          }
          case 'equation': {
            return (
              <LazyEquation
                key={index}
                equation={text.value}
                displayMode={false}
              />
            )
          }
        }
      })}
    </>
  )
}
