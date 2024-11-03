import { colorOptions } from './constants.js'

export const isDarkThemePreferred = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const saveColors = async (colors: readonly string[]) => {
  await browser.storage.local.set({ colors })
}

// Get colors for the current theme from local storage or defaults
export const getStoredOrDefaultColors = async () => {
  const { colors } = await browser.storage.local.get('colors')

  if (colors && colors.length) {
    return colors
  }

  const initialColors = isDarkThemePreferred() ? colorOptions.dark : colorOptions.light
  await saveColors(initialColors)

  return initialColors
}
