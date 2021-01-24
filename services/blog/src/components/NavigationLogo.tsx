import { forwardRef, Ref } from 'react'
import {
  gutter,
  backgroundColor,
  circle,
  fontSizeRegular,
  fontColorText,
  fontColorTextSecondary,
  fontSizeSmall,
  flex,
} from '@sojin-components/emotion-utils'

const PROFILE_IMAGE_URL = 'https://static.sojin.io/images/leo.jpg'
const PROFILE_IMAGE_SUMMARY_COLOR = '#8e8270'

interface Props {
  href?: string
  onClick?: () => void
}

function NavigationMainLink(
  { href, onClick }: Props,
  ref: Ref<HTMLAnchorElement>
) {
  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      css={[flex({ alignItems: 'center' }), gutter('horizontal', 8)]}
    >
      <img
        src={PROFILE_IMAGE_URL}
        alt=""
        css={[circle('3rem'), backgroundColor(PROFILE_IMAGE_SUMMARY_COLOR)]}
      />
      <div css={gutter('vertical')}>
        <div css={[fontSizeRegular(), fontColorText()]}>Sojin Park</div>
        <small css={[fontSizeSmall(), fontColorTextSecondary()]}>
          Frontend Dev
        </small>
      </div>
    </a>
  )
}

export default forwardRef(NavigationMainLink)
