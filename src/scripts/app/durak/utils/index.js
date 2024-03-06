import { selectors, extension } from './constants'

export const getElementData = element => {
  const rect = element.getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
    size: { width: rect.width, height: rect.height }
  }
}

export const getUserElementByPosition = position =>
  document.querySelector(`${selectors.Users.User}${position}`)

export const clickOnUserElement = position =>
  getUserElementByPosition(position).click()

const nullthrows = v => {
  if (v == null) throw new Error("it's a null")
  return v
}

export const injectCode = src => {
  const script = document.createElement('script')
  script.setAttribute('src', src)

  nullthrows(document.head || document.documentElement).appendChild(script)
}

export const injectCSS = url => {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('id', extension.StyleId)
  link.setAttribute('href', url)
  nullthrows(document.head).appendChild(link)
}

export const removeInjectedCSS = () => {
  const link = document.querySelector(selectors.Extension.StyleId)
  link && link.remove()
}

export function checkParent(child, selector) {
  if (child.closest(selector) === null) {
    return false
  }
  return true
}
