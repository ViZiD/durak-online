import { map } from 'nanostores'

export const initialDemensionsState = {
  height: 0,
  width: 0,
  is_desktop_mode: true
}

export const $dimensions = map(initialDemensionsState)
