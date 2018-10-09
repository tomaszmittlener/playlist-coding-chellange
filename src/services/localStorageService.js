const PREFIX = 'xite_challenge_'

// Videos
export const loadState = () => {
  try {
    const state = localStorage.getItem(`${PREFIX}state`)

    if (state === null) {
      return undefined
    }

    return JSON.parse(state)
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
    return undefined
  }
}

export const saveState = state => {
  try {
    const stateSerialized = JSON.stringify(state)

    localStorage.setItem(`${PREFIX}state`, stateSerialized)
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
  }
}
