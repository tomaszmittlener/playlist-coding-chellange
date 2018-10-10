import React from 'react'
import styled from 'styled-components'
import T from 'prop-types'
import { Emoji } from 'components'

import { ms } from 'styles/helpers'

const Container = styled.header`
  display: grid;
  margin: ${ms(0)} 0;
  align-items: center;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${ms(-4)};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.secondary};
`

const Label = styled.h2`
  display: inline-block;
  color: ${({ theme: { colors } }) => colors.accent};
  text-transform: uppercase;
  font-size: ${ms(0)};
  font-weight: ${({
    theme: {
      typo: { weights },
    },
  }) => weights.normal};
`

function SectionHeader({ label, emoji }) {
  return (
    <Container>
      <Emoji symbol={emoji} />
      <Label>{label}</Label>
    </Container>
  )
}

SectionHeader.propTypes = {
  label: T.string.isRequired,
  emoji: T.string.isRequired,
}

export default SectionHeader
