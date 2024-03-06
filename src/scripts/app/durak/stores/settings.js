import { persistentMap } from '@nanostores/persistent'
import { HELPER_FLAGS, MODE_FLAGS } from '../utils/constants'

export const $settings = persistentMap('settings:', {
  helper: HELPER_FLAGS.show,
  mode: MODE_FLAGS.simple
})
