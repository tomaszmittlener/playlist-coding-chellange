const PREFIX = 'xite_challenge_'

export const loadVideos = () => {
  try {
    const videos = localStorage.getItem(`${PREFIX}videos`)

    if (videos === null) {
      return undefined
    }

    return JSON.parse(videos)
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
    return undefined
  }
}

export const saveVideos = videos => {
  try {
    const videosSerialized = JSON.stringify(videos)

    localStorage.setItem(`${PREFIX}videos`, videosSerialized)
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
  }
}
