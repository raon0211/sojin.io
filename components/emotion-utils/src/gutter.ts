import { SerializedStyles, css } from '@emotion/react'

export type GutterDirection = 'horizontal' | 'vertical'

function horizontalGutter(space: number, selector: string) {
  return css`
    & > ${selector} ~ ${selector} {
      margin-left: ${space}px;
    }
  `
}

function verticalGutter(space: number, selector: string) {
  return css`
    & > ${selector} ~ ${selector} {
      margin-top: ${space}px;
    }
  `
}

export interface GutterOptions {
  direction: GutterDirection
  space?: number
  selector?: string
}

export function gutter(options: GutterOptions): SerializedStyles
export function gutter(
  direction: GutterDirection,
  space?: number,
  selector?: string
): SerializedStyles
export function gutter(
  directionOrGutterOptions: GutterOptions | GutterDirection,
  space = 24,
  selector = '*'
) {
  if (typeof directionOrGutterOptions === 'object') {
    const { direction, space = 24, selector = '*' } = directionOrGutterOptions

    if (direction === 'vertical') {
      return verticalGutter(space, selector)
    } else {
      return horizontalGutter(space, selector)
    }
  }

  if (directionOrGutterOptions === 'vertical') {
    return verticalGutter(space, selector)
  } else {
    return horizontalGutter(space, selector)
  }
}
