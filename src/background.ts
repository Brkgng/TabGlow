import { darkThemeColors, lightThemeColors } from './constants.js'
import { getStoredOrDefaultColors, isDarkThemePreferred } from './helpers.js'

const getRandomTabColor = async () => {
  const colors = await getStoredOrDefaultColors()
  const randomIndex = Math.floor(Math.random() * colors.length)

  return colors[randomIndex]
}

const getThemeColors = (theme: browser._manifest.ThemeType) => {
  if (theme.colors) {
    return theme.colors
  }

  return isDarkThemePreferred() ? darkThemeColors : lightThemeColors
}

const updateTabColor = async () => {
  const windowId = browser.windows.WINDOW_ID_CURRENT
  const theme = await browser.theme.getCurrent(windowId)

  const themeColors = getThemeColors(theme)
  const tabColor = await getRandomTabColor()

  browser.theme.update(windowId, {
    colors: {
      ...themeColors,
      tab_selected: tabColor
    }
  })
}

// Initialize: apply a color to current tab when the extension loads
updateTabColor()

// Update the color when the active tab changes
browser.tabs.onActivated.addListener(updateTabColor)
