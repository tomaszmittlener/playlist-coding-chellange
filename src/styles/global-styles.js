import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

import theme from './theme'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${normalize()} 
  body {
    background: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    font-family: ${theme.typo.fonts.primary};
    font-weight: ${theme.typo.weights.normal};
  }
`
