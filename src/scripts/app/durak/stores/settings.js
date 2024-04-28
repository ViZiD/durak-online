import { persistentMap } from '@nanostores/persistent'
import { HELPER_FLAGS, MODE_FLAGS } from '../utils/constants'

export const $settings = persistentMap('settings:', {
  helper: HELPER_FLAGS.show,
  mode: MODE_FLAGS.simple
})

export const $deckPosition = persistentMap('deckPosition', {
  x: 0,
  y: 0
})
