import { css } from '@emotion/react'
import { margin } from '../margin'
import { padding } from '../padding'
import { listStyleNone } from './list-style-none'

export function listReset() {
  return css`
    ${listStyleNone()}
    ${margin(0)}
    ${padding(0)}
  `
}
