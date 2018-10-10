import React from 'react'
import T from 'prop-types'
import { PlaylistsList, AddPlaylistForm } from 'containers'
import { getAllPlaylists } from 'reducers/playlists'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import { playlistShape } from 'constants/Shapes'
import styled from 'styled-components'
import { ms } from 'styles/helpers'

const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Wrapper = styled.div`
  width: 90%;
  
  @media (min-width: ${({ theme: { mq } }) => `${mq.s}px`}) {
     width: 80%;
  }
  
  @media (min-width: ${({ theme: { mq } }) => `${mq.m}px`}) {
     width: 50%;
  }
  
  @media (min-width: ${({ theme: { mq } }) => `${mq.l}px`}}) {
     width: 40%;
  }
`

const Title = styled.h2`
  text-align: center;
  margin: 0 0 ${ms(2)};
  font-size: ${ms(4)};
`

const HomeView = ({ playlists }) => (
  <Container>
    <Wrapper>
      <Title>Xite Coding Challenge</Title>
      <AddPlaylistForm />
      <PlaylistsList playlists={playlists} />
    </Wrapper>
  </Container>
)

HomeView.propTypes = {
  playlists: T.arrayOf(playlistShape).isRequired,
}

const mapStateToProps = state => ({
  playlists: getAllPlaylists(state),
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(HomeView)
